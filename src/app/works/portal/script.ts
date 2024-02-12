import * as dat from 'lil-gui'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { BufferAttribute } from 'three'

//@ts-ignore
import FirefilesVertex from './shaders/fireflies/vertex.glsl'
//@ts-ignore
import FirefilesFragment from './shaders/fireflies/fragment.glsl'
//@ts-ignore
import PortalVertex from './shaders/portal/vertex.glsl'
//@ts-ignore
import PortalFragment from './shaders/portal/fragment.glsl'

if (typeof window === 'object') {
  /**
   * Base
   */
  // Debug
  const gui = new dat.GUI({
    width: 240
  })

  gui.close()

  const debugObject = {
    clearColor: 0x352727,
    color1: 0xff0000,
    color2: 0x0000ff,
    firefliesCount: 30
  }

  // Canvas
  const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

  // Header
  const header = document.getElementById('header') as HTMLElement

  // Scene
  const scene = new THREE.Scene()

  /**
   * Loaders
   */
  // loading manager
  const loadingBarEl = document.querySelector('.loading-bar') as HTMLElement
  console.log(loadingBarEl)
  const loadingManager = new THREE.LoadingManager(
    () => {
      gsap.delayedCall(0.5, () => {
        gsap.to(overlayMaterial.uniforms.uAlpha, { value: 0, duration: 4 })
        loadingBarEl.style.transform = ''
        loadingBarEl.classList.add('ended')
      })
    },
    (url, loaded, total) => {
      loadingBarEl.style.opacity = '1'
      loadingBarEl.style.transform = `scaleX(${loaded / total})`
    }
  )

  // Texture loader
  const textureLoader = new THREE.TextureLoader(loadingManager)

  // // Draco loader
  // const dracoLoader = new DRACOLoader(loadingManager)
  // dracoLoader.setDecoderPath('draco/')

  // GLTF loader
  const gltfLoader = new GLTFLoader(loadingManager)
  // gltfLoader.setDRACOLoader(dracoLoader)

  // Overlay
  const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uAlpha: { value: 1 }
    },
    vertexShader: `
    void main() {
        gl_Position = vec4(position, 1.0);
    }`,
    fragmentShader: `
    uniform float uAlpha;

    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }
    `
  })
  const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
  scene.add(overlay)

  /**
   * Textures
   */
  const bakedTexture = textureLoader.load(
    '/assets/works/portal/textures/baked.jpg'
  )
  bakedTexture.flipY = false
  bakedTexture.encoding = THREE.sRGBEncoding

  /**
   * Materials
   */
  // Baked material
  const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture
  })

  // Polelight material
  const polelightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffe5
  })

  // Portallight material
  const portallightMaterial = new THREE.ShaderMaterial({
    // transparent: true,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uColor1: { value: new THREE.Color(0x0c4fd4) },
      uColor2: { value: new THREE.Color(0xd0ccc3) },
      uMode: { value: 1 }
    },
    vertexShader: PortalVertex,
    fragmentShader: PortalFragment,
    side: THREE.DoubleSide
  })

  gui.addColor(portallightMaterial.uniforms.uColor2, 'value').name('color1')
  gui.addColor(portallightMaterial.uniforms.uColor1, 'value').name('color2')
  gui
    .add(portallightMaterial.uniforms.uMode, 'value')
    .name('gradient pattern')
    .options({
      linear: 1,
      radial: 2
    })

  /**
   * Model
   */
  gltfLoader.load('/assets/works/portal/models/model.glb', (gltf) => {
    const bakedMesh = gltf.scene.children.find(
      (child) => child.name === 'baked'
    ) as THREE.Mesh
    const portalMesh = gltf.scene.children.find(
      (child) => child.name === 'portal'
    ) as THREE.Mesh
    const polelightRMesh = gltf.scene.children.find(
      (child) => child.name === 'polelightR'
    ) as THREE.Mesh
    const polelightLMesh = gltf.scene.children.find(
      (child) => child.name === 'polelightL'
    ) as THREE.Mesh

    bakedMesh.material = bakedMaterial
    portalMesh.material = portallightMaterial
    polelightRMesh.material = polelightMaterial
    polelightLMesh.material = polelightMaterial

    scene.add(gltf.scene)
  })

  /**
   * Fireflies
   */

  const firefliesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 120 },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xffffff) }
    },
    vertexShader: FirefilesVertex,
    fragmentShader: FirefilesFragment,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  let fireflies: THREE.Points
  const createFireflies = () => {
    if (fireflies) {
      scene.remove(fireflies)
    }
    const firefliesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(debugObject.firefliesCount * 3)
    const scales = new Float32Array(debugObject.firefliesCount)

    for (let i = 0; i < debugObject.firefliesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 3.5
      positions[i * 3 + 1] = Math.random() * 1.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.5

      scales[i] = Math.random() * 0.6 + 0.4
    }

    firefliesGeometry.setAttribute(
      'position',
      new BufferAttribute(positions, 3)
    )
    firefliesGeometry.setAttribute('aScale', new BufferAttribute(scales, 1))

    fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
    scene.add(fireflies)
  }

  createFireflies()

  gui
    .add(firefliesMaterial.uniforms.uSize, 'value')
    .name('firefliesSize')
    .min(30)
    .max(500)
    .step(0.01)

  gui
    .add(debugObject, 'firefliesCount')
    .name('firefliesCount')
    .min(0)
    .max(100)
    .step(1)
    .onFinishChange(createFireflies)

  gui
    .addColor(firefliesMaterial.uniforms.uColor, 'value')
    .name('firefliesColor')

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - header.clientHeight
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight - header.clientHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //Update fireflies
    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(
      window.devicePixelRatio,
      2
    )
  })

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.x = 4
  camera.position.y = 2
  camera.position.z = 4
  scene.add(camera)

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.maxDistance = 20
  controls.maxPolarAngle = Math.PI / 2

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setClearColor(debugObject.clearColor)

  gui
    .addColor(debugObject, 'clearColor')
    .onChange(() => {
      renderer.setClearColor(debugObject.clearColor)
    })
    .name('background')

  /**
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    firefliesMaterial.uniforms.uTime.value = elapsedTime
    portallightMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
}
