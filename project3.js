/* 
            The dragon Hunt Chapter 2
Basically it is similar to a maze, with enemies in it. 
Enemies aren't only just moving left and right like last chapter, they developed some character this time.
They're shy, they will run from you if you are behind them, after all you're a dragon!
TAKE CARE! If you are infront of them, their speed will quadriple and they will eat you alive!
Don't like the new enemies? wish they lose their characteristics? Go to either the south west corner or the south east corner, you'll find a chest, open it and all the enemies will los their characteristics. No more quadripiling their speed!
To win you have to gather all the diamonds in the map (There are 30 of them!)
To escape from your enemies, hide behind one of the walls, they will sense you, but can't get you!
*/

//All angles in radians
angleMode = "radians";

//how the map should look like
var tilemap = [
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
"w c        b   f                                 w",
"wwwwwj jwwwwwwj  jwwwwwwwwwwwwwwwwj   jwwwwwwwwwww",
"w fb           f                                 w",
"wwwwwwwwwwwwwwj  jwwwwwwwwwwwwwwwwwwwwwwwwj    jww",
"w f    b    f                                    w",
"wj jwwwwwwwwwwwwwj   jwwwwwwwwwwwwwwwwwwwwwwwj  jw",
"w f                        f                   f w",
"wwwwwwwj jwwwwwwwwwwwwwwwwwj  f  jwwwwwwwwwwwwwwww",
"w f     j    b f                                jw",
"wwwwwwwwwwwwj  jwwwwwwwwwwwwwwwwj  jwwwwwwwwwwwwww",
"w  f    b       f                               jw",
"wwwwwj jwwwwj    jwwwwwwwwwwwwwwj     jwwwwwwwwwww",
"w fb           f                                 w",
"wwwwwwwwwwwwwwj    jwwwwwwwwwwwwwwwwwwwwj      jww",
"w f    b    f                                    w",
"wj jwwwwwwwwwwwwwj   jwwwwwwwwwwwwwwwwwwwwwwwj  jw",
"w f                        f                   f w",
"wwwwwwwj jwwwwwwwwwwwwwwwwwj  f  jwwwwwwwwwwwwwwww",
"w f     j    b f                                jw",
"wwwwwwwwwwwwj  jwwwwwwwwwwwwwwwwj  jwwwwwwwwwwwwww",
"w  f    b       f                               jw",
"wwwwwwwj jwwwwwwwwwwwwwwwwwj  f  jwwwwwwwwwwwwwwww",
"w f     j    b f                                jw",
"wwwwwwwwwwwwj  jwwwwwwwwwwwwwwwwj  jwwwwwwwwwwwwww",
"w rf    b       f                        f     rjw",
"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];

var images = [];

//initilizing the diamond Object
var diamondObj = function(x, y){
    this.x = x;
    this.y = y;
    this.w = 30;
    this.wDir = -1;
    this.score = 0;
    background(255, 255, 255,0);
    fill(255,215,0);
    noStroke();
    quad(this.x + 15, this.y + 30, this.x, this.y + 15, this.x + 15, this.y, this.x + 30, this.y + 15);
    images.push(get(0,0,30, 30));
};

//initilizing the wall object
var wallObj = function(x, y) {
    this.x = x;
    this.y = y;
    fill(107, 103, 103);
    rect(this.x, this.y, 10, 10);
    fill(92, 90, 90);
    rect(this.x + 10, this.y, 10, 10);
    fill(77, 73, 73);
    rect(this.x + 20, this.y, 10, 10);
    fill(82, 76, 76);
    rect(this.x, this.y, 10, 10);
    fill(97, 85, 85);
    rect(this.x, this.y + 10, 10, 10);
    fill(79, 76, 76);
    rect(this.x, this.y + 20, 10, 10);
    fill(84, 72, 72);
    rect(this.x + 10, this.y + 10, 10, 10);
    fill(77, 72, 72);
    rect(this.x + 10, this.y + 20, 10, 10);
    fill(61, 57, 57);
    rect(this.x + 20, this.y + 10, 10, 10);
    fill(56, 55, 55);
    rect(this.x + 20, this.y + 20, 10, 10);
    images.push(get(0,0,30, 30));
};

//initilizing the player object
var characterObj = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1;
};

