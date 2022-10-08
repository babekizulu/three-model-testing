//models
import EasternCape from './models/easterncape.glb';
//libs
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
const {Scene, PerspectiveCamera, WebGLRenderer, HemisphereLight, DirectionalLight} = THREE;
//styling
import './scss/App.scss';
//dom elements
const sceneDiv = document.querySelector('#scene');
//instantiate a scene
const scene = new Scene();
//instantiate a camera
const w = window.innerWidth;
const h = window.innerHeight;
const aspectRatio = w/h;
const fieldOfView = 75;
const nearClip = 0.1;
const farClip = 1000;
const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearClip, farClip);
//instantiate lights
const lights = new HemisphereLight(0xffffbb, 0x080820, 1);
const dirLight = new DirectionalLight(0xffffff, 0.8);
//instantiate a renderer
const renderer = new WebGLRenderer();
//instantiate a gltf loader
const loader = new GLTFLoader();
//create a canvas
const canvas = renderer.domElement;
//set three display size
renderer.setSize(w, h);
//append canvas to dom
sceneDiv.appendChild(canvas);
//set camera position
camera.position.set(0, 0, 2);
//set lights position
lights.position.set(0, 20, 0);
dirLight.position.set(-3, 10, -10);
//add lights
scene.add(lights);
scene.add(dirLight);
//load model
loader.load(EasternCape, gltf => {
   const ec = gltf.scene;
   ec.scale.set(0.4, 0.4, 0.4);
   ec.position.y = 1;
   ec.rotation.x = 45;
   scene.add(ec);
},
undefined, err => {
    console.log(err);s
}
)
//render loop
const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();

