var tilemap = [
"wwwwwwwwwwwwwwwwwww",
"w c        b   f  w",
"wwwwwj jwwwwwwj  jw",
"w fb           f  w",
"wwwwwwwwwwwwwwj  jw",
"w f    b    f     w",
"wj jwwwwwwwwwwwww w",
"w f         f  f  w",
"wwwwwwwj jwwwwwwwww",
"w f     j    b f jw",
"wwwwwwwwwwwwj  jwww",
"w  f    b       fjw",
"wwwwwwwwwwwwwwwwwww"
];

var images = [];

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


var characterObj = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1;
};

var enemyObj = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.Dir = 1;
};

var jointObj = function(x,y){
    this.x = x;
    this.y = y;
};

var wallImg = new wallObj(0,0);
var diamondImg = new diamondObj(0,0);
var characterImg = getImage("avatars/piceratops-ultimate");
var enemyImg = getImage("avatars/duskpin-tree");
var walls = [];
var joint = [];
var diamond= [];
var character = [];
var enemy = [];
var done = 0;
var score = 0;

diamondObj.prototype.draw = function() {
    image(images[1], this.x,this.y, 0,0);
};


wallObj.prototype.draw = function() {
    image(images[0], this.x,this.y, 0,0);
};


characterObj.prototype.draw = function() {
    image(characterImg, this.x, this.y, 25, 25);
};

enemyObj.prototype.draw = function() {
    image(enemyImg, this.x, this.y, 20, 30);
};

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
            }
        }
    }
};

initTilemap();

characterObj.prototype.collide = function() {
    var hit = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x, walls[i].y) < 25) {
            hit = 1;   
        }
    }    
    
    return hit;
}; 

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

enemyObj.prototype.collide = function() {
    var c = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x, walls[i].y) < 25) {
            c = 1;   
        }    
    }    
    
    return c;
}; 

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

///Key presses////
var keyPressed = function() {
    if (keyCode === LEFT) {
        if(character[0].collide() === 0){
            character[0].x-= 3;
        }
        else{
            character[0].x += 5;
            
        }
    }
    if (keyCode === RIGHT) {
        if(character[0].collide() === 0){
            character[0].x+= 3;
        }
        else{
            character[0].x -= 5;
        }
    }
    if (keyCode === UP) {
        if(character[0].collide() === 0){
        character[0].y-= 3;
        }
        else{
            character[0].y += 5;
        }
    }
    if (keyCode === DOWN) {
        if(character[0].collide() === 0){
        character[0].y+= 3;
        }
        else{
            character[0].y -= 5;
        }
        
    }

};

var currFrame = 0;
var gameOver = 0;



enemyObj.prototype.move = function(){
    if ((this.atJoint() === 1) && (random(0, 10) < 5)) {
        this.direction = floor(random(1, 5));   
    }    
    
    switch (this.Dir) {
        case 1: //right
            this.x += this.speed;
            if (this.collide() === 1) {
                this.x -= this.speed;
                this.Dir = floor(random(1, 5));
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



var collectDiamond = 0;
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
    if (score === 12){
        start = 2;
    }
    
};

var draw = function() {
    background(0, 0, 0);
    if(start === 1 && gameOver === 0){
        background(0, 255, 208);
        for (var i=0; i<walls.length; i++) {
            walls[i].draw();
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
            enemy[i].draw();
            enemy[i].move();
        }
        fill(255, 0, 0);
        text(score, 360, 35);
        
    }
    else if(start === 0){
        background(0, 0, 0);
        startGame.draw();
    }
     else if (gameOver === 1){
        fill(255, 0, 0);
        textSize(40);
        text("GAME OVER", 100, 200);
    }
    else if(start === 2){
            background(0, 0, 255);
            fill(255, 0, 0);
            text("YOU WIN!", 100, 200);
        }
};

