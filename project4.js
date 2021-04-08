/*  5 starts, 7 enemies and 1 player.
    try to collect all stars in order to win the game!
    to move the player use right, left arrows
    to jump use up arrow
    to drop balls to kill enemies use down arrow
    to kill the enemy the ball has to land on top of it, if it is lands beside it the enemy     will eat the ball
    you have the score on the top right, and the number of enemies on the top left
    enemies quadriple the speed when they are close to you! and they move randomly
*/
angleMode = "radians";
// map for the game
var tilemap = [
"wwwwwwwwwwwwwwwwwwwww",
"wj    e     c      jw",
"w  gggggggggg  j    w",
"w                   w",
"wj     ce  j       jw",
"wj     gggggggggg   w",
"w                  jw",
"wj e       ec       w",
"wj gggggggggg       w",
"w                  jw",
"wj       j     e  c w",
"w       gggggggggg  w",
"wj                 jw",
"w      ce           w",
"w    gggggggggg     w",
"wj e     f         jw",
"wwwwwwwwwwwwwwwwwwwww"
    ];
    
var images = [];
//initializing the enemy object
var enemyObj = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.Dir = 1;
    this.velocity = new PVector(1, 0);
    this.angle = 2 * PI;
    this.position = new PVector(x, y);
    //this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
};
//initializing the walls of the game
var wallObj = function(x,y){
    this.x = x;
    this.y = y;
};
//initializing the ball object
var ballObj = function(x, y) {
    this.position = new PVector(x,y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0.1);
    this.size = 10;
    this.bounceCoeff = -(100 - this.size) / 100;
    this.av = 1;
};

//initilizing the joint object
var jointObj = function(x,y){
    this.x = x;
    this.y = y;
};
//initializing the stars object
var starObj = function(x,y){
    this.x = x;
    this.y = y;
};
//initializing the grass object
var grassObj = function(x,y){
    this.x = x;
    this.y = y;
    this.oppForce = new PVector (0, -0.1);
};

//choosing the images for the game
var enemyImg = getImage("cute/EnemyBug");
var wallImg = getImage("cute/WallBlock");
var starImg = getImage("cute/Star");
var grassImg = getImage("cute/GrassBlock");
//building arrays for the objects
var enemy = [];
var walls = [];
var stars = [];
var grass = [];
var ball = [];
var joint = [];
var score = 0;
// initializing the character object
var characterObj = function(x, y) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.force = new PVector(0, 0);
    this.currFrame = frameCount;
    this.jump = 0;
    this.walkForward = 0;
    this.walkBackward = 0;
};
// initializing the vectors
var gravity = new PVector(0, 0.1);
var walkForce = new PVector(0.1, 0);
var backForce = new PVector(-0.1, 0);
var jumpForce = new PVector(0, -3.5);
var character = new characterObj(200, 350);
var oppForce = new PVector(0,-0.1);
var ballCount = 0;
var gameOver = 0;
// applying forces on character
characterObj.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};
//drawing the enemy
enemyObj.prototype.draw = function() {
    image(enemyImg, this.x, this.y, 25, 25);
};
//drawing the wall
wallObj.prototype.draw = function() {
    image(wallImg, this.x, this.y, 25, 25);
};
//drawing the star
starObj.prototype.draw = function() {
    image(starImg, this.x, this.y, 25, 25);
};
//drawing the grass
grassObj.prototype.draw = function() {
    image(grassImg, this.x, this.y, 25, 25);
};
//initializing the map and puting all the objects in the right places
var initTilemap = function() {
    for (var i = 0; i< tilemap.length; i++) {
        for (var j =0; j < tilemap[i].length; j++) {
            switch (tilemap[i][j]) {
                case 'w': walls.push(new wallObj(j*18, i*23));
                    break;
                case 'e' : enemy.push(new enemyObj(j*18, i*23));
                    break;
                case 'g' : grass.push(new grassObj(j*18, i*23));
                    break;
                case 'c' : stars.push(new starObj(j*18, i*23));
                    break;
                case 'j' : joint.push(new jointObj(j*20, i*30));
                    break;
            }
        }
    }
};

