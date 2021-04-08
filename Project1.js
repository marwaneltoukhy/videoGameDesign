// Name: Marwan Abbas
// ID:906308364
// Project 1
// Try not to crash the Letter 'A' with 'M'
// Use the left and right arrows on your keyboard
// Click on "Start Game" to start!

var images = [];
var objects = [];

// This is the tilemap for the game
var tilemap = [
    "   m          ",
    "    m         ",
    "     m        ",
    "      m       ",
    "       m      ",
    "        m     ",
    "         m    ",
    "          m   ",
    "              ",
    "              ",
    "              ",
    "          m   ",
    "         m    ",
    "        m     ",
    "       m      ",
    "      m       ",
    "     m        ",
    "              ",
    "m            m",
    " m           m",
    "  m         m ",
    "   m       m  ",
    "    m     m   ",
    "     m   m    ",
    "mmmmm    mmmmm",
    "m            m",
    " m          m ",
    "              ",
    "  m        m  ",
    "              ",
    "   m      m   ",
    "              ",
    "    m    m    ",
    "              ",
    "mmmmmm  mmm   ",
    "m         m   ",
    "m        m    ",
    "m       m     ",
    "m      m      ",
    "m     m       ",
    "m    m        ",
    "m    m        ",
    "m     m       ",
    "m      m      ",
    "m       m     ",
    "m        m    ",
    "m         m   ",
    "m          m  ",
    "m           m ",
    "m            m",
    "m            m",
    "m            m",
    "m            m",];

//// Start Game //////
var startGameObj = function(x,y){
    this.x = x;
    this.y = y;
};
// Drawing of the start game phrase
startGameObj.prototype.draw = function() {
    fill(255, 0, 0);
    textSize(50);
    text("Start Game", this.x, this.y);
};
// creating a new object from the start game function
var startGame = new startGameObj(100, 200);
var start = 0;
// Checking where the user is clicking their mouse
// Doesn't work if user clicks outside of the phrase "Start Game"
var mouseClicked = function(){
    if(mouseX > 100 && mouseX < 355 && mouseY > 160 && mouseY < 200){
        start = 1;
    }
};

////// First letter////////
// Initializing the 'M' Letter
// Had to take it as an image and scale it down
var firstletterObj = function(x,y){ 
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speed = 0.2;
    this.position = new PVector(x, y);
    background(0, 0, 0);
    noStroke();
    fill(152, 5, 250);
    rect(this.x - 85, this.y - 155, this.size + 150, this.size + 150);
    fill(0, 0, 0);
    triangle(this.x - 85, this.y - 145, this.x - 85, this.y + 5, this.x - 30, this.y + 5);
    fill(152, 5, 250);
    rect(this.x - 100, this.y - 150, this.size + 5, this.size + 140);
    quad(this.x - 60, this.y - 150, this.x - 90, this.y - 145, this.x - 100, this.y - 145, this.x - 120, this.y - 150);
    quad(this.x - 60, this.y, this.x - 90, this.y - 5, this.x - 100, this.y - 5, this.x - 120, this.y);
    rect(this.x - 120, this.y - 155, this.size + 50, this.size - 5);
    rect(this.x - 120, this.y, this.size + 50, this.size - 5);
    fill(0, 0, 0);
    triangle(this.x - 70, this.y - 155, this.x - 15, this.y - 5, this.x + 35, this.y - 155);
    triangle(this.x + 50, this.y - 145, this.x + 50, this.y + 5, this.x , this.y + 5); 
    
    fill(152, 5, 250);
    quad(this.x + 25, this.y, this.x + 50, this.y - 5, this.x + 75, this.y - 5, this.x + 95, this.y);
    rect(this.x + 25, this.y, this.size + 60, this.size - 5);
    triangle(this.x + 75, this.y - 150, this.x + 75, this.y - 145, this.x + 95, this.y - 150);
    rect(this.x + 75, this.y - 155, this.size + 10, this.size - 5);
    images.push(get(0,0,this.x + 95, this.y + 5));
    this.currFrame = 0;
    this.yCor = -700;
};
// Creating a new object from the funtion firstletter
var firstletter = new firstletterObj(120, 155);

var obstacle = image(images[0], 0, 0, 20,20);

///Second Letter////
// As the first letter I had to take an image and scale it down
var secondletterObj = function(x,y){
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speed = 2;
    noStroke();
    fill(25, 250, 5);
    rect(this.x, this.y, 200, 200);
    fill(0, 0, 0);
    triangle(this.x, this.y + 195, this.x, this.y, this.x + 100, this.y);
    triangle(this.x + 200, this.y + 195, this.x + 200, this.y, this.x + 100, this.y);
    triangle(this.x + 20, this.y + 190, this.x + 85, this.y + 60, this.x + 150, this.y + 190);
    quad(this.x + 40, this.y + 195, this.x + 20, this.y + 190, this.x + 150, this.y + 190, this.x + 120, this.y + 195);
    rect(this.x + 40, this.y + 195, this.size + 70, this.size + 30);
    fill(25, 250, 5);
    rect(this.x + 40, this.y + 125, this.size + 100, this.size);
    quad(this.x - 10, this.y + 200, this.x - 10, this.y + 195, this.x + 10, this.y + 185, this.x, this.y + 200);
    quad(this.x + 200, this.y + 200, this.x + 190, this.y + 185, this.x + 220, this.y + 195, this.x + 220, this.y + 200);
    this.y = 1050;
    images.push(get(180,200,width, height));

};
// create a new object from secondletter funtion
var secondletter = new secondletterObj (180,200);
var currFrame = 0;
var gameOver = 0;
// Drawing of 'A'
secondletterObj.prototype.draw = function() {
    //this.y = this.y + 1050;
    image(images[1], this.x,this.y, 30,30);
    this.y -= this.speed;
};
// Draw of the 'M' letter as the obsticles in the background
firstletterObj.prototype.drawBackground = function(){
    for(var i = 0; i < tilemap.length; i++){
        for(var j = 0; j < tilemap[i].length; j++){
            if(tilemap[i][j] === 'm'){
                image(images[0], j*29, i*20, 20,20);
                //obstacle.push(new objectObj(j*29, i*20, 1));
                if (dist(j*29, i*20, secondletter.x, secondletter.y) < 20) {
                   gameOver = 1;
            }
            }
        }
    }
        firstletter.yCor += secondletter.speed;
    if (firstletter.yCor >= 400) {
        firstletter.yCor = -700;
        secondletter.y = 1050;
    }
    
    };
// Testing which key is pressed and acting upon it
var keyPressed = function() {
    if (keyCode === LEFT) {
        secondletter.x-= 3;
    }
    if (keyCode === RIGHT) {
        secondletter.x+= 3;
    }
    if (keyCode === UP) {
        secondletter.y--;
    }
    if (keyCode === DOWN) {
        secondletter.y++;
    }
    if (secondletter.x < 0) {
        secondletter.x = 0;
    }
    if (secondletter.x > 380) {
        secondletter.x = 380;
    }
};

// The drawing of the Whole game
var draw = function() {
    background(0, 0, 0);

    if(start === 1 && gameOver === 0){
    
        pushMatrix();
        translate(0, firstletter.yCor);
        firstletter.drawBackground();
        secondletter.draw();
        popMatrix();
    }
    else if(start === 0){
        startGame.draw();
    }
    else{
        fill(255, 0, 0);
        textSize(40);
        text("GAME OVER", 100, 200);
    }
};
