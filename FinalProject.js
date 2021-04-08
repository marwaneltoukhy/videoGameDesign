/*
    Final project game, it is a replica of packman, there are obsicles you have to pass.
    First level it's only missles.
    Second level some balls from the ceiling are added
    Third level some zombies will be walking on the ground
    Go to the finish line to win.
    Go to instructions for how to play the game.
*/
angleMode = "radians";
var tileMap = [
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "               o            o              o             o                     o                     o                         o               o            o                      ",
    "                                                                                                                                                                       wb          ",
    "                                                                                                                                                                       bw          ",
    "                                                                                                                                        ccccc                          wb          ",
    "                                                                                                                                       ccccccc                         bw          ",
    "                                                                                                                                      ccccccccc                        wb          ",
    "                                                                                                                                        cccccc                         bw          ",
    "                                                        ccccccc                                                                          cccc                          wb          ",
    "                                                       ccccccccc                                                                                                       bw          ",
    "                                                        ccccccc                                 ccccc                                                                  wb          ",
    "                                                                                               ccccccc                                                                 bw          ",
    "                                                                                              ccccccccc                                                                wb          ",
    "                                                                                               ccccccc                                                                 bw          ",
    "                                                                                                ccccc                                                                  wb          ",
    "                                                                                                                                                                       bw          ",
    "                                                                                                                                                                       wb          ",
    "                                                                                                                                                                       bw          ",
    "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
    ];
//initilizing the buttons
var buttonObj = function(x,y,w,l){
    this.x = x;
    this.y = y;
    this.w = w;
    this.l = l;
};
// drawing the buttons
buttonObj.prototype.draw = function() {
    fill(255,0,0);
    rect(this.x, this.y, this.w, this.l,10);
};

var startButton = new buttonObj(130, 170, 150, 40);
var instructionButton = new buttonObj(130, 250, 150, 40);
var easyButton = new buttonObj(20, 300, 150, 40);
var hardButton = new buttonObj(130, 300, 150, 40);
var deadButton = new buttonObj(260, 300, 150, 40);
var muteButton = new buttonObj(290, 30, 60, 60);
var playAgainButton = new buttonObj (130, 350, 150, 40);
var start = 0;
var difficult = 0;
var muted = 0;
// initializing the animation for the buttons
var animationObj = function(x,y){
    this.x = x;
    this.y = y;
};
// draw the animation
animationObj.prototype.draw = function() {
    noStroke();
    fill(255,215,0);
    triangle(this.x, this.y, this.x - 10, this.y - 10, this.x + 10, this.y);
    fill(218,165,32);
    triangle(this.x, this.y, this.x - 10, this.y + 10, this.x + 10, this.y);
};


var explosionObj = function(a) {
    this.position = new PVector(0, 0);
    this.direction = new PVector(0, 0);
    this.size = random(5, 9);
    this.timer = 0;
};    

var fireworkObj = function(a) {
    this.position = new PVector(200, 380);
    this.direction = new PVector(0, 0);
    this.target = new PVector(200, 200);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
        this.explosions.push(new explosionObj(a));   
    }    
};    

var firework = [new fireworkObj(0)];

fireworkObj.prototype.draw = function() {
    //fill(255, 255, 255);
    //noStroke();
    //ellipse(this.position.x, this.position.y, 2, 2);
    
    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
        this.step = 2;
        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].position.set(this.target.x, this.target.y);
            
            this.explosions[i].direction.set(random(0, 360), random(-1, 1));
/*	    this.explosions[i].direction.set(random(-0.3, 0.3), 
		random(-0.3, 0.3)); // cartesian (instead of polar) direction */
            this.explosions[i].timer = 180;
        }
    }    
};

explosionObj.prototype.draw = function() {
    fill(255,0,0);	// 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
    
    this.position.x += this.direction.y*cos(this.direction.x);
    this.position.y += this.direction.y*sin(this.direction.x);
};
// mute object
var muteObj = function(x,y){
    this.x = x;
    this.y = y;
};
// draw the mute object
muteObj.prototype.draw = function() {
    stroke(250, 250, 250);
    strokeWeight(3);
    line(this.x + 25, this.y, this.x + 40, this.y + 20);
    line(this.x + 25, this.y + 20, this.x + 40, this.y);
    noStroke();
    fill(250, 250, 250);
    rect(this.x, this.y, 10, 20, 5);
    quad(this.x +9, this.y, this.x + 20, this.y - 10, this.x + 20, this.y + 30, this.x + 9, this.y + 20);
};

