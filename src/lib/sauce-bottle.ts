import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  OrthographicCamera,
  Scene,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from "three"
import { SAUCES } from "@/content/emporio"

const LABEL_ICONS = {
  tomato:
    "M20 13C8 9 5 19 7 27c2 7 9 10 17 8 8 2 15-1 17-8 2-8-1-18-13-14M24 8v9m-9-4 9 4 9-4m-13 9-4 6m12-6 4 6",
  pot: "M9 19h30l-2 12a5 5 0 0 1-5 4H16a5 5 0 0 1-5-4zM6 24h5m26 0h5M10 16h28m-18 0v-3h8v3M18 9c-4-4 4-4 0-8m12 8c-4-4 4-4 0-8",
  martini: "M8 10h32L24 26zM24 26v13m-8 0h16M13 16h22m-7-3 8-8m-8 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
  pepper:
    "M6 36c9-3 11-12 16-19 3-4 9-5 13-2 5 4 2 11-2 15-8 8-18 10-27 6zM34 14c4-3 4-6 2-9m-7 13c-4 1-6 4-7 7",
  bolt: "M27 4 9 26h13l-2 18 19-24H26z",
  swirl:
    "M9 25c0-9 7-16 16-16 8 0 14 6 14 13 0 7-5 12-12 12-5 0-9-4-9-9 0-4 3-7 7-7 3 0 6 2 6 5m-18 8c3 6 9 9 16 9",
  cheese: "M8 24 34 10l6 14v13H8zM8 24h32m-21 6h.1m12 2h.1m-7-13h.1",
  garlic:
    "M24 13c-2-4-2-7 1-10m-7 11c-1 9-10 11-10 18 0 5 5 7 10 5 3 3 9 3 12 0 5 2 10 0 10-5 0-7-9-9-10-18zM21 15c1 8-5 15-3 22m9-22c-1 8 5 15 3 22",
  leaf: "M11 34C9 23 16 12 37 8c0 17-7 26-21 26M9 39 30 17m-10 9h7m-7 0v-7",
  mushroom:
    "M7 24a17 17 0 0 1 34 0c0 6-34 6-34 0zM20 29l-2 9c3 3 9 3 12 0l-2-9m-10-11h.1m11-2h.1m5 6h.1",
} as const

const GLASS_PROFILE = [
  [0, -2.01],
  [0.57, -2.01],
  [0.72, -2.0],
  [0.82, -1.96],
  [0.87, -1.9],
  [0.88, -1.81],
  [0.88, 0.47],
  [0.87, 0.62],
  [0.82, 0.77],
  [0.72, 0.91],
  [0.59, 1.03],
  [0.47, 1.15],
  [0.41, 1.25],
  [0.39, 1.37],
  [0.39, 1.66],
  [0.43, 1.69],
  [0.43, 1.74],
  [0.36, 1.77],
] as const

