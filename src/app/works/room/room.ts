import * as THREE from 'three'
// import CANNON from 'cannon'
// import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'
import resources from '../../../../public/assets/works/room/resources'
import config from './config'

if (typeof window === 'object') {
  // CanvasWrapper
  const wrapper = document.getElementById('room-wrapper') as HTMLElement

  // Canvas
  const canvas = document.getElementById('room') as HTMLCanvasElement

  // Size
  const size = {
    width: 0,
    height: 0
  }
  size.width = Math.min(document.body.clientWidth, config.ROOM_WIDTH)
  size.height = Math.min(window.innerHeight, size.width)

  // Scene
  const scene = new THREE.Scene()

  const $overlay = document.querySelector('.overlay') as HTMLElement
  const $loadingBar = document.querySelector('.loading-bar') as HTMLElement
  // Loaders
  const loadingManager = new THREE.LoadingManager(
    () => {
      gsap.delayedCall(0.5, () => {
        $overlay.classList.add('ended')
        $loadingBar.style.transform = ''
        $loadingBar.classList.add('ended')
      })

      gsap.delayedCall(1.0, () => {
        $overlay.style.display = 'none'
      })
    },
    (_url, loaded, total) => {
      $loadingBar.style.opacity = '1'
      $loadingBar.style.transform = `scaleX(${loaded / total})`
    }
  )

  const textureLoader = new THREE.TextureLoader(loadingManager)

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/assets/draco/')

  const gltfLoader = new GLTFLoader(loadingManager)
  gltfLoader.setDRACOLoader(dracoLoader)

  // Main textures
  const mainTexture = textureLoader.load(
    '/assets/works/room/textures/labo_baked.jpg'
  )
  mainTexture.flipY = false
  mainTexture.encoding = THREE.sRGBEncoding

  // BookTextures
  type Texture = { name: string; texture: THREE.Texture }
  const bookTextures: Texture[] = []

  resources.map((book) => {
    const texture = textureLoader.load(book.path)
    texture.flipY = false
    texture.encoding = THREE.sRGBEncoding

    bookTextures.push({
      name: book.name,
      texture: texture
    })
  })

  // Materials
  type Material = { name: string; material: THREE.Material }

  const monitorMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectionPosition = projectionMatrix * viewPosition;

            gl_Position = projectionPosition;

            vUv = uv;
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;

        void main() {

            gl_FragColor = vec4(vUv.x * sin(uTime), vUv.y * cos(uTime), cos(uTime * 0.3), 1.0);
        }
    `
  })

  const glbMaterials: Material[] = [
    {
      name: 'baked',
      material: new THREE.MeshBasicMaterial({ map: mainTexture })
    },
    {
      name: 'monitor_body',
      material: monitorMaterial
    },
    {
      name: 'Text',
      material: new THREE.MeshBasicMaterial({ color: 0x556980 })
    }
  ]

  bookTextures.map(({ name, texture }) => {
    glbMaterials.push({
      name,
      material: new THREE.MeshBasicMaterial({ map: texture })
    })
  })

  // // Overlay
  // const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  // const overlayMaterial = new THREE.ShaderMaterial( {
  //     transparent: true,
  //     depthWrite: false,
  //     uniforms: {
  //         uAlpha: { value: 1 }
  //     },
  //     vertexShader: `
  //     void main() {
  //         gl_Position = vec4(position, 1.0);
  //     }`,
  //     fragmentShader: `
  //     uniform float uAlpha;

  //     void main() {
  //         gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
  //     }
  //     `
  //  })
  // const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
  // scene.add(overlay)

  // GlbModelf
  let mainModel: THREE.Group
  gltfLoader.load('/assets/works/room/models/room.glb', (gltf) => {
    gltf.scene.children.forEach((child) => {
      const mesh = child as THREE.Mesh
      const material = glbMaterials.find(
        ({ name }) => child.name === name
      )?.material
      if (material) {
        mesh.material = material
      }
    })
    mainModel = gltf.scene
    mainModel.rotation.y = -Math.PI / 4
    mainModel.position.y = -2

    scene.add(mainModel)
  })

  // Resize
  window.addEventListener('resize', () => {
    size.width = Math.min(document.body.clientWidth, config.ROOM_WIDTH)
    size.height = Math.min(window.innerHeight, size.width)

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  // MouseMove
  wrapper?.addEventListener('mousemove', (e) => {
    const x = -(e.clientX - size.width * 0.5) / (size.width * 0.5)
    const y = (e.clientY - size.height * 0.5) / (size.height * 0.5)
    camera.position.x = 16 * Math.sin((x * Math.PI) / 16)
    camera.position.z = 16 * Math.cos((x * Math.PI) / 16)
    camera.position.y = 1 + 2 * y
    camera.lookAt(0, 0, 0)
  })

  // Camera
  const camera = new THREE.PerspectiveCamera(
    50,
    size.width / size.height,
    0.1,
    100
  )
  camera.position.set(0, 1, 16)
  camera.lookAt(0, 0, 0)

  scene.add(camera)

  // Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(30, 10, 5)
  scene.add(directionalLight)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  })
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setClearColor(0xffffff, 0)

  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    monitorMaterial.uniforms.uTime.value = elapsedTime

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
  }

  tick()
}