var mute = new muteObj(300,50);
// animating through a series of images

var personObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.currFrame = frameCount;
    this.i = 0;
};

var person = [];
var frame = frameCount;

personObj.prototype.draw = function() {
    //pushMatrix();
    //scale(3);
    noStroke();
    fill(23, 4, 23);
    ellipse(this.x, this.y, 17, 17);  // head
    strokeWeight(2);
    stroke(81, 0, 255);
    //strokeWeight(4);
    line(this.x, this.y+10, this.x, this.y+20); // body
    strokeWeight(2);
    line(this.x-13, this.y+12, this.x-2, this.y+12);  //arms
    //line(this.x, this.y, this.x-10, this.y);
    switch (this.i) {
        case 0:
            line(this.x, this.y+20, this.x+10, this.y+35);  // legs
            line(this.x, this.y+20, this.x-10, this.y+35);
            break;
        case 1:
            //line(this.x, this.y+12, this.x+8, this.y+20);
            //line(this.x, this.y+12, this.x-8, this.y+20);
            line(this.x, this.y+20, this.x+8, this.y+35);
            line(this.x, this.y+20, this.x-8, this.y+35);
            break;
        case 2:
            //line(this.x, this.y+12, this.x+6, this.y+20);
            //line(this.x, this.y+12, this.x-6, this.y+20);
            line(this.x, this.y+20, this.x+6, this.y+35);
            line(this.x, this.y+20, this.x-6, this.y+35);
            break;
        case 3:
            //line(this.x, this.y+12, this.x+3, this.y+20);
            //line(this.x, this.y+12, this.x-3, this.y+20);
            line(this.x, this.y+20, this.x+3, this.y+35);
            line(this.x, this.y+20, this.x-3, this.y+35);
            break;
        case 4:
            //line(this.x, this.y+12, this.x+0, this.y+20);
            //line(this.x, this.y+12, this.x-0, this.y+20);
            line(this.x, this.y+20, this.x+0, this.y+35);
            line(this.x, this.y+20, this.x-0, this.y+35);
            break;
        case 5:
            //line(this.x, this.y+12, this.x+3, this.y+20);
            //line(this.x, this.y+12, this.x-3, this.y+20);
            line(this.x, this.y+20, this.x+3, this.y+35);
            line(this.x, this.y+20, this.x-3, this.y+35);
            break;
        case 6:
            //line(this.x, this.y+12, this.x+6, this.y+20);
            //line(this.x, this.y+12, this.x-6, this.y+20);
            line(this.x, this.y+20, this.x+6, this.y+35);
            line(this.x, this.y+20, this.x-6, this.y+35);
            break;
        case 7:
            //line(this.x, this.y+12, this.x+8, this.y+20);
            //line(this.x, this.y+12, this.x-8, this.y+20);
            line(this.x, this.y+20, this.x+8, this.y+35);
            line(this.x, this.y+20, this.x-8, this.y+35);

    }
    
    this.x--;
   /* if (this.x < -10) {
        this.x = 410;
    }*/
    noStroke();
    if (this.currFrame < (frameCount - 4)) {
        this.currFrame = frameCount;
        this.i++;
        if (this.i > 7) {
            this.i = 0;
        }
    }
    //popMatrix();
};
var animation = new animationObj(100,190);
var animation2 = new animationObj(100,270);
var animation3 = new animationObj(100,250);
// missiles 
var missleObj = function(x,y){
    this.x =x;
    this.y = y;
    this.speed = 1;
};
// missiles draw
missleObj.prototype.draw = function() {
    noStroke();
    fill(15, 9, 145);
    arc(this.x, this.y, 70, 30, 90, 270 );
    rect(this.x, this.y - 15, 60, 30);
    fill(206, 32, 41);
    quad(this.x + 70, this.y - 15, this.x + 120, this.y - 60, this.x + 120, this.y + 60, this.x + 70, this.y + 15);
    fill(255, 153, 0);
    quad(this.x + 80, this.y - 10, this.x + 100, this.y - 30, this.x + 100, this.y + 30, this.x + 80, this.y + 10);
    
    stroke(255, 0, 0);
    line(this.x, this.y -15, this.x, this.y+15);
};