initTilemap();

//// Start Game //////
var startGameObj = function(x,y){
    this.x = x;
    this.y = y;
};
// Drawing of the start game phrase
startGameObj.prototype.draw = function() {
    fill(255, 0, 0);
    var f = createFont("ALGERIAN");
    textFont(f);
    textSize(40);
    text("Hop and drop", 200, 100);
    textAlign(CENTER, CENTER);
    text("Start Game", 200, 200);
};
// creating a new object from the start game function
var startGame = new startGameObj(100, 200);
var start = 0;
// Checking where the user is clicking their mouse
// Doesn't work if user clicks outside of the phrase "Start Game"
var mouseClicked = function(){
    if(mouseX > 90 && mouseX < 320 && mouseY > 190 && mouseY < 240){
        start = 1;
    }
};
// Updating character with all the forces on it
characterObj.prototype.update = function() {
    this.acceleration.set(0, 0);
    this.applyForce(gravity);
    if (this.walkForward === 1) {
        this.applyForce(walkForce);
    }
    if (this.walkBackward === 1) {
        this.applyForce(backForce);
    }
    if (this.jump === 2) {
        this.applyForce(jumpForce);
        this.jump = 1;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);

    if (this.position.x > 340) {
        this.position.x = 50;
    }
    else if (this.position.x < 30) {
        this.position.x = 340;
    }
    if (this.position.y >= 349.99) {
        this.position.y = 350;
        this.velocity.y = 0;
        this.jump = 0;
    }
    for (var i=0; i<grass.length; i++){
        if((grass[i].y + 0.01) - this.position.y > 0 && grass[i].x < this.position.x && grass[i].x + 20 > this.position.x){
            if((this.position.y >= grass[i].y - 20 - 0.01)){
                this.position.y = grass[i].y - 20;
                this.velocity.y = 0;
                this.jump = 0;
            }
        }
    }
    
};
// drawing the character
var characterImg = getImage("avatars/old-spice-man-blue");
characterObj.prototype.draw = function() {
    image(characterImg, this.position.x, this.position.y, 25, 25);
};
// the forces that apply on the character when pressing keys
var keyPressed = function() {
    if (keyCode === RIGHT) {
            character.walkForward = 1;
    }
    if (keyCode === LEFT) {
            character.walkBackward = 1;
    }
    if ((keyCode === UP) && (character.jump === 0)) {
            character.jump = 2;
    }
    if(keyCode === DOWN && ballCount < 10){
        ball.push(new ballObj(character.position.x, character.position.y));
        ballCount++;
    }
};
// removing the forces when keys are unpressed
var keyReleased = function() {
    if (keyCode === RIGHT) {
            character.walkForward = 0;
    }
    else if (keyCode === LEFT) {
            character.walkBackward = 0;
    }
};
// checking collisions between character and enemy and stars
characterObj.prototype.checkCollision = function () {
    
    for (var i=0; i<enemy.length; i++) {
        if (dist(this.position.x, this.position.y, enemy[i].x, enemy[i].y) < 20) {
                gameOver = 1;
        }
    }
    for (i=0; i<stars.length; i++) {
        if (dist(this.position.x, this.position.y, stars[i].x, stars[i].y) < 20) {
                stars[i] = 0;
                score++;
        }
    }
    if (score === 5){
        start = 2;
    }
    
};
//checking collision between the balls and the enemies
var enemyCount = 7;
ballObj.prototype.checkCollision = function (){
    for(var i = 0; i < enemy.length; i++){
        if(dist(this.position.x, this.position.y, enemy[i].x, enemy[i].y) < 20){
            if((enemy[i].y - 10) > this.position.y){
                enemy[i] = 0;
                enemyCount--;
            }
            else{
                this.av = 0;
            }
        }
    }
};
// updating the position of the balls
ballObj.prototype.updatePosition = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (this.position.y > (380 - this.size/2)) {
        this.position.y = 380 - this.size/2;
        this.velocity.y *= this.bounceCoeff;
    }
};
//changing the direction of enemies at joints
enemyObj.prototype.atJoint = function() {
    var j = 0;
    for (var i = 0; i < joint.length; i++) {
        if (dist(this.x, this.y, joint[i].x, joint[i].y) < 10) {
            j = 1;   
        }    
    }    
    
    return j;
};    
// drawing the balls
ballObj.prototype.draw = function() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
};

