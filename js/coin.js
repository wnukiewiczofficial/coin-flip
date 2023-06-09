function Coin(){
  this.x = 0;
  this.y = 0;
  this.r = width/4;
  this.rotX = 0;
  this.flipping = false;
  this.side = random(0,1) < 0.5 ? "front" : "back";
  this.flip = function(){
    this.flipping = true;
    this.side = random(0,1) < 0.5 ? "front" : "back";
  }

  this.animate = function(){
    if(this.flipping){
      if(this.side == "back"){
        this.rotX += 0.15;
        if(this.rotX >=PI*5){
          this.flipping = false;
          this.rotX = PI;

          if(this.side == chosen){
            score += 10;
            positive++;
            correct_sound.play();
          }
          else{
            score-=10;
            wrong++;
            wrong_sound.play();
          }
          if(score < 0) document.querySelector('#score').style.color = "red";
          else document.querySelector('#score').style.color = "black";
          document.querySelector('#score').innerHTML = score;
          document.querySelector('#positive').innerHTML = positive;
          document.querySelector('#wrong').innerHTML = wrong;

          chosen = undefined;
          document.querySelector('#flip').style.display = "none";
          document.querySelector('#front_img').style.transform = "scale(1)";
          document.querySelector('#back_img').style.transform = "scale(1)";
        }
      } else{
        if(this.flipping && this.side == "front"){
          this.rotX += 0.15;
          if(this.rotX >= PI*4){
            this.flipping = false;
            this.rotX = 0;

            if(this.side == chosen){
              score += 10;
              positive++;
              correct_sound.play();
            }
            else{
              score-=10;
              wrong++;
              wrong_sound.play();
            }


            if(score < 0) document.querySelector('#score').style.color = "red";
            else document.querySelector('#score').style.color = "black";
            document.querySelector('#score').innerHTML = score;
            document.querySelector('#positive').innerHTML = positive;
            document.querySelector('#wrong').innerHTML = wrong;

            chosen = undefined;
            document.querySelector('#flip').style.display = "none";
            document.querySelector('#front_img').style.transform = "scale(1)";
            document.querySelector('#back_img').style.transform = "scale(1)";
          }
        }
      }
    }
  }

  this.draw = function(){
    //Shape
    push();
    rotateX(this.rotX);
    rotateY(PI/2);
    normalMaterial();
    fill(220);
    scale(1.2);
    ellipsoid(this.r, this.r, this.r, 2, 10);
    fill(0);
    pop();

    //Front
    push();
    scale(1.2);
    rotateX(this.rotX);
    translate(this.x, this.y, 1);
    texture(front_img);
    plane(this.r, this.r);
    noFill();
    stroke(100, 100, 100);
    strokeWeight(2);
    smooth();
    ellipse(0,0,this.r*2,this.r*2);
    ellipse(0,0,this.r*2+2,this.r*2+2);
    pop();

    //Back
    push();
    rectMode(CENTER);
    rotateX(this.rotX);
    translate(this.x, this.y, -1);
    scale(1.2, -1);
    texture(back_img);
    plane(this.r*0.8, this.r);
    noFill();
    stroke(100, 100, 100);
    strokeWeight(2);
    smooth();
    ellipse(0,0,this.r*2,this.r*2.4);
    ellipse(0,0,this.r*2+2,this.r*2.4+2);
    // arc(0,0,this.r*2,this.r*2.4, 0, PI*2);
    // strokeCap(PROJECT);
    pop();

    //Info
    if(this.flipping){
      push();
      progress.textAlign(CENTER, CENTER);
      progress.textSize(progress.width*0.04);
      progress.fill(0);
      progress.textFont('Bebas Neue');
      progress.text('Flipping...', progress.width/2, progress.height/2);
      texture(progress);
      translate(0, (height-progress.height*1.5)/2, 20);
      plane(width, progress.height)
      pop();
    }
  }
}