missleObj.prototype.move = function(){
    this.x -= this.speed;
    this.y -= this.speed;
};

var gameXCor = 0;
var gameYCor = 0;
var missle = new missleObj(40, 60);
var missle2 = new missleObj(30, 100);
var attackMissles = [];

missleObj.prototype.move = function(){
    this.x -= this.speed;
    
};
var playerObj = function(x,y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.force = new PVector(0, 0);
    this.currFrame = frameCount;
    this.jump = 0;
    this.walkForward = 0;
    this.walkBackward = 0;
};

var gravity = new PVector(0, 0.1);
var walkForce = new PVector(0.01, 0);
var backForce = new PVector(-0.01, 0);
var jumpForce = new PVector(0, -0.5);
var oppForce = new PVector(0,-0.1);
var gameOver = 0;


playerObj.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};

playerObj.prototype.draw = function() {
    noStroke();
    fill(0, 0, 0);
    rect(this.position.x - 10, this.position.y - 20, 30, 90, 10);
    rect(this.position.x + 10, this.position.y + 40, 60, 10, 10);
    fill(255, 195, 170);
    rect(this.position.x + 20, this.position.y + 24, 50, 17, 10);
    rect(this.position.x + 20, this.position.y, 20, 40, 10);
    rect(this.position.x + 20, this.position.y - 40, 20, 30, 10);
    fill(0, 255, 204);
    rect(this.position.x + 20, this.position.y - 20, 20, 30,10);
    fill(250, 175, 145);
    ellipse(this.position.x + 35, this.position.y - 45, 40,40);
    fill(75, 57, 50);
    arc(this.position.x + 35, this.position.y - 45, 40, 40, 3.14159, 6.28319);
    fill(0, 255, 204);
    rect(this.position.x + 20, this.position.y + 50, 20,10);
    fill(75, 57, 50);
    rect(this.position.x + 20, this.position.y + 60, 50,20);
    fill(250, 175, 145);
    rect(this.position.x + 54, this.position.y + 80, 16, 40);
    fill(0, 0, 0);
    rect(this.position.x + 54, this.position.y + 110, 30, 10,10);
};

var player = new playerObj(300,1080);




var groundObj = function(x,y){
    this.x = x;
    this.y = y;
};

var blackObj = function(x,y){
    this.x = x;
    this.y = y;
};

blackObj.prototype.draw = function() {
    fill(0,0,0);
    rect(this.x, this.y, 20,20);
};

var whiteObj = function(x,y){
    this.x = x;
    this.y = y;
};

whiteObj.prototype.draw = function() {
    fill(255, 255, 255);
    rect(this.x, this.y, 20,20);
};

groundObj.prototype.draw = function() {
    fill(80, 80, 80);
    rect(this.x, this.y, 40,40);
    fill(0, random(150), 0);
    ellipse(this.x + 10, this.y + 25, 14, 16);
};

var ground = [];
var white = [];
var black = [];

var wallObj = function(x,y){
    this.x = x;
    this.y = y;
};

wallObj.prototype.draw = function() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x+20, this.y + 20, 20,20);
    fill(60, 128, 87);
    rect(this.x, this.y, 40,20);
    rect(this.x + 5, this.y + 20, 5, 5, 5);
    rect(this.x + 30, this.y + 20, 5, 5, 5);
};

var wall = [];

//initializing the ball object
var ballObj = function(x, y) {
    this.position = new PVector(x,y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.force = new PVector(0, 0);
    this.currFrame = frameCount;
    this.bounceCoeff = -0.2;
    this.av = 1;
};


var ball = [];


var ballCount = 0;
var currFrame = 0;

var coinObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.wDir = -1;
};

