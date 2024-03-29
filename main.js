var from, to, currentBeat, loopBeat, kickDraw, sampler, logo, headphones;

var pos, target, vel, r, drag, strength;

var startbutton = 0;

var KICKLENGTH;

var bass, clarinet, plucks, hold, drums, violin, voice;

var voiceVolume = (bassVolume = 1);

var voiceSliderM, voiceModifying;

var loaded = false;
var cursormio;

var playfont;

var startingfade;

var cnv;

var rando1, randoColor, rando3, cantidadAsteriscos, PALETTE;

function preload() {
  bass = new Tone.Player("Fl studio/bass.wav").toMaster();
  drums = new Tone.Player("Fl studio/drums.wav").toMaster();
  clarinet = new Tone.Player("Fl studio/clarinet.wav").toMaster();
  plucks = new Tone.Player("Fl studio/plucks.wav").toMaster();
  hold = new Tone.Player("Fl studio/hold.wav").toMaster();
  voice = new Tone.Player("Fl studio/voice.wav").toMaster();
  violin = new Tone.Player("Fl studio/violin.wav").toMaster();
  logo = loadImage("Nicox-Logo.png");
  headphones = loadImage("svgs/headphones.svg");

  //perspectiva = loadImage("perspective.svg")
  //cursormio = loadImage('cursor.png');
  playfont = loadFont("fonts/ZCOOLQingKeHuangYou-Regular.ttf");

  // //paper.js
  // paper.setup(cnv);
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvasContainer");
  cursor("cursor.png", 8, 8);
  KICKLENGTH = 40;

  loopBeat = new Tone.Loop(song, "4n");
  Tone.Transport.bpm.value = 95;
  from = color("#F67280");
  to = color("#F8B195");

  rectMode(CENTER);
  noStroke();
  currentBeat = [null, null, null];

  //spring
  r = 60;
  pos = 0;
  target = 0;
  vel = 0;

  drag = 0.75;
  strength = 0.1;

  voiceSliderM = 0;
  voiceModifying = false;

  // //paper.js
  // paper.project.importSVG("svgs/headphones.svg", function(item) {
  //   headphones = item;
  //   headphones.scale(0.5);
  //   headphones.position = new paper.Point(
  //     headphones.bounds.width / 2,
  //     headphones.bounds.height / 2
  //   );
  // });

  PALETTE = ["#78417a", "#af74aa", "#eb5461", "#ed7567", "#f08e51"]; // violeta oscuro, violeta claro, rojo, naranja palido, naranja
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  KICKLENGTH = windowHeight * 0.8;
}

function draw() {
  if (!loaded) {
    loaded =
      bass.loaded &&
      drums.loaded &&
      clarinet.loaded &&
      plucks.loaded &&
      hold.loaded &&
      voice.loaded &&
      violin.loaded;
  }
  if (startbutton == 1) {
    background("#355C7D");

    voice.volume.value = map(voiceSliderM, 0, windowHeight * 0.8, -12, 0, true);
    //kick time
    if (currentBeat[1] % 2 == 0) {
      kickDraw = KICKLENGTH;
    }
    
    //asteriscos
    push();
    translate(-windowWidth, 0);
    translate((windowWidth * rando3) / 15, (windowHeight * rando3) / 15);
    for (let cantidadFilas = 0; cantidadFilas < 6; cantidadFilas++) {
      
      push();
      for (let ndea = 0; ndea < cantidadAsteriscos + 2; ndea++) {
        drawRandom();
        translate(
          windowWidth / cantidadAsteriscos + 2,
          windowHeight / cantidadAsteriscos + 2
        );
      }
      pop();
      translate((windowWidth) / 3, 0);
    }
    pop();

    if (kickDraw > 0) {
      push();
      fill(from);
      if (kickDraw > KICKLENGTH - 20) {
        target = 80;
      } else {
        target = kickDraw;
      }
      //spring
      var force = target - pos;
      force *= strength;
      vel *= drag;
      vel += force;
      pos += vel;

      //rect(windowWidth / 2, windowHeight / 2, pos, pos);

      // bezier(
      //   5,
      //   windowHeight - 5,
      //   windowWidth,
      //   windowHeight,
      //   pos,
      //   pos / 4,
      //   windowWidth,
      //   0
      // );
      // bezier(0, windowHeight, pos, pos / 4, 0, 0, windowWidth, 0);
     kickDraw--;
      pop();

      //voice slider
      fill(75);
      rect((windowWidth * 1.61) / 2 + 5,  0 + 3, windowWidth / 20  , windowHeight / 7 + voiceSliderM);
      fill(to);
      rect((windowWidth * 1.61) / 2,  0, windowWidth / 20, windowHeight / 7 + voiceSliderM);
    }


    imageMode(CORNER);
    image(logo, 0, windowHeight - 70, 70, 70);
    if (startingfade > 0) {
      background(255, startingfade);
      startingfade -= 3;
    }
  } else {
    textStyle(NORMAL);

    background(0);
    textFont(playfont);
    if (windowWidth >= 720) {
      textSize(255);
    }
    fill(255);
    textAlign(CENTER);
    text("PLAY", windowWidth / 2, windowHeight / 2);
    textSize(30);
    text("headphones recommended", windowWidth / 2, (windowHeight * 1.61) / 2);
    startingfade = 255;
    //imageMode(CENTER);
    //image(headphones,windowWidth / 2, windowHeight*1.35 / 2);
    if (windowWidth <= windowHeight) {
      textStyle(BOLD);
      textSize(50);

      text(
        "Tilt your phone sideways",
        windowWidth / 2,
        (windowHeight * 1.8) / 2
      );
    }
  }
}