function labelTexture(sauce: (typeof SAUCES)[number], name: string, number: number) {
  const label = document.createElement("canvas")
  label.width = 1536
  label.height = 512
  const ctx = label.getContext("2d")!
  const { paper, ink, accent, icon } = sauce.label
  const center = label.width / 2

  ctx.fillStyle = paper
  ctx.fillRect(0, 0, label.width, label.height)
  ctx.globalAlpha = 0.16
  ctx.strokeStyle = accent
  ctx.lineWidth = 2
  for (let x = -280; x < label.width; x += 34) {
    ctx.beginPath()
    ctx.moveTo(x, label.height)
    ctx.lineTo(x + 280, 0)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  ctx.fillStyle = ink
  ctx.fillRect(0, 20, label.width, 3)
  ctx.fillRect(0, 487, label.width, 3)
  ctx.fillStyle = accent
  ctx.fillRect(0, 30, label.width, 5)
  ctx.fillRect(0, 475, label.width, 5)

  ctx.fillStyle = paper
  ctx.fillRect(center - 268, 53, 536, 406)
  ctx.strokeStyle = accent
  ctx.lineWidth = 3
  ctx.strokeRect(center - 268, 53, 536, 406)
  ctx.strokeRect(center - 258, 63, 516, 386)

  ctx.fillStyle = ink
  ctx.textAlign = "center"
  ctx.font = "700 39px Georgia, serif"
  ctx.fillText("E M P O R I O", center, 125)
  ctx.font = "600 18px system-ui, sans-serif"
  ctx.fillText("S I E N N A   M E R C A T O", center, 154)

  ctx.save()
  ctx.translate(center - 43, 169)
  ctx.scale(1.8, 1.8)
  ctx.strokeStyle = accent
  ctx.lineWidth = 2.5
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.stroke(new Path2D(LABEL_ICONS[icon]))
  ctx.restore()

  ctx.fillStyle = ink
  ctx.font = "bold 82px Georgia, serif"
  ctx.fillText(name, center, 340, 462)

  ctx.fillStyle = accent
  ctx.fillRect(center - 193, 365, 386, 3)
  ctx.font = "700 27px system-ui, sans-serif"
  ctx.fillText("H O U S E - M A D E   S A U C E", center, 411, 442)
  ctx.font = "700 19px system-ui, sans-serif"
  ctx.fillText(String(number).padStart(2, "0"), center - 226, 238)
  ctx.fillText(String(number).padStart(2, "0"), center + 226, 238)

  ctx.fillStyle = ink
  ctx.font = "700 29px Georgia, serif"
  for (const side of [192, 1344]) {
    ctx.fillText("EMPORIO", side, 244)
    ctx.font = "600 17px system-ui, sans-serif"
    ctx.fillText("HOUSE-MADE SAUCE", side, 273)
    ctx.font = "700 29px Georgia, serif"
  }

  const texture = new CanvasTexture(label)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

export function createSauceBottle(canvas: HTMLCanvasElement, names: readonly string[]) {
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true })
  if (!context) return

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.08

  const camera = new OrthographicCamera(-1.65, 1.65, 2.45, -2.45, 0.1, 30)
  camera.position.set(0, 1.24, 10)
  camera.lookAt(0, 0.02, 0)

  const scene = new Scene()
  const tilt = new Group()
  const bottle = new Group()
  tilt.add(bottle)
  scene.add(tilt, new HemisphereLight("#fff5df", "#685142", 2.5))
  const key = new DirectionalLight("#fff3e1", 4.1)
  key.position.set(-3, 5, 6)
  const rim = new DirectionalLight("#fff0d9", 2.9)
  rim.position.set(4, 2, -4)
  scene.add(key, rim)

  const glass = new Mesh(
    new LatheGeometry(
      GLASS_PROFILE.map(([radius, height]) => new Vector2(radius, height)),
      80,
    ),
    new MeshPhysicalMaterial({
      color: "#e6efd8",
      transparent: true,
      opacity: 0.29,
      depthWrite: false,
      roughness: 0.09,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
  )
  glass.renderOrder = 2

  const sauceFill = new Mesh(
    new LatheGeometry(
      [
        ...GLASS_PROFILE.filter(([, height]) => height <= 1.37).map(
          ([radius, height]) => new Vector2(radius * 0.935, height + 0.065),
        ),
        new Vector2(0, 1.435),
      ],
      72,
    ),
    new MeshStandardMaterial({ color: SAUCES[0].label.fill, roughness: 0.48 }),
  )

  const capProfile = [
    [0, 1.62],
    [0.44, 1.62],
    [0.48, 1.65],
    [0.48, 1.96],
    [0.46, 2],
    [0, 2],
  ]
  const cap = new Mesh(
    new LatheGeometry(
      capProfile.map(([radius, height]) => new Vector2(radius, height)),
      64,
    ),
    new MeshStandardMaterial({ color: "#25211e", metalness: 0.35, roughness: 0.37 }),
  )
  const ribGeometry = new CylinderGeometry(0.009, 0.009, 0.26, 5)
  const ribMaterial = new MeshStandardMaterial({ color: "#352e28", roughness: 0.45 })
  const ribs = new InstancedMesh(ribGeometry, ribMaterial, 56)
  const ribPosition = new Matrix4()
  for (let rib = 0; rib < ribs.count; rib += 1) {
    const angle = (rib / ribs.count) * Math.PI * 2
    ribPosition.makeTranslation(Math.sin(angle) * 0.48, 1.8, Math.cos(angle) * 0.48)
    ribs.setMatrixAt(rib, ribPosition)
  }
  cap.add(ribs)

  const textures = SAUCES.map((sauce, index) => labelTexture(sauce, names[index], index + 1))
  const fillColors = SAUCES.map((sauce) => new Color(sauce.label.fill))
  const labelMaterial = new MeshStandardMaterial({ map: textures[0], roughness: 0.68 })
  const overlayMaterial = new MeshStandardMaterial({
    map: textures[1],
    roughness: 0.68,
    transparent: true,
    depthWrite: false,
  })
  const label = new Mesh(
    new CylinderGeometry(0.885, 0.885, 1.54, 80, 1, true, -Math.PI),
    labelMaterial,
  )
  const overlay = new Mesh(
    new CylinderGeometry(0.887, 0.887, 1.54, 80, 1, true, -Math.PI),
    overlayMaterial,
  )
  label.position.y = overlay.position.y = -0.58
  overlay.renderOrder = 3
  bottle.add(glass, sauceFill, cap, label, overlay)

  function draw(position: number, spinning: boolean, pointerX: number, pointerY: number) {
    const first = Math.floor(position)
    const next = Math.min(first + 1, textures.length - 1)
    const blend = Math.max(0, Math.min(1, (position - first - 0.38) / 0.24))
    labelMaterial.map = textures[first]
    overlayMaterial.map = textures[next]
    overlayMaterial.opacity = blend
    overlay.visible = blend > 0 && next !== first
    sauceFill.material.color.lerpColors(fillColors[first], fillColors[next], blend)
    bottle.rotation.y = spinning ? position * Math.PI * 2 - 0.13 : -0.13
    tilt.rotation.set(pointerY * 0.1, pointerX * 0.12, -pointerX * 0.055)
    renderer.render(scene, camera)
  }

  return {
    draw,
    resize(width: number, height: number) {
      const vertical = 2.42
      const horizontal = vertical * (width / height)
      camera.left = -horizontal
      camera.right = horizontal
      camera.top = vertical
      camera.bottom = -vertical
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    },
    dispose() {
      bottle.traverse((object) => {
        if (object instanceof Mesh && object.geometry !== ribGeometry) {
          object.geometry.dispose()
          object.material.dispose()
        }
      })
      ribs.dispose()
      ribGeometry.dispose()
      ribMaterial.dispose()
      textures.forEach((texture) => texture.dispose())
      renderer.dispose()
    },
  }
}