coinObj.prototype.draw = function() {
    fill(240, 234, 156);
    ellipse(this.x, this.y, this.w, 70);
    fill(140, 106, 26);
    ellipse(this.x, this.y, this.w*0.8, 56);
    this.w += this.wDir;

    if ((this.w > 50) || (this.w < 0)) {
        this.wDir = -this.wDir;
    }

    this.x--;
    if (this.x < -50) {
        this.x = 450;
    }
};

var coin = [];

var initTileMap = function() {
    for (var i = 0; i< tileMap.length; i++) {
        for (var j =0; j < tileMap[i].length; j++) {
            switch (tileMap[i][j]) {
                case 'g': ground.push(new groundObj(j*20, i*20));
                    break;
                case 'w': white.push(new whiteObj(j*20, i*20));
                    break;
                case 'b': black.push(new blackObj(j*20, i*20));
                    break;
                case 'o': wall.push(new wallObj(j*20, i*20 +20));
                          ball.push(new ballObj(j*20* 10/3 + 50, i*20 +20* 10/3 + 100));
                    break;
                case 'c': coin.push(new coinObj(j*20* 10/3 + 50, i*20 * 10/3 + 50));
                    break;
            }
        }
    }
};



initTileMap();

// detect the mouse clicks
var mouseClicked = function(){
    if(mouseX > instructionButton.x && mouseX < instructionButton.x + instructionButton.w && mouseY > instructionButton.y && mouseY < instructionButton.y + instructionButton.l){
        start = 7;
    }
    if(mouseX > startButton.x && mouseX < startButton.x + startButton.w && mouseY > startButton.y && mouseY < startButton.y + startButton.l){
        initTileMap();
        start = 1;
    }
    if(mouseX > playAgainButton.x && mouseX < playAgainButton.x + playAgainButton.w && mouseY > playAgainButton.y && mouseY < playAgainButton.y + playAgainButton.l){
        start = 0;
    }
};
ballObj.prototype.applyForce = function(force) {
    this.acceleration.add(force);
};

ballObj.prototype.updatePosition = function() {
    this.acceleration.set(0, 0);
    this.applyForce(gravity);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (currFrame < (frameCount - 300)) {
        currFrame = frameCount;
        for (var i=0; i<wall.length; i++) {
            ball.push(new ballObj(wall[i].x * 10/3 + 50, wall[i].y *10/3 + 50));
            ballCount++;
        }
        
    }
    if (this.position.y > (1140)) {
        this.av = 0;
    }
    
};


ballObj.prototype.draw = function() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.position.x + 20,this.position.y + 20, 60,60);
};

ballObj.prototype.move = function(){
    this.position.y += 1;
};

playerObj.prototype.update = function() {
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
    if (this.position.y >= 1079.99) {
        this.position.y = 1080;
        this.velocity.y = 0;
        this.jump = 1;
        this.force = -1;
    }
    if(this.position.y < 200){
        this.position.y = 200;
    }
    
};

var keyPressed = function() {
    if (keyCode === UP && keyIsPressed) {
        player.jump = 2;
    }
};

var keyReleased = function() {
    if (keyCode === UP && keyIsPressed) {
        player.force = 0;
    }
};
var coincount = 0;
var countLevel = 0;
var which = 0;
playerObj.prototype.checkCollision = function () {
    for (var i=0; i<attackMissles.length; i++) {
        if (dist(this.position.x, this.position.y, attackMissles[i].x, attackMissles[i].y)<100) {
                start = 2;
                which = 1;
        }
    }
    for (var i=0; i<coin.length; i++) {
        if (dist(this.position.x, this.position.y, coin[i].x, coin[i].y)<150) {
                coin[i] = 0;
                coincount++;
        }
    }
    for (var i=0; i<black.length; i++) {
        if (dist(this.position.x, this.position.y, white[i].x* 10/3 + 50, white[i].y* 10/3 + 50)<100) {
            if(start === 1){
                start = 5;
            }
            else if(start === 5){
                start = 6;
            }
            else if(start === 6){
                start = 4;
            }
                gameXCor = 80;
                player.position.x = 80;
        }
    }
};