//initilizing the enemy object
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

//initilizing the joint object
var jointObj = function(x,y){
    this.x = x;
    this.y = y;
};

//initilizing the power Up object
var powerUpObj = function(x,y){
    this.x = x;
    this.y = y;
};

// getting images and bulding the arrays
var wallImg = new wallObj(0,0);
var diamondImg = new diamondObj(0,0);
var characterImg = getImage("avatars/piceratops-ultimate");
var enemyImg = getImage("avatars/duskpin-tree");
var powerUpImg = getImage("cute/ChestClosed");
var walls = [];
var joint = [];
var diamond= [];
var character = [];
var enemy = [];
var powerUp = [];
var done = 0;
var score = 0;
var gameXCor = 100;
var gameYCor = 100;

//Drawing the Diamonds
diamondObj.prototype.draw = function() {
    image(images[1], this.x,this.y, 0,0);
};

//drawing the walls
wallObj.prototype.draw = function() {
    image(images[0], this.x,this.y, 0,0);
};

// drawing the player
characterObj.prototype.draw = function() {
    image(characterImg, this.x, this.y, 25, 25);
};
var x = 0;

// Function to see if the enemy collides with the wall, if yes, it turns around
enemyObj.prototype.collide = function() {
    var c = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x, walls[i].y) < 25) {
            c = 1;   
            x = 1;
            var vec = PVector.sub(walls[i].x, walls[i].y);
            var angle = this.angle -1.5708 - vec.heading();
            var y = vec.mag();
           // if ((y > -1) && (y < 100)) {
            var x = vec.mag() * sin(angle);
            if ((x > 0) && (x < 50)) {
                this.angle+= (PI * 2);
            }
            else if ((x <= 0) && (x > -50)) {
                this.angle-= (PI * 2);
            }
            this.velocity.x = sin(this.angle);
           // this.Dir.y = -cos(this.angle);
           // }
        }   
        else{
            //x = 0;
        }
    }
    return c;
}; 

// Drawing the Enemy
enemyObj.prototype.draw = function() {
    //image(enemyImg, this.x, this.y, 20, 30);
    if(x === 0){
        pushMatrix();
        translate(this.x, this.y);
        scale(-1,1);
        image(enemyImg, 0,0, 20, 30);
        popMatrix();
    }
    else{
        pushMatrix();
        translate(this.x, this.y);
        //scale(-1,1);
        image(enemyImg, 0,0, 20, 30);
        popMatrix();
    }
};

// Drawing the power up
powerUpObj.prototype.draw = function() {
    image(powerUpImg, this.x, this.y, 20, 30);
};

// Initilizing the map
var initTilemap = function() {
    for (var i = 0; i< tilemap.length; i++) {
        for (var j =0; j < tilemap[i].length; j++) {
            switch (tilemap[i][j]) {
                case 'w': walls.push(new wallObj(j*20, i*30));
                    break;
                case 'f': diamond.push(new diamondObj(j*20, i*30));
                    break;
                case 'c' : character.push(new characterObj(j*20, i*30));
                    break;
                case 'b' : enemy.push(new enemyObj(j*20, i*30));
                    break;
                case 'j' : joint.push(new jointObj(j*20, i*30));
                    break;
                case 'r' : powerUp.push(new powerUpObj(j*20, i*30));
                    break;
            }
        }
    }
};

initTilemap();

// Sensing if the player collided with the walls
characterObj.prototype.collide = function() {
    var hit = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x, walls[i].y) < 25) {
            hit = 1;   
        }
    }    
    
    return hit;
}; 

// Sensing if the player collected the diamonds
characterObj.prototype.collect = function () {
    var hit = 0;
    for (var i=0; i<diamond.length; i++) {
        if (dist(this.x, this.y, diamond[i].x, diamond[i].y) < 14) {
                    score++;
                    hit = 1;
        }
    }
    return hit;
};