var x = 0;
// check if the enemies collided with the walls and changing the directions
enemyObj.prototype.collide = function() {
    var c = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x, walls[i].y) < 20) {
            c = 1;   
            x = 1;
            var vec = PVector.sub(walls[i].x, walls[i].y);
            var angle = this.angle -1.5708 - vec.heading();
            var y = vec.mag();
            if ((y > -1) && (y < 100)) {
            var x = vec.mag() * sin(angle);
            if ((x > 0) && (x < 50)) {
                this.angle+= (PI * 2);
            }
            else if ((x <= 0) && (x > -50)) {
                this.angle-= (PI * 2);
            }
            this.velocity.x = sin(this.angle);
            this.Dir = -cos(this.angle);
            }
        }
    }
    return c;
}; 
//moving the enemies
enemyObj.prototype.move = function(){
    if ((this.atJoint() === 1) && (random(0, 10) < 5)) {
        this.Dir = floor(random(1, 4));   
    }    
    
    if(dist(this.x, this.y, character.position.x, character.position.y) < 100) {
        this.speed  = 4;
    }
    else{
        this.speed = 1;
    }
    switch (this.Dir) {
        case 1: //right
            this.x += this.speed;
            if (this.collide() === 1) {
                this.x -= this.speed;
                this.Dir = floor(random(1, 5));
                this.position.add(this.velocity);
            }
            break;
        case 2: //left
            this.x -= this.speed;
            if (this.collide() === 1) {
                this.x += this.speed;
                this.Dir = floor(random(1, 5));
            }
            break;  
        case 3: //down
            this.y += this.speed;
            if (this.collide() === 1) {
                this.y -= this.speed;
                this.Dir = floor(random(1, 5));
            }
            break;
        case 4: //up
            this.y -= this.speed;
            if (this.collide() === 1) {
                this.y += this.speed;
                this.Dir = floor(random(1, 5));
            }
            break;    
    }    
  
};
// drawing the whole game and updating it
var draw = function() {
    background(5, 250, 164);
    if(start === 1 && gameOver === 0){
        background(0, 255, 208);
        for (var i=0; i<walls.length; i++) {
            walls[i].draw();
        }
        character.update();
        character.draw();
        character.checkCollision();
        for (var i=0; i<stars.length; i++) {
            if(stars[i] !== 0){
                stars[i].draw();
            }
        }
        for (var i=0; i<grass.length; i++) {
            grass[i].draw();
        }
        for (var i=0; i<enemy.length; i++) {
            if(enemy[i] !== 0){
                enemy[i].draw();
                enemy[i].move();
            }
        }
        for (var i=0; i<ball.length; i++) {
            if(ball[i].av !== 0){
                ball[i].updatePosition();
                ball[i].draw();
                ball[i].checkCollision();
            }
        }
    
        fill(255, 0, 0);
        text(score, 340, 45);
        text(enemyCount, 45, 45);
    }
        else if(start === 0){
        background(5, 250, 164);
        startGame.draw();
    }
     else if (gameOver === 1){
        fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("GAME OVER!", 200, 200);
    }
    else if(start === 2){
            background(0, 0, 255);
            
            for(var i = 0; i < 10; i++){
                fill(random(0, 255), random(0, 255), random(0, 255));
                ellipse(random(0,400), random(0, 400), 10, 10);
            }
            text("YOU WIN!", 200, 200);
        }
};

