var from, to, currentBeat, loopBeat, bass, kickDraw, sampler;

var pos, target, vel, ctx, r, drag, strength;



var startbutton = 0;


const KICKLENGTH = 100;


function setup() {
  createCanvas(windowWidth, windowHeight);

  sampler = new Tone.Player("cmaj9.mp3").toMaster();
  bass = new Tone.MembraneSynth().toMaster();
  loopBeat = new Tone.Loop(song, '4n');

  from = color('#F67280');
  to = color('#F8B195');

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
}

function draw() {
  background('#355C7D');
  if (currentBeat[1] == 0) {
    kickDraw = KICKLENGTH;
  }

  if (kickDraw > 0) {
    push();
    fill(from);
    if (kickDraw > KICKLENGTH - 10) {
      target = kickDraw;
    }
    else {
      target = 0;
    }
    //spring
    var force = target - pos;
    force *= strength;
    vel *= drag;
    vel += force;
    pos += vel;

    if (pos > 10) {
      rect(windowWidth / 2, windowHeight / 2, pos, pos);
    }
    


    kickDraw--;
    pop();
  }
}


function mousePressed() {
  if (startbutton == 0) {
    Tone.Transport.start();
    loopBeat.start(0);
    startbutton++;
  }
  else {
    Tone.Transport.stop();
    loopBeat.stop(0);
    startbutton--;
  }
}


function song(time) {
  currentBeat = split(Tone.Transport.position, ':');
  if (currentBeat[1] == "0") {
    bass.triggerAttackRelease('D1', '4n', time, 0.2);
  }
  if (currentBeat[1] == "1") {
    sampler.start();
  }
  console.log(currentBeat);
}