// changing the enemy directions at joints
enemyObj.prototype.atJoint = function() {
    var j = 0;
    for (var i = 0; i < joint.length; i++) {
        if ((this.x === joint[i].x) && (this.y === joint[i].y)) {
            j = 1;   
        }    
    }    
    
    return j;
};    



//// Start Game //////
var startGameObj = function(x,y){
    this.x = x;
    this.y = y;
};
// Drawing of the start game phrase
startGameObj.prototype.draw = function() {
    fill(255, 0, 0);
    var f = createFont("Lucida Calligraphy");
    textFont(f);
    textSize(40);
    text("The Dragon Hunt", 200, 100);
    text("Chapter ||", 200, 300);
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

///Key presses////
var keyPressed = function() {
    if (keyCode === LEFT) {
        if(character[0].collide() === 0){
            character[0].x-= 3;
            gameXCor += 3;
        }
        else{
            character[0].x += 5;
            gameXCor += 0;
        }
    }
    if (keyCode === RIGHT) {
        if(character[0].collide() === 0){
            character[0].x+= 3;
            gameXCor -= 3;
        }
        else{
            character[0].x -= 5;
            gameXCor += 0;
        }
    }
    if (keyCode === UP) {
        if(character[0].collide() === 0){
        character[0].y-= 3;
            gameYCor += 3;
        }
        else{
            character[0].y += 5;
            gameYCor += 0;
        }
    }
    if (keyCode === DOWN) {
        if(character[0].collide() === 0){
        character[0].y+= 3;
            gameYCor -= 3;
        }
        else{
            character[0].y -= 5;
            gameYCor += 0;
        }
        
    }

};

var currFrame = 0;
var gameOver = 0;
var collectDiamond = 0;
var collectPowerUp = 0;

// Checking collisions of player with enemies 
characterObj.prototype.checkCollision = function () {
    
    for (var i=0; i<enemy.length; i++) {
        if (dist(this.x, this.y, enemy[i].x, enemy[i].y) < 20) {
                gameOver = 1;
        }
    }
    for (i=0; i<diamond.length; i++) {
        if (dist(character[0].x, character[0].y, diamond[i].x, diamond[i].y) < 20) {
                diamond[i] = 0;
                score++;
        }
    }
    for (i=0; i<powerUp.length; i++) {
        if (dist(character[0].x, character[0].y, powerUp[i].x, powerUp[i].y) < 20) {
                powerUp[i] = 0;
                collectPowerUp = 1;
        }
    }
    if (score === 30){
        start = 2;
    }
    
};

// Moving the enemy
enemyObj.prototype.move = function(){
        if ((this.atJoint() === 1) && (random(0, 10) < 5)) {
        this.direction = floor(random(1, 5));   
    }    
    
    if((dist(this.x, this.y, character[0].x, character[0].y) < 100) && (collectPowerUp === 0)) {
        this.speed  = 4;
        //this.x -= this.speed;
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

// Drawing the whole game
var draw = function() {
    background(0, 0, 0);
    if(start === 1 && gameOver === 0){
        background(0, 255, 208);
        pushMatrix();
        translate(gameXCor, gameYCor);
        for (var i=0; i<walls.length; i++) {
            walls[i].draw();
        }
        for (var i=0; i<powerUp.length; i++) {
            if(powerUp[i] !== 0){
                powerUp[i].draw();
            }
        }
        for (i=0; i<diamond.length; i++) {
            if(diamond[i] !== 0){
                diamond[i].draw();
            }
        }
        for (i = 0; i < character.length; i++){
            character[i].draw();
            character[i].checkCollision();
        }
        for (i = 0; i < enemy.length; i++){
            if(enemy[i] !== 0){
                enemy[i].draw();
                enemy[i].move();
            }
            
        }
        
        popMatrix();
        fill(255, 0, 0);
        text(score, 360, 45);
    }
    else if(start === 0){
        background(0, 0, 0);
        startGame.draw();
    }
     else if (gameOver === 1){
        fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("GAME OVER", 200, 200);
        for(var i = 0; i < 10; i++){
            fill(random(0,255), 0, 0);
            text("BOO!!", random(0, 400), random(0, 400));
        }
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

