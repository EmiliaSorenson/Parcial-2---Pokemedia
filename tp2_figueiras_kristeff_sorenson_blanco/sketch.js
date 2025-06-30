let modelos = [];
let nombres = ["Litten", "Squirtle", "Turtwig", "Snorlax"];
let totalPersonajes = 4;

let indiceActual = 0;
let angulo = 0;
let anguloObjetivo = 0;
let rotando = false;
let rotacionVelocidad = 0.05;

function preload() {
  modelos[0] = loadModel('models/litten3d.obj', true);
  modelos[1] = loadModel('models/squirtle3d.obj', true);
  modelos[2] = loadModel('models/turtwig3d.obj', true);
  modelos[3] = loadModel('models/snorlax3d.obj', true);
}

function setup() {
  let canvas = createCanvas(1000, 550, WEBGL);
  canvas.parent("canvas-container");
}

function draw() {
  background(200);
  ambientLight(150);
  directionalLight(255, 255, 255, 0, 1, -1);

  // Rotación suave del carrusel
  if (rotando) {
    angulo = lerp(angulo, anguloObjetivo, rotacionVelocidad);
    if (abs(angulo - anguloObjetivo) < 0.01) {
      angulo = anguloObjetivo;
      rotando = false;
    }
  }

  rotateY(angulo); // Rota toda la escena

  // Distribuir los personajes en círculo
  let radio = 300;
  for (let i = 0; i < totalPersonajes; i++) {
    let a = TWO_PI / totalPersonajes * i;
    let x = cos(a) * radio;
    let z = sin(a) * radio;

    push();
    translate(x, 50, z);
    rotateX(91.1); 
    rotateY(frameCount * 0.01);
    scale(1);
    ambientMaterial(255);

    model(modelos[i]);
    pop();
  }
}

function mousePressed() {
  if (!rotando) {
    indiceActual = (indiceActual + 1) % totalPersonajes;
    anguloObjetivo -= TWO_PI / totalPersonajes; // Gira el carrusel en sentido horario
    rotando = true;
  }
}