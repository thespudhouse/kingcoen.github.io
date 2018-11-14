
window.addEventListener('keydown',this.InputPressed,false);
var player;
var side = 00;
var higth = 0;
var aliens = [];
var alienSpeed = 2;
var numberOfAliens=40;
var bullet1, bullet2, bullet3;
var aliensDirection=true;
player = new component(30, 30, "green", 285, 550); 
for (i = 0; i < numberOfAliens; i++) {
    if (side % 8 === 0) {
        side = 00;
        higth += 40
    }
    aliens[i] = new component(30, 30, "red", side*40+10, higth);
    side++;
}
var c = document.getElementById("SpaceInvaders");
var ctx = c.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,600,600);
ctx.interval = setInterval(updateGameArea, 60);
//need to get pictures to replace and dimentions color
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.isalive = true;
    this.update = function(){
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function updateGameArea() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,600,600);
  ctx.fillRect(this.x, this.y, this.width, this.height);
  //player move
  if (player.x>=560)
    player.x=560
  if (player.x<=10)
    player.x=10
  //aliens move
  //make this it's own function.
  for(i = 0; i < numberOfAliens; i++) {
    if(aliensDirection)
      aliens[i].x += alienSpeed;
    else
      aliens[i].x -= alienSpeed;
  }
  
  for(i = 0; i < numberOfAliens; i++) {
    if (aliens[i].x>=560){
      if (aliens[i].isalive ==true){
        aliensDirection=false;
        for(j = 0; j < numberOfAliens; j++){
          aliens[j].y+=10;}
      }
    }
    if (aliens[i].x<=10){
      if (aliens[i].isalive ==true){
        aliensDirection=true;
        for(j = 0; j < numberOfAliens; j++){
          aliens[j].y+=10;
        }
      }
    }
  }
  //shooting
  if(bullet1!=null){
    bullet1.y -= 20;
    if(bullet1.y<=0){
      bullet1=null;
    }
    else bullet1.update();
  }
  if(bullet2!=null){
    bullet2.y -= 20;
    if(bullet2.y<=0){
      bullet2=null;
    }
    else bullet2.update();
  }
  if(bullet3!=null){
    bullet3.y -= 20;
    if(bullet3.y<=0){
      bullet3=null;
    }
    else bullet3.update();
  }
  for (a = 0; a < numberOfAliens; a++){   
      if(bullet1!=null&&aliens[a].isalive==true){
        if(bullet1.x >= (aliens[a].x ) && bullet1.x <= (aliens[a].x + 30) && bullet1.y >= (aliens[a].y ) && bullet1.y <= (aliens[a].y + 30)) {
          aliens[a].isalive=false;
          alienSpeed+=0.3;
          bullet1=null;
        }
      }
    if(bullet2!=null&&aliens[a].isalive==true){
        if(bullet2.x >= (aliens[a].x ) && bullet2.x <= (aliens[a].x + 30) && bullet2.y >= (aliens[a].y ) && bullet2.y <= (aliens[a].y + 30)) {
          aliens[a].isalive=false;
          alienSpeed+=0.3;
          bullet2=null;
        }
      }
    
      if(bullet3!=null&&aliens[a].isalive==true){
        if(bullet3.x >= (aliens[a].x ) && bullet3.x <= (aliens[a].x + 30) && bullet3.y >= (aliens[a].y ) && bullet3.y <= (aliens[a].y + 30)) {
          aliens[a].isalive=false;
          alienSpeed+=0.3;
          bullet3=null;
        }
      }
  }
  player.update();
  for(i = 0; i < numberOfAliens; i++) {
    if(aliens[i].isalive==true)
      aliens[i].update();
  }
}
function InputPressed(e) {
var code = e.keyCode;
switch (code) {
  case 68: player.x+=4; break; //Right key
  case 65: player.x-=4; break; //Left key
  case 39: player.x+=4; break; //Right key
  case 37: player.x-=4; break; //Left key
  case 32: 
  if(bullet1==null)
    bullet1 = new component( 5, 30, "Blue", player.x+12, player.y); //shoot key
  else if(bullet2==null)
    bullet2 = new component( 5, 30, "Blue", player.x+12, player.y);
 else if(bullet3==null)
    bullet3 = new component( 5, 30, "Blue", player.x+12, player.y);
  break;
  default: alert(code); //Everything else
    }
}