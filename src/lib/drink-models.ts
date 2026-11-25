import {
  ACESFilmicToneMapping,
  BoxGeometry,
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
  SphereGeometry,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
} from "three"
import type { DrinkShape } from "@/content/tetto"

type Profile = readonly (readonly [radius: number, height: number])[]

type Vessel = {
  profile: Profile
  fill: number
  color: string
  stem?: boolean
  foam?: boolean
  ice?: boolean
  bubbly?: boolean
}

const VESSELS: Record<DrinkShape, Vessel> = {
  beer: {
    profile: [
      [0.54, -1.7],
      [0.63, -1.6],
      [0.65, -1.46],
      [0.82, 1.13],
      [0.85, 1.32],
      [0.85, 1.47],
    ],
    fill: 0.98,
    color: "#b96b15",
    foam: true,
    bubbly: true,
  },
  wine: {
    profile: [
      [0.1, -0.65],
      [0.3, -0.57],
      [0.61, -0.4],
      [0.81, -0.12],
      [0.88, 0.25],
      [0.85, 0.6],
      [0.75, 0.94],
      [0.68, 1.24],
    ],
    fill: 0.33,
    color: "#854054",
    stem: true,
  },
  cocktail: {
    profile: [
      [0.12, -0.28],
      [0.36, -0.24],
      [0.63, -0.08],
      [0.89, 0.16],
      [1.03, 0.43],
      [1.1, 0.72],
      [1.12, 0.79],
    ],
    fill: 0.62,
    color: "#d28261",
    stem: true,
  },
  spirit: {
    profile: [
      [0.74, -1.7],
      [0.85, -1.66],
      [0.88, -1.54],
      [0.96, -0.09],
      [0.97, 0.1],
    ],
    fill: -0.97,
    color: "#d7a553",
  },
  highball: {
    profile: [
      [0.59, -1.65],
      [0.66, -1.58],
      [0.68, -1.45],
      [0.68, 1.33],
      [0.7, 1.53],
    ],
    fill: 1.03,
    color: "#bfc87a",
    ice: true,
  },
  sparkling: {
    profile: [
      [0.1, -0.4],
      [0.22, -0.33],
      [0.36, -0.18],
      [0.49, 0.18],
      [0.53, 0.66],
      [0.5, 1.25],
      [0.46, 1.65],
    ],
    fill: 1.03,
    color: "#d9a865",
    stem: true,
    bubbly: true,
  },
  spritz: {
    profile: [
      [0.12, -0.7],
      [0.4, -0.62],
      [0.73, -0.42],
      [0.96, -0.04],
      [1.02, 0.31],
      [0.97, 0.68],
      [0.88, 0.99],
    ],
    fill: 0.51,
    color: "#cf6c4d",
    stem: true,
    ice: true,
  },
}

function lathe(profile: Profile) {
  return new LatheGeometry(
    profile.map(([r, y]) => new Vector2(r, y)),
    64,
  )
}

