// const THREE = require('three');
// const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader');
// const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');
// require('./style.css');
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById("bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: container,
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 25;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x87ceeb, 0);
camera.position.setZ(30);
renderer.render(scene, camera);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 10);
directionalLight1.position.set(5, 10, 3);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(1, -5, -12);
scene.add(directionalLight1);
scene.add(directionalLight2);

let land;
const loader = new GLTFLoader();
loader.load(
  "city-sim-game/village/scene1.gltf",
  function (gltf) {
    land = gltf.scene;
    scene.add(land);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let mouseDown = false;
function animate() {
  requestAnimationFrame(animate);

  if (land) {
    if (!mouseDown) {
      land.rotation.y += 0.005;
    }
  }

  renderer.render(scene, camera);
  controls.update();
}
container.addEventListener("mousedown", function () {
  mouseDown = true;
});
container.addEventListener("mouseup", function () {
  mouseDown = false;
});

let modelQueue = []
modelQueue.push("city-sim-game/village/scene3.gltf");
modelQueue.push("city-sim-game/village/scene2.gltf");



// Function to load a new model
function loadNewModel(modelPath) {
  // Remove the existing model from the scene if present
  if (land) {
    scene.remove(land);
  }

  // Load the new model
  loader.load(
      modelPath,
      function(gltf) {
        land = gltf.scene;
        scene.add(land);
      },
      undefined,
      function(error) {
        console.error(error);
      }
  );
}



animate();
