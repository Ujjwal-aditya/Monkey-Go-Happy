
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime;

var gameState="play";

function preload()
{
  
monkey_running=            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 obstacleImage=loadImage("obstacle.png");
 
}



function setup() 
{
  //creating the play area 
  createCanvas(600,400);
  
  //creating the monkey
  monkey = createSprite(40,337,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  monkey.debug=true;
  monkey.setCollider("rectangle",0,0,400,500);

  //creating the second ground 
  ground2 = createSprite(450,390,300,20);
  
  //creating the ground
  ground = createSprite(300,390,600,20);
  ground.velocityX=-8;
  
  //assigning groups
  FoodGroup= new Group();
  obstacleGroup = new Group();
  
  //survivalTime is 0 at the beginning
  survivalTime = 0;
}


function draw() 
{
  background("");
  if(gameState==="play")
  {
     
  if(keyDown("SPACE")&&(monkey.y>330))
  {
    monkey.velocityY=-20;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(ground.x<0)
  {
    ground.x=300;
  }
  spawnBananas();
  spawnObstacles();
  
  if(monkey.isTouching(obstacleGroup))
  {
    gameState="end";
  }
   survivalTime=survivalTime+Math.round(getFrameRate()/60);
}
  
  if(gameState==="end")
  {
   
    textSize(30);
    text("game over",300,150);
    ground.x=300;
    ground.velocityX=0;
    monkey.velocityY=0;
    monkey.velocityX=0;
    monkey.y=337;
  }


  monkey.collide(ground);
  
  textSize(20);
  fill(0);
  drawSprites();
  text("survival time=" + survivalTime,350,50);
}

function spawnBananas()
{
  var bananaY = Math.round(random(70,330));
  if(frameCount%80==0)
  {  
    banana = createSprite(600,bananaY,30,30);
    banana.addImage(bananaImage);
    banana.scale=0.08;
    banana.velocityX=-10;
    FoodGroup.add(banana);
    banana.lifetime=100;
  }
}
 
function spawnObstacles()
{
  if(frameCount%300==0)
  {
    obstacle=createSprite(600,370,40,40);
    obstacle.velocityX=-8;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
    obstacle.lifetime=100;
  }
}


