var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var food ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  monkey=createSprite(50,170,20,50);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
   ground = createSprite(0,400,1500,20)
  ground.x = ground.width /2;
 ground.velocityX =  -1; //-(6 + 3*score/100);
 FoodGroup=new Group();
 obstacleGroup=new Group();
  score=0
}
function draw() {
background(225); 
text("Score: "+ score, 500,50);
   
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/80);
   // ground.velocityX = -1//-(6 + 3*score/100);
  
  if(keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -9;
    }
    monkey.velocityY = monkey.velocityY + 0.5
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      //alert("test");
    }
     if(gameState===END){
      ground.velocityX=0
      obstacleGroup.velocityX=0
      FoodGroup.velocityX=0
      monkey.velocityX=0
    }
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
     monkey.collide(ground);
    
  }
  spawnobstacle();
  spawnfood();
  drawSprites();
}
function spawnobstacle(){
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600, 375,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    var rand = Math.round(random(1,6));{
obstacle.addImage(obstaceImage)
    }   
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
function spawnfood(){
   if(frameCount % 50 === 0) {
    var food = createSprite(600,365,10,40);
    var rand = Math.round(random(1,10));{
    food.addImage(bananaImage)  
    }
    food.velocityX=-(6 + 2*score/100);
    food.scale = 0.1;
    food.lifetime = 300;
    FoodGroup.add(food);
  } 
}

