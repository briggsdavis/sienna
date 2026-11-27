import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  OrthographicCamera,
  Quaternion,
  Scene,
  SphereGeometry,
  SplineCurve,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three"
import type { DrinkShape } from "@/content/tetto"
import {
  contactShadow,
  noiseNormalMap,
  pageBackground,
  studioEnvironment,
  thinGlass,
} from "@/lib/render-realism"

type Profile = readonly (readonly [radius: number, height: number])[]

type Vessel = {
  profile: Profile
  fill: number
  color: string
  /** How far light travels through the drink before taking on its full colour (lower is deeper). */
  depth: number
  stem?: boolean
  foam?: boolean
  ice?: boolean
  bubbly?: boolean
  /** Curved glassware: the profile is smoothed into a continuous curve. */
  round?: boolean
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
    color: "#c27a1c",
    depth: 1.6,
    foam: true,
    bubbly: true,
  },
  wine: {
    profile: [
      [0.1, -0.66],
      [0.45, -0.56],
      [0.74, -0.34],
      [0.92, -0.02],
      [0.96, 0.3],
      [0.9, 0.66],
      [0.78, 0.98],
      [0.66, 1.24],
    ],
    fill: 0.3,
    color: "#7a0f20",
    depth: 0.35,
    stem: true,
    round: true,
  },

  cocktail: {
    profile: [
      [0.11, -0.27],
      [0.42, -0.22],
      [0.74, -0.08],
      [0.98, 0.14],
      [1.1, 0.4],
      [1.14, 0.62],
      [1.14, 0.72],
    ],
    fill: 0.5,
    color: "#d98a62",
    depth: 1.3,
    stem: true,
    round: true,
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
    color: "#d9a04a",
    depth: 1.1,
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
    depth: 1.4,
    ice: true,
  },
  sparkling: {
    profile: [
      [0.07, -0.42],
      [0.25, -0.36],
      [0.4, -0.18],
      [0.49, 0.15],
      [0.52, 0.6],
      [0.5, 1.15],
      [0.46, 1.65],
    ],
    fill: 1.03,
    color: "#d9a865",
    depth: 1.2,
    stem: true,
    bubbly: true,
    round: true,
  },

  spritz: {
    profile: [
      [0.11, -0.72],
      [0.52, -0.62],
      [0.86, -0.38],
      [1.04, -0.02],
      [1.08, 0.3],
      [1.01, 0.68],
      [0.9, 0.99],
    ],
    fill: 0.51,
    color: "#e0663f",
    depth: 1.0,
    stem: true,
    ice: true,
    round: true,
  },
}

function lathe(profile: Profile) {
  return new LatheGeometry(
    profile.map(([r, y]) => new Vector2(r, y)),
    128,
  )
}

/** Turns a handful of control points into a smooth curve, so bowls read as round. */
function smooth(profile: Profile): Profile {
  const curve = new SplineCurve(profile.map(([r, y]) => new Vector2(r, y)))
  return curve.getPoints(48).map(({ x, y }) => [x, y] as const)
}

/** Surface textures shared by every drink, made once per scene. */
type Textures = ReturnType<typeof makeTextures>

function makeTextures() {
  return {
    ripple: noiseNormalMap(5, 3, 5, 21, 2),
    foam: noiseNormalMap(24, 3, 14, 5, 2),
    ice: noiseNormalMap(8, 4, 10, 13, 1),
  }
}

