// Original, dimensioned studio model. Coordinates are millimeters, with the
// inner glass at z=0 and the book hinge running along the y axis.
import { Camera, Cylinder, Geometry, Mesh, Program, Renderer, Texture, Transform } from "ogl"

const halfWidth = 164.6 / 2
const halfHeight = 117.8 / 2
const depth = 5.2
const hingeLift = (11.3 - 2 * depth) / 2
const flexHalfWidth = 2.4
const radians = degrees => degrees * Math.PI / 180

const vertex = `
  attribute vec3 position, normal;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix, projectionMatrix;
  uniform mat3 normalMatrix;
  uniform float hand, closed, foldAngle;
  varying vec3 N, V;
  varying vec2 st;
  void main() {
    vec3 p = position;
    vec3 n = normal;
    if (foldAngle > 0.) {
      float c = cos(foldAngle), s = sin(foldAngle);
      mat2 turn = mat2(c, -s, s, c);
      const float lift = ${hingeLift.toFixed(3)}, band = ${flexHalfWidth.toFixed(2)};
      vec2 pivot = vec2(0., lift);
      if (p.x <= -band) {
        p.xz = pivot + turn * (p.xz - pivot);
        n = vec3(s, 0., c);
      } else if (p.x < band) {
        // Tangent-matched cubic across the bending region of one OLED sheet.
        float t = (p.x + band) / (2. * band), q = 1. - t;
        vec2 a = pivot + turn * (vec2(-band, p.z) - pivot), b = vec2(band, p.z);
        vec2 l = a + (2. * band / 3.) * vec2(c, -s);
        vec2 r = b - vec2(2. * band / 3., 0.);
        p.xz = q*q*q*a + 3.*q*q*t*l + 3.*q*t*t*r + t*t*t*b;
        vec2 tangent = normalize(q*q*(l-a) + 2.*q*t*(r-l) + t*t*(b-r));
        n = vec3(-tangent.y, 0., tangent.x);
      }
    }
    // The textured grip has depth: the palm supports the lower chassis and
    // the thumb curls around the fixed rail as the stack changes thickness.
    float thumb = smoothstep(.744, .798, uv.x) * smoothstep(.37, .57, uv.y);
    p.z += hand * thumb * (8.0 + 4.0 * closed);
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    st = uv;
    N = normalMatrix * n;
    V = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`

const hardwareFragment = `
  precision highp float;
  varying vec3 N, V;
  uniform vec3 base;
  uniform float polish;
  void main() {
    vec3 n = normalize(N), v = normalize(V), r = reflect(-v, n);
    float fresnel = pow(1. - abs(dot(n, v)), 3.);
    float key = .62 + .38 * dot(n, normalize(vec3(-.4, .8, .6)));
    // Two long softboxes reflected in the machined sidewall and its bevel.
    float strip = exp(-pow((r.y - .27) / .26, 2.));
    float edge = exp(-pow((r.x + .63) / .22, 2.)) * (.65 + .35 * r.y);
    vec3 shine = vec3(.85, .91, 1.) * strip + vec3(1., .94, .86) * edge;
    gl_FragColor = vec4(base * key + polish * (.11 * fresnel + .58 * shine), 1.);
  }
`

const photoFragment = `
  precision highp float;
  varying vec3 N, V;
  varying vec2 st;
  uniform sampler2D image;
  uniform float hand, bend;
  void main() {
    vec4 texel = texture2D(image, st);
    if (texel.a < .025) discard;
    float view = abs(dot(normalize(N), normalize(V)));
    float falloff = exp(-pow((st.x - .49) * 15., 2.));
    float shading = 1. - (1. - hand) * (.14 * (1. - view) + bend * .095 * falloff);
    gl_FragColor = vec4(texel.rgb * shading, texel.a);
  }
`

