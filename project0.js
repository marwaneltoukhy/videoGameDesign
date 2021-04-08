// Name: Marwan Abbas
// ID: 9063-08364
// PROJECT 0
// Drew my Initials in Times New Roman font (favorite font)
// Click on the displaying window for an extra special surprise
// Took the idea of my flying name from screensavers
frameRate(60);
// initializing of the first letter as an object
var firstletterObj = function(x,y){ 
    this.x = x;
    this.y = y;
    this.size = 10;
    this.xDir = random(1, 3);
    this.yDir = random(1, 3);
};

//draw the fist letter using triangle, rect and quad functions
firstletterObj.prototype.draw = function(){
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
};

// initializing the second letter
var secondletterObj = function(x,y){
    this.x = x;
    this.y = y;
    this.size = 10;
    this.xDir = random(1, 3);
    this.yDir = random(1, 3);
};

/* draw the second letter by drawing a big square and cutting in it using triangle, rect,  quad function for the ease of the process.*/
secondletterObj.prototype.draw = function(){
    noStroke();
    fill(152, 5, 250);
    rect(this.x, this.y, 200, 200);
    fill(0, 0, 0);
    triangle(this.x, this.y + 195, this.x, this.y, this.x + 100, this.y);
    triangle(this.x + 200, this.y + 195, this.x + 200, this.y, this.x + 100, this.y);
    triangle(this.x + 20, this.y + 190, this.x + 85, this.y + 60, this.x + 150, this.y + 190);
    quad(this.x + 40, this.y + 195, this.x + 20, this.y + 190, this.x + 150, this.y + 190, this.x + 120, this.y + 195);
    rect(this.x + 40, this.y + 195, this.size + 70, this.size + 30);
    fill(152, 5, 250);
    rect(this.x + 40, this.y + 125, this.size + 100, this.size);
    quad(this.x - 10, this.y + 200, this.x - 10, this.y + 195, this.x + 10, this.y + 185, this.x, this.y + 200);
    quad(this.x + 200, this.y + 200, this.x + 190, this.y + 185, this.x + 220, this.y + 195, this.x + 220, this.y + 200);
};

var firstletter = new firstletterObj(130, 160);
var secondletter = new secondletterObj (170,195);

// Defining how the first letter should move
firstletterObj.prototype.move = function() {
        this.x += this.xDir;
       
        if ((this.x > 300) || (this.x < 130)) {
            this.xDir = -this.xDir;
        }
        
    };
    
// Defining how the second letter should move
secondletterObj.prototype.move = function() {
        this.x += this.xDir;
       
            if ((this.x > 200) || (this.x < 10)) {
                this.xDir = -this.xDir;
            }
};

/////Creating and Moving the full name//////

// Used the airplane code for refrence
    
var mynameObj = function(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    
};
var myname = [];
for (var i=0; i< 3; i++) {
    myname.push(new mynameObj(random(100, 300), random(10, 400), 1));
    
}
mynameObj.prototype.display = function() {
    fill(245, 117, 117);
    textSize(15);
    text("Marwan", this.x, this.y);
};
mynameObj.prototype.move = function() {
        this.x -= this.speed;
        if (this.x < -50) {
            this.x = 425;
        }
        
};

// Displaying and moving by click of the mouse
draw = function() {
        background(0, 0, 0);
        firstletter.draw();
        secondletter.draw();
        for (var i=0; i<myname.length; i++) {
            myname[i].move();           // update objects in the game
            myname[i].display();   // draw objects in the game
            if(mouseIsPressed){
             firstletter.move(); 
             secondletter.move();
        }
            }
            
};

    
    