ballObj.prototype.checkCollision = function () {
        if (dist(player.position.x, player.position.y, this.position.x, this.position.y)<100) {
                start = 2;
                which = 3;
        }
};

var updatePerson = function(){
    
    person.push(new personObj(gameXCor + 3000, 325));
};

personObj.prototype.checkCollision = function(){
        if (dist(player.position.x, player.position.y, this.x* 10/3 + 50, this.y* 10/3 + 50)<70) {
                start = 2;
                which = 2;
        }
};

var updateMissle = function(x){
    
        if(difficult > 0){
            //for(var i = 0; i < 10; i++){
            attackMissles.push(new missleObj(gameXCor + random(1000,10000) , x));
        //}
        }
        else{
            //for(var i = 0; i < 10; i++){
            attackMissles.push(new missleObj(gameXCor + random(1000,10000), random(200, 1080)));
            //}
        }
    
};

// draw the whole menu
var draw = function() {
    background(19, 193, 237);
    if(start === 0){
        pushMatrix();
        translate(150,300);
        rotate(2.35619);
        scale(0.75);
        missle.draw();
        missle.move();
        popMatrix();
        pushMatrix();
        translate(340,230);
        rotate(0.785398);
        scale(0.75);
        missle2.draw();
        missle2.move();
        popMatrix();
        //startButton.draw();
        
        var f = createFont("Showcard Gothic");
        textFont(f);
        fill(250, 250, 250);
        textAlign(CENTER,CENTER);
        textSize(30);
        text("Missiles and Jet packs", 200, 60);
        fill(250, 250, 250);
        textAlign(LEFT, TOP);
        textSize(30);
        text("New Game", startButton.x, startButton.y);
        if(mouseX > startButton.x && mouseX < startButton.x + startButton.w && mouseY >                  startButton.y && mouseY < startButton.y + startButton.l){
            animation.draw();
        }
        if(mouseX > instructionButton.x && mouseX < instructionButton.x + instructionButton .w && mouseY > instructionButton.y && mouseY < instructionButton.y + instructionButton.l){
            animation2.draw();
        }
        //instructionButton.draw();
        textSize(32);
        fill(250, 250, 250);
        text("Instructions", instructionButton.x -20, instructionButton.y);
    }
    if(start === 1){
        background(230, 55, 230);
        gameXCor -= 2;
        player.position.x += 6.6;
        translate(gameXCor, gameYCor);
        for (var i=0; i<ground.length; i++) {
                ground[i].draw();
        }
        for (var i=0; i<black.length; i++) {
                black[i].draw();
        }
        for (var i=0; i<white.length; i++) {
                white[i].draw();
        }
        //if(countMis === 0){
        //}
        pushMatrix();
        scale(0.3);
        for (var i=0; i<coin.length; i++) {
            if(coin[i] !== 0){
                coin[i].draw();
            }
        }
        player.update();
        //if (this.currFrame < (frameCount - 60)) {
        while(attackMissles.length < 10){
        this.currFrame = frameCount;
        updateMissle(player.position.y);
        }
        for (var i=0; i<attackMissles.length; i++) {
                attackMissles[i].draw();
                attackMissles[i].move();
        }
        player.draw();
        player.checkCollision();
        popMatrix();
    }
    if(start === 2){
        fill(0, 0, 0, 60);
    rect(0, 0, 400, 400);
    fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("GAME OVER", 200, 200);
        textSize(20);
        if(which === 1){
            text("You were killed by a Missle!", 200, 250);
        }
        if(which === 2){
            text("You were killed by a ZOMBIE!", 200, 250);
        }
        if(which === 3){
            text("You were killed by a Ball!", 200, 250);
        }
        fill(250, 250, 250);
        textAlign(LEFT, TOP);
        textSize(30);
        text("play Again!", playAgainButton.x, playAgainButton.y);
    for (var j = 0; j < firework.length; j++) {
        if (firework[j].step === 0) {
            firework[j].position.set(200, 200);
            firework[j].target.set(200, 200);
            firework[j].direction.set(firework[j].target.x - firework[j].position.x, firework[j].target.y - firework[j].position.y);
            var s = random(1, 2) / 100;
            firework[j].direction.mult(s);
            firework[j].step++;
        } 
        else if (firework[j].step === 1) {
            firework[j].draw();
        } 
        else if (firework[j].step === 2) {
            for (var i = 0; i < firework[j].explosions.length; i++) {
                firework[j].explosions[i].draw();   
            } 
            if (firework[j].explosions[0].timer <= 0) {
                firework[j].step = 0;   
            }
        }
    }
    }
    if(start === 4){
        textSize(40);
        textAlign(CENTER, CENTER);
        text("YOU WIN!", 200,200);
        fill(250, 250, 250);
        textAlign(LEFT, TOP);
        textSize(30);
        text("play Again!", playAgainButton.x, playAgainButton.y);
        text("You got", 50, 30);
        text(coincount, 190,30);
        text("Coins!", 220, 30);
    }
    if(start === 5){
        background(230, 55, 230);
        gameXCor -= 2;
        player.position.x += 6.6;
        translate(gameXCor, gameYCor);
        for (var i=0; i<ground.length; i++) {
                ground[i].draw();
        }
        for (var i=0; i<wall.length; i++) {
                wall[i].draw();
        }
        for (var i=0; i<black.length; i++) {
                black[i].draw();
        }
        for (var i=0; i<white.length; i++) {
                white[i].draw();
        }
        pushMatrix();
        scale(0.3);
        for (var i=0; i<ball.length; i++) {
            ball[i].updatePosition();
            if(ball[i].av !== 0){
                ball[i].draw();
            }
            ball[i].checkCollision();
        }
        while(attackMissles.length < 10){
        this.currFrame = frameCount;
        updateMissle(player.position.y);
        }
        for (var i=0; i<attackMissles.length; i++) {
                attackMissles[i].draw();
                attackMissles[i].move();
        }
        player.draw();
        player.update();
        player.checkCollision();
        popMatrix();
    }
    
    if(start === 6){
        background(230, 55, 230);
        
        gameXCor -= 2;
        player.position.x += 6.6;
        translate(gameXCor, gameYCor);
        for (var i=0; i<ground.length; i++) {
                ground[i].draw();
        }
        for (var i=0; i<wall.length; i++) {
                wall[i].draw();
        }
        for (var i=0; i<black.length; i++) {
                black[i].draw();
        }
        for (var i=0; i<white.length; i++) {
                white[i].draw();
        }
        
        if(frame < (frameCount - 120)){
        frame = frameCount;
        updatePerson();
        }
        for(var i = 0; i < person.length; i++){
            person[i].draw();
            person[i].checkCollision();
        }
        pushMatrix();
        scale(0.3);
        for (var i=0; i<ball.length; i++) {
            ball[i].updatePosition();
            if(ball[i].av !== 0){
                ball[i].draw();
            }
            ball[i].checkCollision();
        }
        while(attackMissles.length < 10){
        this.currFrame = frameCount;
        updateMissle(player.position.y);
        }
        for (var i=0; i<attackMissles.length; i++) {
                attackMissles[i].draw();
                attackMissles[i].move();
        }
        player.draw();
        player.update();
        player.checkCollision();
        popMatrix();
    }
    if(start === 7){
        pushMatrix();
        translate(150,300);
        rotate(2.35619);
        scale(0.75);
        missle.draw();
        missle.move();
        popMatrix();
        pushMatrix();
        translate(340,230);
        rotate(0.785398);
        scale(0.75);
        missle2.draw();
        missle2.move();
        popMatrix();
        fill(255,255,255);
        text("To play this game", 50,40);
        text("you only need the up", 30, 80);
        text(" and down arrows.", 40, 120);
        text("Try to avoid all" , 50, 160);
        text("obsticles and go" , 50 , 200);
        text("to the finish line.", 40, 240);
        fill(250, 250, 250);
        textAlign(LEFT, TOP);
        textSize(30);
        text("play!", playAgainButton.x, playAgainButton.y);
    }
};
