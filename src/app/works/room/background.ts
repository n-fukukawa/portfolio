import * as THREE from 'three'
import Size from './Size'

// Section
const wrapper = document.getElementById('room-wrapper') as HTMLElement

// Canvas
const canvas = document.getElementById('background') as HTMLCanvasElement

// Sizes
const size = new Size(0, 6)

// Scene
const scene = new THREE.Scene()

// Fog
scene.fog = new THREE.Fog(0xffffff, 20, 50)

// Objects
const boxes: THREE.Mesh[] = []
const colors = [0x7799ff, 0xff7799, 0x99ff77, 0x7799ff, 0x7799ff]
const boxMaterials: THREE.Material[] = []
colors.forEach((color) => {
  boxMaterials.push(new THREE.MeshStandardMaterial({ color }))
})
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

for (let i = 0; i < 200; i++) {
  const boxMaterial: THREE.Material = boxMaterials[i % boxMaterials.length]
  const boxMesh: THREE.Mesh = new THREE.Mesh(boxGeometry, boxMaterial)
  boxMesh.position.set(
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 30,
    -Math.random() * 10
  )
  const scale = Math.random() + 0.5
  boxMesh.scale.set(scale, scale, scale)
  boxMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
  scene.add(boxMesh)
  boxes.push(boxMesh)
}

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
renderer.setClearColor(0xffffff, 1.0)

// MouseMove
const mousemoveFunc = (e: MouseEvent) => {
  const x = -(e.clientX - size.width * 0.5) / (size.width * 0.5) / 2
  const y = (e.clientY - size.height * 0.5) / (size.height * 0.5) / 2
  camera.position.x = 16 * Math.sin((x * Math.PI) / 16)
  camera.position.z = 16 * Math.cos((x * Math.PI) / 16)
  camera.position.y = 1 + 2 * y
  camera.lookAt(0, 0, 0)
}

wrapper.addEventListener('mousemove', mousemoveFunc)

window.addEventListener('resize', () => {
  size.reflesh()
  camera.aspect = size.aspect
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})

const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  boxes.forEach((box) => {
    box.rotation.x += deltaTime / 2.5
    box.rotation.y += deltaTime / 2.5
  })

  // controls.update()
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
