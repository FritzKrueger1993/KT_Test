let count = 2;
let player = [];
let running = false;
let img;
let control = [];
let hmap = [];
let volume = [];
let volumeDestination = [];
let panning = [];
let panningDestination = [];
let x;
let y;
let compSize = 5;
let diffW = 0;
let diffH = 0;
let scaleX = [];
let scaleY = [];




function preload() {
  soundFormats('ogg');
  img = loadImage('img.png');
  main = loadImage('img.png');
  for (let i = 0; i < count; i++) {
    hmap[i] = loadImage('Map'+i+'.png');
    player[i] = loadSound('Sound'+i+'.ogg');
    volume[i] = 0;
    panning[i] = 0;
  }
}




function setup() {
  background(0, 0, 0, 255);
  cursor('crosshair');
  frameRate(60);
  createCanvas(windowWidth-compSize, windowHeight-compSize);
  background(0, 0, 0, 255);
  diffW = img.width - width;
  diffH = img.height - height;
  if (diffW > diffH) {
    img.resize(width, 0);
  }
  if (diffH > diffW) {
    img.resize(0, height);
  }
  x = width/2 - img.width/2;
  y = height/2 - img.height/2;

  for (let i = 0; i < count; i++) {
    scaleX[i] = hmap[i].width / img.width;
    scaleY[i] = hmap[i].height / img.height;
  }
}





function draw() {

  if (running == true) {

    //------------------- MAINPROGRAM - START//

    for (let i = 0; i < count; i++) {

      // READ MAPS
      control[i] = hmap[i].get((mouseX -x) * scaleX[i], (mouseY - y) * scaleY[i]);

      // LOOP SOUNDS
      if (player[i].isPlaying()) {
      } else {
        player[i].loop();
      }

      // CONTROL VOLUME
      volumeDestination[i] = pow(red(control[i])/255, 2);
      volume[i] = lerp(volume[i], volumeDestination[i], 0.2);
      player[i].setVolume(volume[i]);

      // CONTROL PAN
      panningDestination[i] = map(green(control[i]), 0, 255, -1, 1);
      panning[i] = lerp(panning[i], panningDestination[i], 0.2);
      player[i].pan(panning[i]);
    }

    background(0, 0, 0, 255);
    image(main, x, y, img.width, img.height);
    fill(125);

    /*
    // DEBUG
    fill(255, 255, 255, 255);
    text(frameRate(), 400, 300);
    for (let i = 0; i < count; i++) {
      textSize(30);
      fill(255, 0, 255, 255);
      text(scaleX[i], 30 + 300 * i, 200);
    }
    */
  }
  //------------------- MAINPROGRAM - END //

  else {
    background(0, 0, 0, 255);
    textSize(30);
    fill(255);
    text('Click!', width/2 -50 + compSize, height/2 +20 + compSize)
  }
}

function mousePressed() {
  running = true;
}

function windowResized() {
  resizeCanvas(windowWidth-compSize, windowHeight-compSize);

  diffW = img.width - width;
  diffH = img.height - height;
  if (diffW > diffH) {
    img.resize(width, 0);
  }
  if (diffH > diffW) {
    img.resize(0, height);
  }
  x = width/2 - img.width/2;
  y = height/2 - img.height/2;
  w = img.width;
  h = img.height;
  for (let i = 0; i < count; i++) {
    scaleX[i] = hmap[i].width / img.width;
    scaleY[i] = hmap[i].height / img.height;
  }
}