function drawRandom() {
  push();
  let sides, equis, yi, largoVoice;
  if (rando1 > 0.5) {
    sides = 6;
  } else {
    sides = 12;
  }
  fill(randoColor);
  noStroke;
  //translate(windowWidth/2,windowHeight/2);

  largoVoice = map(voiceSliderM, 0, 749, 1, 2);
  rotate(PI * rando3);



  //  push();
  //  for (let i = 0; i < sides; i++) {
  //    fill(75);
  //    rect(0, 0, (windowWidth * largoVoice) / 20 + 5, windowHeight / 50 + 5); //sombra
  //    rotate((PI * 2) / sides);

  //  }
  //  pop();
   stroke(75);
   strokeWeight(5);
  for (let i = 0; i < sides; i++) {
    
    rect(0, 0, (windowWidth * largoVoice) / 20+ pos, windowHeight / 50);
    rotate((PI * 2) / sides);

  }

  pop();
}

function mousePressed() {
  let c = get(mouseX, mouseY);
  if (c[0] == 0 && c[1] == 0 && c[2] == 0) {
    playf();
  }
  if (c[0] == to.levels[0] && c[1] == to.levels[1] && c[2] == to.levels[2]) {
    voiceModifying = true;
  }
  return false;
}
function mouseDragged() {
  if (voiceModifying) {
    voiceSliderM = max(min((mouseY - windowHeight / 20) * 2, windowHeight * 0.8), 2);
  }
  return false;
}
function mouseReleased() {
  voiceModifying = false;
  return false;
}

function playf() {
  if (loaded) {
    if (startbutton == 0) {
      Tone.Transport.start();
      loopBeat.start(0);
      startbutton++;
      rando1 = random(1);
      randoColor = random(PALETTE);
      rando3 = random(1);
      rando4 = random(1);
    } else {
      Tone.Transport.stop();
      loopBeat.stop(0);
      startbutton--;

      bass.stop();
      drums.stop();
      voice.stop();
      clarinet.stop();
      hold.stop();
      violin.stop();
      plucks.stop();
    }
  }
}

function song(time) {

  if (currentBeat[0] % 8 == 7 && currentBeat[1] == 3) {
    mouseReleased();
  }

  currentBeat = split(Tone.Transport.position, ":");
  if (currentBeat[0] % 8 == 0 && currentBeat[1] == 0) {
    bass.start();
    drums.start();
    voice.start();
    clarinet.start();
    plucks.start();
    hold.start();
    violin.start();
  }
  rando1 = random(1);
  randoColor = random(PALETTE);
  rando3 = random(1);
  cantidadAsteriscos = ceil(random(2,8));

  /*  
  if (currentBeat[1] == "0") {
    bass.triggerAttackRelease("D1", "4n", time, 0.2);
  }
  if (currentBeat[1] == "1") {
    sampler.triggerAttack(nota);
    nota *= 1.1;
  } */
  //console.log(currentBeat);
}
