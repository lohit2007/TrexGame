var trex, obstacle, clouds, ground, invisibleGround, gameState, END, PLAY, score, gameOver, restart, gameOverIMG, restartIMG, obstacleGroup, CloudsGroup;

var trex_Running, movingGround, cloudImage, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6, trex_collided;


function preload() {
  
  trex_Running = loadAnimation ("trex1.png", "trex3.png", "trex4.png")
  
  movingGround = loadAnimation ("ground2.png");
  
  cloudImage = loadAnimation("cloud.png");
  
  obstacleImage1 = loadAnimation("obstacle1.png")
  obstacleImage2 = loadAnimation("obstacle2.png")
  obstacleImage3 = loadAnimation("obstacle3.png")
  obstacleImage4 = loadAnimation("obstacle4.png")
  obstacleImage5 = loadAnimation("obstacle5.png")
  obstacleImage6 = loadAnimation("obstacle6.png")
  
  gameOverIMG = loadImage("gameOver.png");
  
  restartIMG = loadImage("restart.png");
  
  trex_collidedIMG = loadAnimation("trex_collided.png")
  
  PLAY = 1;
  
  END = 0;
  
  gameState = PLAY;
}
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite (50,170);
  trex.addAnimation ("Running", trex_Running);
  trex.scale = 0.5;
  
  ground = createSprite (200,180);
  ground.addAnimation("moving", movingGround);
  
  invisibleGround = createSprite (200,190,400,10)
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100);
  restart = createSprite(300,150);
  gameOver.addImage(gameOverIMG);
  restart.addImage(restartIMG);
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup = createGroup();
  CloudsGroup = createGroup();
  
  ground.velocityX = -3;
  
  ground.x = ground.width /2;
  
  score = 0;
  
  
}

function draw() {
  background(180);
    
  
  if(gameState == PLAY) { 
    
    if(keyDown("space") && trex.y >= 159){
     trex.velocityY = -12 ;  
    }
    
  
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
  
    trex.velocityY = trex.velocityY + 0.8;

    
    spawnClouds();

    spawnObstacles();
  
    score = score + Math.round(getFrameRate()/60);
    
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if(gameState == END){
    
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trexcollided",trex_collidedIMG);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  text("Score: " + score, 300,50);
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,180,40,10);
    cloud.y = random(80,120);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.addAnimation("clouds", cloudImage);
    
    //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 80 === 0) {
    var obstacle; 
    obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = -4;
    
    var rand;
    
    rand = Math.round(random(1,6));
    
    switch(rand){
        
      case 1:
        obstacle.addAnimation("obstacle1", obstacleImage1);
      break;
      case 2:
        obstacle.addAnimation("obstacle1",obstacleImage2);
      break;
      case 3:
        obstacle.addAnimation("obstacle1",obstacleImage3);
      break;
      case 4:
        obstacle.addAnimation("obstacle1",obstacleImage4);
      break;
      case 5:
        obstacle.addAnimation("obstacle1",obstacleImage5);
      break;
      case 6:
        obstacle.addAnimation("obstacle1",obstacleImage6);
      break;
      
      default:
        break;
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("trex",trex_Running );
  
  count = 0;
  
}




