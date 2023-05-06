var coin;
var progress;
var chosen;

var score = 0;
var wrong = 0;
var positive = 0;

var correct_sound;
var wrong_sound;

var front_img;
var back_img;

function preload(){
  correct_sound = loadSound('sounds/correct.wav');
  correct_sound.setVolume(0.4);
  wrong_sound = loadSound('sounds/wrong.wav');
  wrong_sound.setVolume(0.4);

  front_img = loadImage('images/front.png');
  back_img = loadImage('images/back.png');
}

function setup() {
  let cnvSize = window.innerWidth > 1000 ? window.innerWidth*0.3 :
                (window.innerHeight*0.5 > window.innerWidth*0.9 ? window.innerWidth*0.8 :
                   (window.innerWidth > window.innerHeight ? window.innerHeight*0.9 : window.innerHeight*0.5));
  createCanvas(cnvSize, cnvSize, WEBGL);
  coin = new Coin();

  // Graphics
  progress = createGraphics(width, height*0.2);

  textFont('Slackey');

  pixelDensity(3);

}

function draw() {
  background(255);

  coin.animate();
  coin.draw();
}

function windowResized() {
  let cnvSize = window.innerWidth > 1000 ? window.innerWidth*0.3 :
                (window.innerHeight*0.5 > window.innerWidth*0.9 ? window.innerWidth*0.8 :
                   (window.innerWidth > window.innerHeight ? window.innerHeight*0.9 : window.innerHeight*0.5));
  resizeCanvas(cnvSize, cnvSize);
  coin.x = 0;
  coin.y = 0;
  coin.r = width/4;

  progress = createGraphics(width, height*0.2);
}

function Choose(side){
  if(!coin.flipping){
    if(side == "front"){
      if(chosen != "front"){
        document.querySelector('#front_img').style.transform = "scale(1.2)";
        document.querySelector('#back_img').style.transform = "scale(1)";
        chosen = "front";
        document.querySelector('#flip').style.display = "block";
      }
      else{
        document.querySelector('#front_img').style.transform = "scale(1)";
        chosen = undefined;
        document.querySelector('#flip').style.display = "none";
      }

    }
    else if( side == "back"){
      if(chosen != "back"){
        document.querySelector('#back_img').style.transform = "scale(1.2)";
        document.querySelector('#front_img').style.transform = "scale(1)";
        chosen = "back";
        document.querySelector('#flip').style.display = "block";
      }
      else{
        document.querySelector('#back_img').style.transform = "scale(1)";
        chosen = undefined;
        document.querySelector('#flip').style.display = "none";
      }
    }
  }
}

document.addEventListener('contextmenu', event => event.preventDefault());
