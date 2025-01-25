import * as THREE from '../node_modules/three/build/three.module';

const canvas = document.querySelector("#game-canvas");

//Creamos la escena (Scene)
const scene = new THREE.Scene();
//Le damos un color de fondo a la escena
// scene.background = new THREE.Color('skyblue');

//Creamos la camara (Camara) Camara en perspectiva
const camera = new THREE.PerspectiveCamera(
    35,//Los grados en los cuales se vera (Fov) (Field of view) 1-179 grados
    canvas.clientWidth/canvas.clientHeight,//Definimos la posicion, la cual es en el centro (Aspect)
    0.1,//Los compronentes que se renderizaran a lo mas cerca (Near)
    1000//Los componentes que se renderizaran a lo mas lejos (Far)
);

//Camara ortografica
/* const div = 200;
const camera = new THREE.OrthographicCamera(
    canvas.clientWidth / div,
    canvas.clientWidth / - div,
    canvas.clientHeight / div,
    canvas.clientHeight /  - div,
    .1,
    1000
); */
//Definimos una pisicion a la camara en el plano carteciano
camera.position.set(0, 0 ,20);

//Texturas
const texture_loader = new THREE.TextureLoader();
texture_loader.setPath('../src/assets/textures/');
const base_color = texture_loader.load('base_color.jpg');
const rouness = texture_loader.load('metallic_roughness.png');
const normal_map = texture_loader.load('normal_map.png');

//Creamos la geometria del objeto (Mesh) la cual se define como un cubo 2(ancho), 2(largo), 2(alto)
const geometri = new THREE.BoxBufferGeometry( 2, 2, 2 );

//Creamos un material para el cubo
const material = new THREE.MeshBasicMaterial({
    // color: 'teal',
    // wireframe: true
    map: base_color
});

const material_standar = new THREE.MeshStandardMaterial({
    map: base_color,
    rounessMap: rouness,
    normalMap: normal_map
    // color: 'coral',
/*     flatShading: true, //Esto hace que se note mas los bordes del objeto
    roughness: 0 //Rugosidad esto es que tanto reflejara la luz el material */
});//PBR Phisycali based render (Este material tiene fisicas)

//Generamos el cubo pasando la geometria y el material
const mesh = new THREE.Mesh(geometri, material);

mesh.position.set(-3,0,0);

//Lo agregamos a la escena
scene.add(mesh);

//Mesh 2
const mesh2 = new THREE.Mesh(geometri, material_standar);

mesh2.position.set(3,0,0);
scene.add(mesh2);

//Luz
/* const ambient_light = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient_light); */

//Luz desde un angulo
const hemisfere_light = new THREE.HemisphereLight(0xffffff,1);
scene.add(hemisfere_light);

const direccional_light = new THREE.DirectionalLight(0xffffff,3);
direccional_light.position.set(.8,2,4);
scene.add(direccional_light);

/* //Helpers (LAs ayudas coordenadas)
const helperAxes = new THREE.AxesHelper(10);
scene.add(helperAxes);

const helper_direccional_light = new THREE.DirectionalLightHelper(direccional_light);
scene.add(helper_direccional_light); */


//Definimos que la camara siempre apunte donde esta el cubo creado
camera.lookAt(mesh.position);

//Renderizamos los objetos
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
});
//Le damos un tamano al ender
renderer.setSize(canvas.clientWidth,canvas.clientHeight);
//Le pasamos los pixeles del dispositivo
renderer.setPixelRatio(window.devicePixelRatio);

//Le decimos que renderize bien la luz
renderer.physicallyCorrectLights = true;

//Agregamos el rendered (canvas) al canvas
// canvas.appendChild(renderer.domElement);

//Creamos una funcion que en el cual se ejecutara el loopAnimation
const update = () => {
    //Giramos en objeto en la posicion X
    mesh.rotateX(0.01);
    //Giramos en objeto en la posicion y
    mesh.rotateY(0.01);
    //Giramos en objeto en la posicion X
    mesh2.rotateX(0.01);
    //Giramos en objeto en la posicion y
    // mesh2.rotateY(0.01);
    //Renderizamos la escena
    renderer.render(scene,camera);
    //Agregamos la animacion y volvemos a llamar la funcion
    renderer.setAnimationLoop(() => update())
}
update();


