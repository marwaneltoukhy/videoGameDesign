/* There are 3 enemies that only move on the x axis
    One character in the bottom center of the canvas
    Character turns right and left using the arrow keys
    Spacebar shoots balls from the character
    Balls for the first 3 hits are fast, so the enemies can't dodge them good
    Balls get slower after 3 hits, the game gets harder
    If the players cross the right border you lose
*/
angleMode = "radians";
// Character Obj
var characterObj = function(x,y){
    this.x = x;
    this.y = y;
    this.angle = 0;
};
// Drawing the character
characterObj.prototype.draw = function() {
    pushMatrix();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(255,215,0);
    ellipse(0, 0, 20, 20);
    triangle(-10, 0, 0, -20, 10, 0);
    fill(255, 0, 0);
    ellipse(0, 0, 10, 10);
    popMatrix();
};

var character = new characterObj(200, 370);
var score = 0;

// Ball //
// Initializing the ball
var ballObj = function(x,y){
    this.position = new PVector (x,y);
    this.dir = new PVector(0,0);
    this.shot = 0;
};

//Drawing the balls and deciding the directions
ballObj.prototype.draw = function() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.position.x, this.position.y, 10,10);
    if(this.shot === 0){
        if(score < 3){
        this.dir.x = 2*sin(character.angle);
        this.dir.y = 2*-cos(character.angle);
        }
        else{
            this.dir.x = sin(character.angle);
            this.dir.y = -cos(character.angle);
        }
        this.shot = 1;
    }
};

// Moving the balls in the right direction
ballObj.prototype.move = function(){
    this.position.y += this.dir.y;
    this.position.x += this.dir.x;
};
var ball = [];

// detecting the keys for the turning of the character
var keyPressed = function(){
    if(keyCode === RIGHT){
        if(character.angle < 0.785398){
            character.angle+= 0.06;
        }
    }
    if(keyCode === LEFT){
        if(character.angle > -0.785398){
            character.angle-= 0.06;
        }
    }
    if(keyCode === 32 ){
        ball.push(new ballObj(200, 370));
    }
};

//initializing the enemy
var enemyObj = function(x,y){
    this.position = new PVector(x,y);
    this.dir = new PVector(0.1,0);
    this.dirFor = new PVector(1,0);
    this.dirBack = new PVector(-1,0);
    this.hit = 0;
};

var enemyImg = getImage("avatars/aqualine-sapling");
var enemy = [];
var gameOver = 0;
var start = 0;

// drawing the enemy
enemyObj.prototype.draw = function() {
    image(enemyImg, this.position.x, this.position.y, 25, 25);
};

enemy.push(new enemyObj(20,20));
enemy.push(new enemyObj(20,50));
enemy.push(new enemyObj(20,80));

//moving the enemy
enemyObj.prototype.move = function(){
    this.position.add(this.dir);
    if(this.position.x > 410){
        gameOver = 1;
    }
    for(var i = 0; i<ball.length;i++){
        var distBallEnemy = dist(this.position.x, this.position.y, ball[i].position.x, ball[i].position.y);
        var angleBallEnemy = asin((this.position.x - ball[i].position.x) / distBallEnemy);
        if(distBallEnemy < 50){
            if(this.position.x - ball[i].position.x <= 0){
                this.position.add(this.dirBack);
            }
            else{
                this.position.add(this.dirFor);
            }
        }
        if(distBallEnemy < 25){
            score++;
            ball[i].dir.y = -ball[i].dir.y;
            this.hit++;
        }
        if((ball[i].position.x > 410) || (ball[i].position.x < -10) || (ball[i].position.y > 410) || (ball[i].position.y < -10)){
            ball.splice(i, 1); 
        }
    }
    if(score === 9){
        start = 2;
    }  
};

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
    textSize(20);
    text("Click right and left arrow to", 200, 300);
    text("change player angle", 200, 320);
    text("Click Space to shoot balls", 200, 340);
    textSize(40);
    text("Dodge Ball", 200, 100);
    textAlign(CENTER, CENTER);
    text("Start Game", 200, 200);
};
// creating a new object from the start game function
var startGame = new startGameObj(100, 200);
// Checking where the user is clicking their mouse
// Doesn't work if user clicks outside of the phrase "Start Game"
var mouseClicked = function(){
    if(mouseX > 90 && mouseX < 320 && mouseY > 190 && mouseY < 240){
        start = 1;
    }
};

//drawing the whole game
var draw = function() {
    background(5, 250, 164);
    if(start === 1 && gameOver === 0){
    character.draw();
    for( var i = 0; i < ball.length; i++){
        ball[i].draw();
        ball[i].move();
    }
    for (var i=0; i<enemy.length; i++) {
            if(enemy[i].hit < 3){
                enemy[i].draw();
                enemy[i].move();
            }
        }
    fill(255, 0, 0);
    text(score, 340, 45);
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
        //retry.draw();
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
