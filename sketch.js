//global var ;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  //loading animations and images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(600,200);
  
  //create monkey sprite
  monkey=createSprite(50,150);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;

  //create ground sprite
  ground=createSprite(300,190,600,6);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  //giving score
  score=0;
  
  //create foodGroup and obstacleGroup
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  
  
}


function draw() {
background(220);
  
  
  if (gameState===PLAY){
 
    //giving scoring 
  score=Math.round(frameCount/frameRate());
  
  if (ground.x>0){
    ground.x=ground.width/2;
  }
  
   
  
  //when monkey touch foodgroup then destroy foodgroup
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
  
 //when monkey touch obstacleGroup then gameState=END
  if (monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  
    
//calling our function to spawn obstacles and bananas
  spawnObstacle();
  spawnBanana();
  }
  

  if (gameState===END){
    
    ground.velocityX=0;
    
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setLifetimeEach(-1);
    
    fill("red");
    text("PRESS SPACE TO RESTART",200,100);
    
if (keyDown("space")){
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
      gameState=PLAY;
   }
    
  }
  
  monkey.velocityY=monkey.velocityY+0.5;
   
  fill("red");
  text("SurvivalTime: " + score,250,40);
  monkey.collide(ground);
  
   //condition for monkey jump
   if (keyDown("space")&&monkey.y>=150){
    monkey.velocityY=-12;
  }
   
  
  drawSprites();
  
  
  
  
}

function spawnBanana(){
  
  if (frameCount % 80===0){
    
    var banana=createSprite(400,200);
    
    banana.addImage(bananaImage);
    
    banana.y=Math.round(random(80,150));
    
    banana.scale=0.1;
    
    banana.velocityX=-(4+score/2);
    
    
    FoodGroup.add(banana);
    
    
    
    
  }
  
  
  
}

function spawnObstacle(){
  
  if (frameCount % 300===0){
    
    var obstacle=createSprite(300,170);
    
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(4+score/2);
    obstacle.lifetime=150;
    obstacle.scale=0.1;    
    
    
    
    
    
    obstacleGroup.add(obstacle);
    
    
  }
  
  
  
  
  
  
  
  
  
}







