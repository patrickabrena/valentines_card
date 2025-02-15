import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
//const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
//const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
//
//scene.add(cubeMesh);

// Load the .glb model
const loader = new GLTFLoader();
loader.load(
  "./heart.glb", // Adjust path based on your setup
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 1.2, 0); // Adjust position if needed
    scene.add(model);
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}% completed`);
  },
  (error) => {
    console.error("An error occurred while loading the model:", error);
  }
);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;


// 3. Add lights (Recommended placement)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 6.9);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(2, 3, 2);
scene.add(pointLight);

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, //makes background transparent
  antialias: true,
});
renderer.setClearColor(0x000000, 0); // Ensures transparency
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false; // Disable zoom to prevent scaling
controls.enablePan = false;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;

   

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