// Each corner keeps its own radius. The spine-side corners on the cover
// turn sharply, while the free edge has the larger Duo corner radius.
function perimeter(left, right, bottom, top, leftRadius, rightRadius) {
  const corners = [
    [right - rightRadius, top - rightRadius, rightRadius],
    [left + leftRadius, top - leftRadius, leftRadius],
    [left + leftRadius, bottom + leftRadius, leftRadius],
    [right - rightRadius, bottom + rightRadius, rightRadius],
  ]
  return corners.flatMap(([cx, cy, r], quadrant) => Array.from({ length: 17 }, (_, i) => {
    const angle = (quadrant + i / 16) * Math.PI / 2
    const nx = Math.cos(angle), ny = Math.sin(angle)
    return [cx + r * nx, cy + r * ny, nx, ny]
  }))
}

function geometry(gl, positions, normals, uvs, indices) {
  return new Geometry(gl, {
    position: { size: 3, data: new Float32Array(positions) },
    normal: { size: 3, data: new Float32Array(normals) },
    uv: { size: 2, data: new Float32Array(uvs) },
    index: { data: new Uint16Array(indices) },
  })
}

// Cross-sections form the rounded titanium sidewall, the chamfers, and the
// planar caps. The same construction at a smaller scale makes the buttons.
function solid(gl, bounds, leftRadius, rightRadius, back, front, bevel) {
  const [left, right, bottom, top] = bounds
  const outline = perimeter(left, right, bottom, top, leftRadius, rightRadius)
  const profile = [
    [back, bevel, -1], [back + .12 * bevel, .53 * bevel, -.84],
    [back + .46 * bevel, .12 * bevel, -.45], [back + bevel, 0, 0],
    [front - bevel, 0, 0], [front - .46 * bevel, .12 * bevel, .45],
    [front - .12 * bevel, .53 * bevel, .84], [front, bevel, 1],
  ]
  const pos = [], norm = [], uv = [], idx = []
  const n = outline.length
  profile.forEach(([z, inset, nz], j) => {
    const side = Math.sqrt(1 - nz * nz)
    outline.forEach(([x, y, nx, ny], i) => {
      pos.push(x - inset * nx, y - inset * ny, z)
      norm.push(nx * side, ny * side, nz)
      uv.push(0, 0)
      if (j === 0) return
      const a = (j - 1) * n + i, b = (j - 1) * n + (i + 1) % n
      idx.push(a, b, a + n, b, b + n, a + n)
    })
  })
  for (const [ring, nz, z] of [[0, -1, back], [profile.length - 1, 1, front]]) {
    const center = pos.length / 3
    pos.push((left + right) / 2, (bottom + top) / 2, z)
    norm.push(0, 0, nz)
    uv.push(0, 0)
    for (let i = 0; i < n; i++) {
      const a = ring * n + i, b = ring * n + (i + 1) % n
      idx.push(center, nz > 0 ? a : b, nz > 0 ? b : a)
    }
  }
  return geometry(gl, pos, norm, uv, idx)
}

function surface(gl, bounds, z, u0 = 0, u1 = 1, divisions = 1) {
  const [left, right, bottom, top] = bounds
  const pos = [], norm = [], uv = [], idx = []
  const rear = u0 > u1
  for (let j = 0; j <= divisions; j++) {
    for (let i = 0; i <= divisions; i++) {
      const x = i / divisions, y = j / divisions
      pos.push(left + (right - left) * x, bottom + (top - bottom) * y, z)
      norm.push(0, 0, rear ? -1 : 1)
      uv.push(u0 + (u1 - u0) * x, y)
      if (i === divisions || j === divisions) continue
      const a = j * (divisions + 1) + i, b = a + 1, c = a + divisions + 1, d = c + 1
      idx.push(...(rear ? [a, c, b, b, c, d] : [a, b, c, b, d, c]))
    }
  }
  return geometry(gl, pos, norm, uv, idx)
}

function foldingDisplay(gl, width, height) {
  const columns = [-width / 2, ...Array.from({ length: 33 }, (_, i) => flexHalfWidth * (i / 16 - 1)), width / 2]
  const pos = [], norm = [], uv = [], idx = []
  for (const [i, x] of columns.entries()) {
    for (const v of [0, 1]) {
      pos.push(x, (v - .5) * height, .17)
      norm.push(0, 0, 1)
      uv.push(.5 + x / width, v)
    }
    if (i !== 0) {
      const k = 2 * i
      idx.push(k - 2, k, k - 1, k, k + 1, k - 1)
    }
  }
  return geometry(gl, pos, norm, uv, idx)
}

