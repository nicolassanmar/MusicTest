var from, to, currentBeat, loopBeat, kickDraw, sampler, logo, perspectiva;

var pos, target, vel, r, drag, strength;

var startbutton = 0;

var KICKLENGTH;


var bass, clarinet, plucks, hold, drums, violin, voice;

var voiceVolume = bassVolume = 1;


var button;
var voiceSlider;
var loaded = false;
var cursormio;
function preload() {
  
  bass = new Tone.Player("Fl studio/bass.wav").toMaster();
  drums = new Tone.Player("Fl studio/drums.wav").toMaster();
  clarinet = new Tone.Player("Fl studio/clarinet.wav").toMaster();
  plucks = new Tone.Player("Fl studio/plucks.wav").toMaster();
  hold = new Tone.Player("Fl studio/hold.wav").toMaster();
  voice = new Tone.Player("Fl studio/voice.wav").toMaster();
  violin = new Tone.Player("Fl studio/violin.wav").toMaster();
  logof();
 //perspectiva = loadImage("perspective.svg")
 //cursormio = loadImage('cursor.png');
}
function logof() {
  logo = loadImage("Nicox-Logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cursor('cursor.png',8,8);
  KICKLENGTH = 800;

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


  slider = createSlider(-12, 0);
  slider.position(10, 10);
  slider.style('width', '80px');


  button = createButton('play');
  button.position(10, windowHeight/2);
  button.mousePressed(playf);
}


function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
  KICKLENGTH = windowHeight * 0.8;

}

function draw() {
  if (!loaded){
    loaded = bass.loaded && drums.loaded && clarinet.loaded && plucks.loaded && hold.loaded && voice.loaded && violin.loaded;}
  background("#355C7D");

  voice.volume.value = slider.value();
  //kick time
  if (currentBeat[1] % 2 == 0) {
    kickDraw = KICKLENGTH;
  }

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
      
      bezier(5,windowHeight-5,windowWidth,windowHeight,pos,pos/4,windowWidth,0);
      bezier(0,windowHeight,pos,pos/4,0,0,windowWidth,0);
    kickDraw--;
    pop();
    //image(perspectiva,0,0,windowWidth,windowHeight);
    image(logo, 0, windowHeight - 100, 100, 100);

  }
}



function playf() {
  if (loaded){  
    if (startbutton == 0) {
      Tone.Transport.start();
      loopBeat.start(0);
      startbutton++;
      button.html("stop");
    } else {
      Tone.Transport.stop();
      loopBeat.stop(0);
      startbutton--;

      //juntar las baterias y los bass
      bass.stop();
      drums.stop();
      voice.stop();
      clarinet.stop();
      hold.stop();
      violin.stop();
      plucks.stop();
      button.html("play");
    }
  }
}

function song(time) {
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
  /*  
  if (currentBeat[1] == "0") {
    bass.triggerAttackRelease("D1", "4n", time, 0.2);
  }
  if (currentBeat[1] == "1") {
    sampler.triggerAttack(nota);
    nota *= 1.1;
  } */
  console.log(currentBeat);
}