function makeDrink(shape: DrinkShape) {
  const { profile, fill, color, stem, foam, ice, bubbly } = VESSELS[shape]
  const group = new Group()
  const [bottomRadius, bottom] = profile[0]
  const [rimRadius, rimHeight] = profile[profile.length - 1]
  const glass = new MeshPhysicalMaterial({
    color: "#e9eee2",
    metalness: 0.08,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  })
  const thickness = stem ? 0.035 : 0.13
  const cavity = [
    [bottomRadius - 0.04, bottom + thickness] as const,
    ...profile
      .slice(1)
      .filter(([, y]) => y > bottom + thickness)
      .map(([r, y]) => [r - 0.037, y] as const),
  ]
  const shell = new Mesh(
    lathe([[0, bottom], ...profile, ...[...cavity].reverse(), [0, bottom + thickness]]),
    glass,
  )
  shell.renderOrder = 2
  group.add(shell)

  const rim = new Mesh(new TorusGeometry(rimRadius - 0.018, 0.021, 10, 64), glass)
  rim.rotation.x = Math.PI / 2
  rim.position.y = rimHeight
  rim.renderOrder = 3
  group.add(rim)

  if (stem) {
    const foot = new Mesh(
      lathe([
        [0, -1.68],
        [0.48, -1.68],
        [0.58, -1.66],
        [0.59, -1.62],
        [0.52, -1.57],
        [0.2, -1.55],
        [0.12, -1.5],
        [0.08, bottom - 0.08],
        [bottomRadius + 0.045, bottom],
        [0, bottom + 0.02],
      ]),
      glass,
    )
    foot.renderOrder = 2
    group.add(foot)
  }

  const fillProfile = cavity.filter(([, y]) => y < fill)
  const [lowerRadius, lowerHeight] = fillProfile[fillProfile.length - 1]
  const [upperRadius, upperHeight] = cavity[fillProfile.length]
  const radius =
    lowerRadius + ((upperRadius - lowerRadius) * (fill - lowerHeight)) / (upperHeight - lowerHeight)
  const liquidMaterial = new MeshPhysicalMaterial({
    color,
    roughness: 0.27,
    clearcoat: 0.82,
    clearcoatRoughness: 0.15,
  })
  group.add(
    new Mesh(
      lathe([
        [0, bottom + thickness],
        ...fillProfile,
        [radius, fill],
        [radius * 0.96, fill + 0.015],
        [0, fill + 0.017],
      ]),
      liquidMaterial,
    ),
  )

  if (foam) {
    group.add(
      new Mesh(
        lathe([
          [0, fill],
          [radius, fill],
          [radius + 0.02, fill + 0.26],
          [radius * 0.94, fill + 0.32],
          [radius * 0.58, fill + 0.34],
          [0, fill + 0.32],
        ]),
        new MeshStandardMaterial({ color: "#fff4d7", roughness: 0.92 }),
      ),
    )
  }
  if (bubbly) {
    const bubbles = new InstancedMesh(
      new SphereGeometry(0.018, 8, 6),
      new MeshStandardMaterial({ color: foam ? "#ffdc90" : "#fff0bd", roughness: 0.3 }),
      24,
    )
    const placement = new Matrix4()
    for (let i = 0; i < bubbles.count; i++) {
      const angle = i * 2.4
      const progress = ((i * 17) % 25) / 25
      const surface = cavity.findIndex(
        ([, y]) => y > bottom + thickness + progress * (fill - bottom - thickness),
      )
      const [startRadius, startY] = cavity[Math.max(0, surface - 1)]
      const [endRadius, endY] = cavity[Math.max(1, surface)]
      const y = bottom + thickness + progress * (fill - bottom - thickness)
      const width = startRadius + ((endRadius - startRadius) * (y - startY)) / (endY - startY)
      placement.makeTranslation(width * Math.sin(angle), y, width * Math.cos(angle))
      bubbles.setMatrixAt(i, placement)
    }
    group.add(bubbles)
  }
  if (ice) {
    const geometry = new BoxGeometry(0.4, 0.37, 0.39)
    const material = new MeshPhysicalMaterial({
      color: "#f2fafa",
      roughness: 0.26,
      clearcoat: 1,
      transparent: true,
      opacity: 0.82,
    })
    for (let i = 0; i < 3; i++) {
      const cube = new Mesh(geometry, material)
      const angle = i * 2.4
      cube.position.set(
        Math.sin(angle) * radius * 0.54,
        fill + 0.055,
        Math.cos(angle) * radius * 0.54,
      )
      cube.rotation.set(0.33 * (i - 1), angle, 0.3 * i)
      group.add(cube)
    }
  }

  return group
}

export function createDrinkScene(canvas: HTMLCanvasElement, shapes: readonly DrinkShape[]) {
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true })
  if (!context) return

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = ACESFilmicToneMapping

  const scene = new Scene()
  const tilt = new Group()
  const models = shapes.map(makeDrink)
  tilt.add(...models)
  scene.add(tilt, new HemisphereLight("#fff5e8", "#825c42", 2.2))
  const key = new DirectionalLight("#fff4e2", 3.2)
  key.position.set(-3, 3, 5)
  const rim = new DirectionalLight("#e4f1fa", 2.4)
  rim.position.set(3, 4, -3)
  scene.add(key, rim)

  const camera = new OrthographicCamera(-2.3, 2.3, 2.3, -2.3, 0.1, 30)
  camera.position.set(0, 2, 10)
  camera.lookAt(0, 0, 0)

  return {
    draw(position: number, pointerX: number, pointerY: number) {
      const index = Math.round(position)
      const swap = Math.abs(position - index) * 2
      for (const [i, model] of models.entries()) model.visible = i === index
      models[index].rotation.y = position * Math.PI * 2 - 0.18
      models[index].scale.setScalar(1 - 0.24 * swap)
      const scrollTilt = Math.sin(position * Math.PI * 2) * 0.1
      tilt.rotation.set(pointerY * 0.14, pointerX * 0.48, scrollTilt - pointerX * 0.09)
      renderer.render(scene, camera)
    },
    resize(width: number, height: number) {
      const aspect = width / height
      const extent = Math.max(2.05, 1.28 / aspect)
      camera.left = -extent * aspect
      camera.right = extent * aspect
      camera.top = extent
      camera.bottom = -extent
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    },
    dispose() {
      const geometries = new Set<LatheGeometry | TorusGeometry | BoxGeometry | SphereGeometry>()
      const materials = new Set<MeshPhysicalMaterial | MeshStandardMaterial>()
      tilt.traverse((object) => {
        if (object instanceof Mesh) {
          geometries.add(object.geometry)
          materials.add(object.material)
        }
        if (object instanceof InstancedMesh) object.dispose()
      })
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
    },
  }
}
