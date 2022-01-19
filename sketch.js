var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleGround, invisibleGroundGroup;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  ghost = createSprite(300, 300);
  invisibleGroundGroup = createGroup();
  invisibleGround = createSprite(300, 599, 599, 1);
  invisibleGroundGroup.add(invisibleGround);
  tower.addImage("tower", towerImg);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.5;
  if (gameState == 'play') {
    tower.velocityY = 1;
  } else {
    tower.velocityY = 0;
  }
  // creating groups
  climbersGroup = createGroup();

  var climber = createSprite(300, 650);
  climber.addImage('climber', climberImg)
  climber.velocityY = -2;
  climber.depth = ghost.depth + 1;
  climbersGroup.add(climber);

}

function draw() {
  background(200);

  if (tower.y > 400) {
    tower.y = 300
  }

  if (keyDown('a')) {
    ghost.x = ghost.x - 5;
  }

  if (keyDown('d')) {
    ghost.x = ghost.x + 5;
  }

  if (keyDown(LEFT_ARROW)) {
    ghost.x = ghost.x - 5;
  }

  if (keyDown(RIGHT_ARROW)) {
    ghost.x = ghost.x + 5;
  }

  ghost.velocityY = ghost.velocityY + 0.3

  createDoors();

  createClimbers();

  ghost.collide(climbersGroup);

  if (ghost.isTouching(invisibleGroundGroup)) {
    gameState == 'end';
  }

  drawSprites();
}

function createDoors() {
  if (frameCount % 500 == 0) {
    var rand = Math.round(random(100, 500));
    var door = createSprite(rand, -50);
    door.addImage('door', doorImg)
    door.velocityY = 1;
    door.depth = ghost.depth - 1;
  }
}

function createClimbers() {
  if (frameCount % 100 == 0) {
    var rand = Math.round(random(100, 500));
    var climber = createSprite(rand, 650);
    climber.addImage('climber', climberImg)
    climber.velocityY = -2;
    climber.depth = ghost.depth - 1;
    climbersGroup.add(climber);
  }
}