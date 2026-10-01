import { CODEX_PROFILE_URL, parseCodexProfile } from "@/lib/codex-profile"

const MAX_PROFILE_BYTES = 256 * 1024

async function readProfileHtml(response: Response): Promise<string> {
  const reader = response.body?.getReader()
  if (!reader) throw new Error("Profile response has no body")

  const decoder = new TextDecoder()
  let bytes = 0
  let html = ""

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return html + decoder.decode()
      bytes += value.byteLength
      if (bytes > MAX_PROFILE_BYTES) throw new Error("Profile response is too large")
      html += decoder.decode(value, { stream: true })
    }
  } finally {
    await reader.cancel()
    reader.releaseLock()
  }
}

export async function GET() {
  try {
    const response = await fetch(CODEX_PROFILE_URL, {
      headers: { Accept: "text/html" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
      redirect: "error",
      credentials: "omit",
    })

    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
      throw new Error("Public profile is unavailable")
    }

    const profile = parseCodexProfile(await readProfileHtml(response))
    if (!profile) throw new Error("Public profile metadata is unavailable")

    return Response.json(profile, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
    })
  } catch {
    // Keep the client-side identity and link usable if ChatGPT is unavailable,
    // requires login, or changes its public metadata format.
    return Response.json({ error: "Profile preview is unavailable" }, {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    })
  }
}
