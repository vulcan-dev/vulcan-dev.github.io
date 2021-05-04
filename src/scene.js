import {
    PerspectiveCamera,
    Scene,
    Mesh,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    PointLight
} from '../vendor/three/build/three.module.js';

//import {OrbitControls} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

//import {
//    OrbitControls
// } from '../vendor/three/examples/jsm/controls/OrbitControls.js'

import Stats from '../vendor/stats/build/stats.module.js';

const _FOV = 90;
const _NearPlane = .1;
const _FarPlane = 1000;

let renderer, scene, camera, stats, canvas;

window.addEventListener('resize', function() {
    // update the size
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = canvas.clientWidth/canvas.clientHeight
    camera.updateProjectionMatrix();
})

function addCube(scene, posX, posY, posZ, color) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial( { color: color } );
    const cube = new Mesh( geometry, material );
    cube.position.set(posX, posY, posZ);
    scene.add( cube );
}

function initialize() {
    canvas = document.querySelector('#canvas');
    renderer = new WebGLRenderer({canvas, antialias: true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    scene = new Scene();
    camera = new PerspectiveCamera(_FOV, 2, _NearPlane, _FarPlane);
    //const controls = new OrbitControls(camera, renderer.domElement);
    
    const planeGeometry = new BoxGeometry(30, .3, 30);
    const planeMaterial = new MeshBasicMaterial( { color: 0x3A3C46 } );
    const plane = new Mesh( planeGeometry, planeMaterial );
    plane.position.set(0, -1, 0);
    scene.add( plane );

    const light = new PointLight( 0xff0000, 1, 100 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    addCube(scene, 0, 0, 0, 0x00FF7F);
    addCube(scene, 0, 1.2, 0, 0x753C36);

    camera.position.y = 1;
    camera.position.z = 3;
    camera.lookAt(0, 0, 0);

    window.requestAnimationFrame(animate);
}

function animate() {
    stats.begin();
    stats.end();
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

initialize();
