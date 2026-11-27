import {
  BackSide,
  BoxGeometry,
  CanvasTexture,
  Color,
  DataTexture,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  type MeshPhysicalMaterialParameters,
  PlaneGeometry,
  PMREMGenerator,
  RepeatWrapping,
  RGBAFormat,
  Scene,
  SRGBColorSpace,
  type Texture,
  type WebGLRenderer,
} from "three"

/**
 * Shared pieces that make the 3D sauce bottle and rooftop drinks read as real objects:
 * a photo-studio environment to reflect, a thin-glass shader, procedural surface texture,
 * a soft contact shadow and the page colour behind them.
 */

/**
 * A small photo studio, baked into an environment map: a warm grey room lit by a large
 * softbox overhead, two tall strip lights either side and a bounce off a warm floor. Glass,
 * liquid and metal pick up these shapes as the long, soft highlights you see in product shots.
 */
export function studioEnvironment(renderer: WebGLRenderer) {
  const studio = new Scene()
  const box = new BoxGeometry(1, 1, 1)
  const panels: Mesh[] = []
  const panel = (color: string, intensity: number) => {
    const mesh = new Mesh(
      box,
      new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensity) }),
    )
    panels.push(mesh)
    studio.add(mesh)
    return mesh
  }

  const room = panel("#6f655c", 0.8)
  room.material.side = BackSide
  room.scale.set(30, 16, 30)
  room.position.y = 5

  const floor = panel("#b48f6a", 0.9)
  floor.scale.set(30, 0.1, 30)
  floor.position.y = -2.9

  const top = panel("#fff6ea", 9)
  top.scale.set(9, 0.1, 5)
  top.position.set(-1.5, 12.5, 2)

  // Front left and right, so their reflections land as long stripes across the glass.
  const left = panel("#fff4e4", 22)
  left.scale.set(1.1, 12, 0.2)
  left.position.set(-5.5, 3, 7)
  left.rotation.y = 0.65

  const right = panel("#eef4ff", 12)
  right.scale.set(0.7, 12, 0.2)
  right.position.set(6.5, 3, 5.5)
  right.rotation.y = -0.85

  const back = panel("#ffe9cf", 4)
  back.scale.set(12, 3, 0.1)
  back.position.set(0, 3, -14)

  const pmrem = new PMREMGenerator(renderer)
  const texture = pmrem.fromScene(studio, 0.02).texture
  pmrem.dispose()
  box.dispose()
  panels.forEach((mesh) => (mesh.material as Material).dispose())
  return texture
}

/**
 * Thin glass. Face-on it is nearly invisible; at glancing angles it reflects more and darkens
 * slightly, as real glass does. Reflections are added on top of what is behind (premultiplied),
 * so they stay bright instead of being faded along with the glass.
 */
export function thinGlass(parameters: MeshPhysicalMaterialParameters = {}, edge = 0.5) {
  const material = new MeshPhysicalMaterial({
    color: "#33403a",
    roughness: 0.02,
    metalness: 0,
    ior: 1.5,
    specularIntensity: 1,
    envMapIntensity: 2.2,
    transparent: true,
    opacity: 0.035,
    depthWrite: false,
    premultipliedAlpha: true,
    ...parameters,
  })
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      /* glsl */ `
        float facing = abs(dot(normalize(vViewPosition), normal));
        float glance = pow(1.0 - facing, 3.0);
        float coverage = clamp(diffuseColor.a + glance * ${edge.toFixed(3)}, 0.0, 1.0);
        gl_FragColor = vec4(totalDiffuse * coverage + (outgoingLight - totalDiffuse), coverage);
      `,
    )
  }
  material.customProgramCacheKey = () => `thin-glass-${edge}`
  return material
}

/** Tileable value noise, 0..1, on a size × size grid. */
function noiseField(size: number, cells: number, octaves: number, seed: number) {
  const field = new Float32Array(size * size)
  const hash = (x: number, y: number, o: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + o * 74.7 + seed * 19.3) * 43758.5453
    return n - Math.floor(n)
  }
  let amplitude = 1
  let total = 0
  for (let o = 0; o < octaves; o++) {
    const grid = cells * 2 ** o
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const gx = (x / size) * grid
        const gy = (y / size) * grid
        const x0 = Math.floor(gx)
        const y0 = Math.floor(gy)
        const fx = gx - x0
        const fy = gy - y0
        const sx = fx * fx * (3 - 2 * fx)
        const sy = fy * fy * (3 - 2 * fy)
        const a = hash(x0 % grid, y0 % grid, o)
        const b = hash((x0 + 1) % grid, y0 % grid, o)
        const c = hash(x0 % grid, (y0 + 1) % grid, o)
        const d = hash((x0 + 1) % grid, (y0 + 1) % grid, o)
        field[y * size + x] +=
          amplitude * (a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy)
      }
    }
    total += amplitude
    amplitude *= 0.5
  }
  for (let i = 0; i < field.length; i++) field[i] /= total
  return field
}

/**
 * A tileable normal map from noise: fine grain for paper, soft blobs for sauce,
 * gentle ripples for a liquid surface, bubbly lumps for foam.
 */
export function noiseNormalMap(
  cells: number,
  octaves: number,
  strength: number,
  seed = 1,
  repeat = 1,
) {
  const size = 256
  const height = noiseField(size, cells, octaves, seed)
  const data = new Uint8Array(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const at = (dx: number, dy: number) =>
        height[((y + dy + size) % size) * size + ((x + dx + size) % size)]
      const nx = (at(-1, 0) - at(1, 0)) * strength
      const ny = (at(0, -1) - at(0, 1)) * strength
      const length = Math.hypot(nx, ny, 1)
      const i = (y * size + x) * 4
      data[i] = ((nx / length) * 0.5 + 0.5) * 255
      data[i + 1] = ((ny / length) * 0.5 + 0.5) * 255
      data[i + 2] = ((1 / length) * 0.5 + 0.5) * 255
      data[i + 3] = 255
    }
  }
  const texture = new DataTexture(data, size, size, RGBAFormat)
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(repeat, repeat)
  texture.needsUpdate = true
  return texture
}

/** A soft, round contact shadow to sit under an object on the "table". */
export function contactShadow(width: number, depth: number, y: number, strength = 0.42) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, "rgba(40,24,14,1)")
  gradient.addColorStop(0.35, "rgba(40,24,14,0.55)")
  gradient.addColorStop(1, "rgba(40,24,14,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  const shadow = new Mesh(
    new PlaneGeometry(width, depth),
    new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: strength,
      depthWrite: false,
    }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = y
  return shadow
}

/**
 * The colour actually painted behind an element (the first ancestor with a solid background),
 * so the scene can render onto the same colour and its glass has something to refract.
 */
export function pageBackground(element: HTMLElement) {
  let node: HTMLElement | null = element
  while (node) {
    const color = getComputedStyle(node).backgroundColor
    const match = color.match(/rgba?\(([^)]+)\)/)
    if (match) {
      const [r, g, b, a = 1] = match[1]
        .split(/[\s,/]+/)
        .filter(Boolean)
        .map(Number)
      if (a > 0.99) return new Color(`rgb(${r}, ${g}, ${b})`)
    }
    node = node.parentElement
  }
  return new Color("#faf4e6")
}

export function disposeTextures(...textures: (Texture | null | undefined)[]) {
  textures.forEach((texture) => texture?.dispose())
}