function makeDrink(shape: DrinkShape, textures: Textures) {
  const vessel = VESSELS[shape]
  const { fill, color, depth, stem, foam, ice, bubbly } = vessel
  const profile = vessel.round ? smooth(vessel.profile) : vessel.profile
  const group = new Group()
  const [bottomRadius, bottom] = profile[0]
  const [rimRadius, rimHeight] = profile[profile.length - 1]
  const glass = thinGlass()
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

  const rim = new Mesh(new TorusGeometry(rimRadius - 0.018, 0.021, 12, 128), glass)
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
  // The drink refracts what is behind it and deepens in colour the further light travels
  // through it, so the middle of the glass reads richer than the edges. A faint ripple
  // texture keeps the surface from looking like solid plastic.
  const tint = new Color(color)
  const liquidMaterial = new MeshPhysicalMaterial({
    color: new Color("#ffffff").lerp(tint, 0.15),
    transmission: 1,
    thickness: radius * 2,
    ior: 1.34,
    roughness: 0.05,
    attenuationColor: tint,
    attenuationDistance: depth,
    specularIntensity: 1,
    envMapIntensity: 1.2,
    normalMap: textures.ripple,
    normalScale: new Vector2(0.06, 0.06),
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
        new MeshPhysicalMaterial({
          color: "#fff6e0",
          roughness: 0.9,
          normalMap: textures.foam,
          normalScale: new Vector2(0.9, 0.9),
          sheen: 0.6,
          sheenColor: new Color("#fffaf0"),
          sheenRoughness: 0.7,
        }),
      ),
    )
  }
  if (bubbly) {
    // Streams of small, glossy bubbles of varying size, clinging near the glass.
    const bubbles = new InstancedMesh(
      new SphereGeometry(0.011, 10, 8),
      new MeshPhysicalMaterial({
        color: "#ffffff",
        emissive: "#fffaf0",
        emissiveIntensity: 0.9,
        roughness: 0.05,
        clearcoat: 1,
        envMapIntensity: 1.6,
      }),
      90,
    )
    const placement = new Matrix4()
    const size = new Vector3()
    const turn = new Quaternion()
    const spot = new Vector3()
    for (let i = 0; i < bubbles.count; i++) {
      const angle = i * 2.399 + Math.sin(i * 1.7) * 0.4
      const progress = ((i * 37) % 89) / 89
      const surface = cavity.findIndex(
        ([, y]) => y > bottom + thickness + progress * (fill - bottom - thickness),
      )
      const [startRadius, startY] = cavity[Math.max(0, surface - 1)]
      const [endRadius, endY] = cavity[Math.max(1, surface)]
      const y = bottom + thickness + progress * (fill - bottom - thickness)
      const width = startRadius + ((endRadius - startRadius) * (y - startY)) / (endY - startY)
      const inset = 0.88 + 0.1 * Math.abs(Math.sin(i * 3.1))
      spot.set(width * inset * Math.sin(angle), y, width * inset * Math.cos(angle))
      size.setScalar(0.45 + 0.9 * Math.abs(Math.sin(i * 5.3)))
      placement.compose(spot, turn, size)
      bubbles.setMatrixAt(i, placement)
    }
    group.add(bubbles)
  }
  if (ice) {
    // Clear, slightly frosted ice with melted, rounded corners.
    const geometry = new IcosahedronGeometry(0.24, 1)
    geometry.scale(1, 0.9, 0.95)
    const material = new MeshPhysicalMaterial({
      color: "#f4fbff",
      transmission: 1,
      thickness: 0.4,
      ior: 1.31,
      roughness: 0.12,
      attenuationColor: new Color("#dff1f7"),
      attenuationDistance: 1.2,
      normalMap: textures.ice,
      normalScale: new Vector2(0.5, 0.5),
      flatShading: false,
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

  // A studio environment to reflect, on the card's own cream, so the glasses have
  // highlights, refraction and a soft shadow instead of flat shading.
  const scene = new Scene()
  const environment = studioEnvironment(renderer)
  scene.environment = environment
  scene.background = pageBackground(canvas)
  const textures = makeTextures()
  const tilt = new Group()
  const models = shapes.map((shape) => makeDrink(shape, textures))
  tilt.add(...models)
  const key = new DirectionalLight("#fff4e2", 1.2)
  key.position.set(-3, 3, 5)
  const shadow = contactShadow(2.8, 1.4, -1.71, 0.45)
  scene.add(tilt, key, shadow)

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
      const geometries = new Set<
        LatheGeometry | TorusGeometry | SphereGeometry | IcosahedronGeometry
      >()
      const materials = new Set<MeshPhysicalMaterial>()
      tilt.traverse((object) => {
        if (object instanceof Mesh) {
          geometries.add(object.geometry)
          materials.add(object.material)
        }
        if (object instanceof InstancedMesh) object.dispose()
      })
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      shadow.geometry.dispose()
      shadow.material.map?.dispose()
      shadow.material.dispose()
      environment.dispose()
      Object.values(textures).forEach((texture) => texture.dispose())
      renderer.dispose()
    },
  }
}
