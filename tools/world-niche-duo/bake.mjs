import { execFileSync } from "node:child_process"
import { createServer } from "node:http"
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import { chromium } from "playwright-core"

const directory = fileURLToPath(new URL(".", import.meta.url))
const width = 864
const height = 800
const lastFrame = 120
const fps = 60
const { values } = parseArgs({
  options: {
    "stills-only": { type: "boolean" },
    preview: { type: "string" },
  },
})
if (values.preview && values["stills-only"]) {
  throw new Error("Use --preview or --stills-only separately.")
}
const output = values.preview
  ? resolve(values.preview)
  : resolve(directory, "../../public/world-niche")

const html = `<!doctype html><meta charset="utf-8">
<script type="importmap">{"imports":{"ogl":"/node_modules/ogl/src/index.js","ogl/":"/node_modules/ogl/"}}</script>`
const types = { js: "text/javascript", mjs: "text/javascript", webp: "image/webp" }

async function serveModel() {
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url, "http://127.0.0.1").pathname
    if (pathname === "/") {
      response.writeHead(200, { "Content-Type": "text/html" }).end(html)
      return
    }
    const allowed = /^\/(?:[\w-]+\.mjs|textures\/[\w-]+\.webp|node_modules\/ogl\/src\/[\w./-]+\.js)$/
    if (!allowed.test(pathname)) {
      response.writeHead(404).end()
      return
    }
    try {
      const data = await readFile(join(directory, pathname))
      response.writeHead(200, { "Content-Type": types[pathname.split(".").at(-1)] }).end(data)
    } catch {
      response.writeHead(404).end()
    }
  })
  await new Promise((accept, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", accept)
  })
  return server
}

async function captureFrames(work, frames) {
  const server = await serveModel()
  let browser
  try {
    browser = await chromium.launch({
      channel: "chrome",
      args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
    })
    const page = await browser.newPage()
    await page.goto("http://127.0.0.1:" + server.address().port)
    await page.evaluate(async ({ width, height }) => {
      const { createDuoModel } = await import("/model.mjs")
      const images = {}
      await Promise.all(["cover", "inner", "hand"].map(async name => {
        const image = new Image()
        image.src = "/textures/" + name + ".webp"
        await image.decode()
        images[name] = image
      }))

      const scene = document.createElement("canvas")
      scene.width = width * 1.5
      scene.height = height * 1.5
      const render = await createDuoModel(scene, images)
      const frame = document.createElement("canvas")
      frame.width = width
      frame.height = height
      const ctx = frame.getContext("2d", { alpha: false })
      ctx.imageSmoothingQuality = "high"

      window.capturePose = (progress, still) => {
        render(progress)
        ctx.fillStyle = "#f3f6ef"
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(scene, 0, 0, width, height)
        return frame.toDataURL(still ? "image/webp" : "image/png", 0.97).split(",")[1]
      }
    }, { width, height })

    for (const [index, frame] of frames.entries()) {
      const endpoint = frame === 0 || frame === lastFrame
      if (!values["stills-only"]) {
        const png = await page.evaluate(progress => window.capturePose(progress, false), frame / lastFrame)
        await writeFile(join(work, "pose-" + String(index).padStart(3, "0") + ".png"), Buffer.from(png, "base64"))
      }
      if (endpoint && !values.preview) {
        const name = frame === 0 ? "duo-cover.webp" : "duo-unfolded.webp"
        const webp = await page.evaluate(progress => window.capturePose(progress, true), frame / lastFrame)
        await writeFile(join(work, name), Buffer.from(webp, "base64"))
      }
    }
  } finally {
    try {
      await browser?.close()
    } finally {
      server.closeAllConnections()
      await new Promise(resolve => server.close(resolve))
    }
  }
}

async function bake() {
  await mkdir(output, { recursive: true })
  const work = await mkdtemp(join(output, ".duo-bake-"))
  try {
    const frames = values.preview ? Array.from({ length: 9 }, (_, i) => i * lastFrame / 8)
      : values["stills-only"] ? [0, lastFrame] : Array.from({ length: lastFrame + 1 }, (_, i) => i)
    await captureFrames(work, frames)
    let files = ["duo-cover.webp", "duo-unfolded.webp"]
    const input = ["-hide_banner", "-loglevel", "error", "-framerate", String(fps), "-i", "pose-%03d.png"]
    if (values.preview) {
      execFileSync("ffmpeg", [...input, "-vf", "scale=360:-2:flags=lanczos,tile=3x3",
        "-frames:v", "1", "poses.jpg"], { cwd: work })
      files = ["poses.jpg", ...frames.map((_, i) => "pose-" + String(i).padStart(3, "0") + ".png")]
    } else if (!values["stills-only"]) {
      execFileSync("ffmpeg", [...input,
        "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", "16",
        "-g", "4", "-keyint_min", "4", "-sc_threshold", "0", "-bf", "0",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "iec61966-2-1",
        "-movflags", "+faststart", "-an", "duo-fold.mp4",
      ], { cwd: work })
      files.push("duo-fold.mp4")
    }
    for (const name of files) await rename(join(work, name), join(output, name))
    console.log("Saved " + files.join(", ") + " in " + output)
  } finally {
    await rm(work, { recursive: true, force: true })
  }
}

await bake()