export async function createDuoModel(canvas, { cover, inner, hand }) {
  const aspect = canvas.width / canvas.height
  const renderer = new Renderer({
    canvas, width: canvas.width, height: canvas.height, dpr: 1,
    alpha: false, antialias: true, preserveDrawingBuffer: true,
  })
  const gl = renderer.gl
  gl.clearColor(242 / 255, 246 / 255, 239 / 255, 1)
  const camera = new Camera(gl, { near: 370, far: 720, aspect })
  const scene = new Transform()
  function group(parent) {
    const node = new Transform()
    node.setParent(parent)
    return node
  }
  function mesh(parent, geometry, program) {
    const node = new Mesh(gl, { geometry, program })
    node.setParent(parent)
    return node
  }
  function metal(rgb, polish) {
    return new Program(gl, {
      vertex, fragment: hardwareFragment,
      uniforms: { base: { value: rgb }, polish: { value: polish }, hand: { value: 0 }, closed: { value: 0 }, foldAngle: { value: 0 } },
    })
  }
  function photographic(image, isHand = false) {
    const texture = new Texture(gl, {
      image, generateMipmaps: true, minFilter: gl.LINEAR_MIPMAP_LINEAR,
      anisotropy: renderer.parameters.maxAnisotropy || 1,
    })
    return new Program(gl, {
      vertex, fragment: photoFragment, transparent: true,
      uniforms: {
        image: { value: texture }, hand: { value: Number(isHand) },
        closed: { value: 0 }, bend: { value: 0 }, foldAngle: { value: 0 },
      },
    })
  }
  const rig = group(scene)
  const pivot = group(rig)
  pivot.position.z = hingeLift
  const leaf = group(pivot)
  leaf.position.z = -hingeLift
  const fixed = group(rig)
  const titanium = metal([.28, .285, .30], .83)
  const glass = metal([.034, .038, .042], .12)
  const hardware = metal([.35, .35, .365], .76)
  const recess = metal([.055, .058, .064], .11)

  const splitRims = []
  for (const [parent, left, right, rL, rR] of [
    [leaf, -halfWidth, -.04, 12.8, 1.7], [fixed, .04, halfWidth, 1.7, 12.8],
  ]) {
    splitRims.push(mesh(parent, solid(gl, [left, right, -halfHeight, halfHeight], rL, rR, -depth, 0, .65), titanium))
    // Bezel glass extends all the way to the fold on the inner side.
    const innerLeft = left > 0 ? 0 : left + .60
    const innerRight = right < 0 ? 0 : right - .60
    splitRims.push(mesh(parent, solid(gl, [innerLeft, innerRight, -58.28, 58.28],
      left > 0 ? .18 : 12.1, right < 0 ? .18 : 12.1, -.10, .025, .04), glass))
  }
  // At the flat endpoint the inner rail walls are fully occluded. A single
  // shell avoids antialiasing those hidden edges through the screen.
  const joinedRim = group(rig)
  mesh(joinedRim, solid(gl, [-halfWidth, halfWidth, -halfHeight, halfHeight],
    12.8, 12.8, -depth, 0, .65), titanium)
  mesh(joinedRim, solid(gl, [-81.7, 81.7, -58.28, 58.28], 12.1, 12.1, -.10, .025, .04), glass)
  mesh(leaf, solid(gl, [-81.67, -.58, -58.25, 58.25], 12.1, 1.26, -5.27, -5.15, .04), glass)

  // The outer camera, clock, circular status indicator and tab rail are
  // pixels captured on the actual closed Duo simulator.
  mesh(leaf, surface(gl, [-80.23, -2.68, -56.42, 56.42], -5.39, 1, 0), photographic(cover))
  const oled = photographic(inner)
  const innerWidth = 112.80 * inner.width / inner.height
  const flexible = mesh(rig, foldingDisplay(gl, innerWidth, 112.80), oled)
  // At rest two triangles suffice. This also removes subpixel raster edges
  // between the tightly spaced bend samples on antialiased render targets.
  const flat = mesh(rig, surface(gl, [-innerWidth / 2, innerWidth / 2, -56.4, 56.4], .17), oled)

  // A telescoping cover fits over the doubled spine when shut. When it
  // retracts, all its metal sits behind the continuous inner OLED.
  const spine = mesh(rig, new Cylinder(gl, {
    radiusTop: 1, radiusBottom: 1, height: 115.7, radialSegments: 64,
  }), hardware)
  spine.position.x = .30
  for (const x of [41.5, 54.0]) {
    mesh(fixed, solid(gl, [x - 5.15, x + 5.15, 58.65, 59.42], .35, .35, -3.63, -1.74, .15), hardware)
  }
  mesh(fixed, solid(gl, [82.0, 82.85, 6.5, 25.0], .38, .38, -3.70, -1.52, .14), hardware)
  mesh(fixed, solid(gl, [82.22, 82.38, -17.1, -4.7], .07, .07, -3.54, -1.7, .035), recess)

  // On a turned, closed Duo the rear camera housing projects past the back
  // rail. The two lenses are arranged horizontally at the free edge.
  mesh(fixed, solid(gl, [24.5, 79.0, 30.0, 55.8], 11.6, 11.6, -7.45, -5.12, .82), titanium)
  for (const x of [51.2, 68.4]) {
    const ring = mesh(fixed, new Cylinder(gl, {
      radiusTop: 7.5, radiusBottom: 7.8, height: 1.35, radialSegments: 64,
    }), hardware)
    ring.position.set(x, 43.1, -7.95)
    ring.rotation.x = -Math.PI / 2
    const lens = mesh(fixed, new Cylinder(gl, {
      radiusTop: 6.52, radiusBottom: 6.68, height: .42, radialSegments: 64,
    }), glass)
    lens.rotation.x = -Math.PI / 2
    lens.position.set(x, 43.1, -8.68)
  }

  const grip = photographic(hand, true)
  const mmPerPixel = (2 * halfWidth) / 982
  mesh(rig, surface(gl, [-halfWidth, -halfWidth + 1264 * mmPerPixel,
    halfHeight - 1225 * mmPerPixel, halfHeight], -6.5, 0, 1, 36), grip)

  return function render(progress) {
    // Turn the closed stack slightly before opening it. Both studio framing
    // and lighting then settle back onto the flat, front-facing display.
    const open = Math.max(0, (progress - .16) / .84)
    const arc = Math.sin(Math.PI * open)
    const wristTurn = Math.sin(Math.PI * Math.min(progress / .52, 1)) ** 2
    const angle = Math.PI * (1 - open)
    pivot.rotation.y = angle
    rig.rotation.set(radians(3.2 * (1 - open) + 2.1 * arc),
      radians(6 * (1 - open) - 13 * arc - 39 * wristTurn), radians(1.4 * (1 - open)))
    const spineClosure = Math.max(0, 1 - 2.5 * open)
    spine.position.z = -2.75 + 3.2 * spineClosure
    spine.scale.set(2.1, 1, 1.95 + 3.4 * spineClosure)
    grip.uniforms.closed.value = 1 - open
    flexible.visible = open < 1
    flat.visible = !flexible.visible
    joinedRim.visible = flat.visible
    for (const rim of splitRims) rim.visible = flexible.visible
    oled.uniforms.foldAngle.value = angle
    oled.uniforms.bend.value = arc

    const spread = open * open * (3 - 2 * open)
    const viewWidth = 166 + 43 * spread
    const z = 545
    camera.perspective({ fov: 2 * Math.atan(viewWidth / aspect / (2 * z)) * 180 / Math.PI })
    camera.position.set(42 - 29 * spread, -8 - 11 * spread + 3.8 * wristTurn + 3 * arc, z)
    camera.updateMatrixWorld()
    renderer.render({ scene, camera })
  }
}
