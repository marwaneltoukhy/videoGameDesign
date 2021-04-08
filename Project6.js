/* Annimation for the zoo, there is snake in blue, a bird in purple that flies over the zoo.

*/
angleMode = "radians";
var a=random(1500);
var animal = [];
var images = [];
// Initialize grass
var grassObj = function(x,y){
    this.x = x;
    this.y = y;
};
// draw grass
grassObj.prototype.draw = function() {
    noStroke();
    fill(2, 94, 3);
    rect(this.x, this.y, 400,150);
};
var grass = new grassObj(0, 250);
// Initialize tree
var Tree = function(position, size) {
    this.position = position.get();
    this.branchingFactor = 4;
    this.angleBetweenBranches = 35;
    this.scaleFactor = 0.65;
    this.numLevels = 4;
    this.baseBranchLength = size;
};
// draw grass
Tree.prototype.display = function() {
    var self = this;
    
    var forward = function(distance) {
        line(0, 0, 0, -distance);
        translate(0, -distance);
    };
    
    var back = function(distance) {
        forward(-distance);
    };
    
    var right = function(angle) {
        rotate(angle * PI / 180);
    };
    
    var left = function(angle) {
        right(-angle);
    };
    
// depth-first drawing
var drawTree = function(depth, length) {
        if (depth === 0) {
            image(getImage("avatars/leaf-green"), -10, -10, 20, 10);
            return;
        }
        var totalAngle = self.angleBetweenBranches * (self.branchingFactor - 1);
        
        strokeWeight(depth*2);
        forward(length);
        right(totalAngle / 2.0);
        for (var i = 0; i < self.branchingFactor; i += 1) {
            drawTree(depth - 1, length * self.scaleFactor);
            left(self.angleBetweenBranches);
        }
        right(totalAngle / 2.0 + self.angleBetweenBranches);
        back(length);
    };
    
    pushMatrix();
    translate(this.position.x, this.position.y);
    stroke(122, 112, 85);
    drawTree(this.numLevels, this.baseBranchLength);
    popMatrix();
};

var skyObj = function(){
};
// drawing the sky that moves with cload
skyObj.prototype.draw = function() {
    var n1 = a;  
    for (var x=0; x<=400; x+=8) {
        var n2 = 0;
        for (var y=0; y<=250; y+=8) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(c, c, c+80,150);
            rect(x,y,8,8);
            n2 += 0.05; // step size in noise
        }
        n1 += 0.02; // step size in noise
    }
    a -= 0.01;  // speed of clouds
    grass.draw();
};
var points = [];
var p2 = [];
var numPoints = 0;
var done = 0;
var start = 0;
// points for the bird
var pointDist = function(x, y) {
    var result = false;
    for (var i = 0; i < points.length; i++) {
        if (dist(x, y, points[i].x, points[i].y) < 10) {
            result = true;  
            done = 1;
        }    
    }    
    return result;
};    

points.push(new PVector(58, 56));
points.push(new PVector(58, 106));
points.push(new PVector(97, 80));
points.push(new PVector(124, 79));
points.push(new PVector(144, 79));
points.push(new PVector(60, 143));
points.push(new PVector(244, 138));
points.push(new PVector(169, 82));
points.push(new PVector(246, 82));
points.push(new PVector(277, 62));
points.push(new PVector(247, 42));
points.push(new PVector(168, 39));
points.push(new PVector(244, 2));
points.push(new PVector(58, 2));
points.push(new PVector(140, 41));
points.push(new PVector(95, 41));
points.push(new PVector(55, 10));
points.push(new PVector(58, 56)); 

var iterations = 0;
var splitPoints = function() {
    p2.splice(0, p2.length);
    for (var i = 0; i < points.length - 1; i++) {
        p2.push(new PVector(points[i].x, points[i].y));
        p2.push(new PVector((points[i].x + points[i+1].x)/2, (points[i].y +
points[i+1].y)/2));
    }  
    p2.push(new PVector(points[i].x, points[i].y));
    p2.push(new PVector((points[0].x + points[i].x)/2, (points[0].y +
points[i].y)/2));
};  
var average = function() {
    for (var i = 0; i < p2.length - 1; i++) {
        var x = (p2[i].x + p2[i+1].x)/2;
        var y = (p2[i].y + p2[i+1].y)/2;
        p2[i].set(x, y);
    } 
    var x = (p2[i].x + points[0].x)/2;
    var y = (p2[i].y + points[0].y)/2;
    points.splice(0, points.length);
    for (i = 0; i < p2.length; i++) {
        points.push(new PVector(p2[i].x, p2[i].y));   
    }    
};    
// subdivide function
var subdivide = function() {
    splitPoints();
    average();
}; 
// initializing the animal object
var animalObj = function(x,y){
    this.position = new PVector(x,y);
};
done = 1;
// draw animal
animalObj.prototype.draw = function(){
    if (done === 0) {
        for (var i = 0; i < points.length; i++) {
            ellipse(points[i].x, points[i].y, 10, 10);   
        } 
        for (var i = 0; i < points.length-1; i++) {
            line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);   
        }
    }    
    if (done === 1) {
        fill(214, 19, 214);
        beginShape();
        for (var i = 0; i < points.length; i++) {
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
        
        if (iterations < 5) {
            subdivide();
            iterations++;
        }    
    }
    images.push(get(0,0,width, height));
    
        for (var i = 0; i < points.length; i++) {
            points[i].x += 3;
        }
};
animal.push(new animalObj(200,200));
var sky = new skyObj();
var tree = new Tree(new PVector(130, 250), 30);
var tree2 = new Tree(new PVector(300, 350),50);
var monteCarlo = function() {
    var v1 = random(220, 255);
    var v2 = random(220, 255);
    while (v2 > v1) {
        v1 = random(220, 255);
        v2 = random(220, 255);
    }
    return(v1);
};
// initilizing particles for the fountain
var particleObj = function(x, y) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(random(-0.3, 0.3), random(-1.3, -1.5));
    this.size = random(2, 4);
    this.position.y -= (18 - this.size);
    this.c1 = monteCarlo();
    this.timeLeft = 255;
};
// intilizing fountain
var fountainObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
};

var gravity = new PVector(0, 0.02);
var fountains = [];
// moving the particles in the fountain
particleObj.prototype.move = function() {
    this.velocity.add(gravity);
    this.position.add(this.velocity);
    this.timeLeft--;
};
// drawing fountain
particleObj.prototype.draw = function() {
    noStroke();
    fill(this.c1, this.c1, this.c1, this.timeLeft);
    ellipse(this.position.x, this.position.y, this.size, this.size*2);
};

fountains.push(new fountainObj(100, 380));
//execution of the fountain
fountainObj.prototype.execute = function() {
    if (this.particles.length < 300) {
        this.particles.push(new particleObj(this.x, this.y));
        this.particles.push(new particleObj(this.x, this.y));
        this.particles.push(new particleObj(this.x, this.y));
    }
    for (var i=0; i<this.particles.length; i++) {
        if ((this.particles[i].timeLeft > 0) && 
            (this.particles[i].position.y < this.y)) {
            this.particles[i].draw();
            this.particles[i].move();
        }
        else {
            this.particles.splice(i, 1);
        }
    } 
    fill(240, 240, 240);
    ellipse(this.x, this.y-9, 60, 10);
};

var x1 = 200;
var y1 = 400;
var cx1 = 200;
var cy1 = 410;
var cx2 = 200;
var cy2 = 420;
var x2 = 200;
var y2 = 430;
var x1Dir = 2;
var x1DirN = -2;
var y1Dir = 2;
var y1DirN = -2;
var back = 0;
var back2 = 0;

var snakeObj = function(){
};
//drawing the snake
snakeObj.prototype.draw = function() {
    noFill();
    strokeWeight(11);
    stroke(25,25,112);
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
};
//moving the snake
snakeObj.prototype.move = function(){
    if(y1 > 200 && back2 === 0){
        if(x1 < 270 && back ===0){
            x1 += x1Dir;
            y1 -= x1Dir-1;
            cy1 -= x1Dir-1;
            cy2 -= x1Dir-1;
            y2 -= x1Dir-1;
            if(x1 > cx1 + 20){
                cx1 += x1Dir;
                if(cx1 > cx2 + 20){
                    cx2 += x1Dir;
                    if(cx2 > x2 + 20){
                        x2 += x1Dir;
                        back = 1;
                    }
                }
            }
        }
        else{
            x1 += x1DirN;
            if(x1 < cx1 - 20){
                cx1 += x1DirN;
                if(cx1 < cx2 - 20){
                    cx2 += x1DirN;
                    if(cx2 < x2 - 20){
                        x2 += x1DirN;
                        back = 0;
                    }
                }
            }
        }
    }
    else{
        back2 = 1;
        if(y1 < 260 && back ===0){
            y1 += y1Dir;
            x1 -= y1Dir-1;
            cx1 -= y1Dir-1;
            cx2 -= y1Dir-1;
            x2 -= y1Dir-1;
            if(y1 > cy1 + 10){
                cy1 += y1Dir;
                if(cy1 > cy2 + 10){
                    cy2 += y1Dir;
                    if(cy2 > y2 + 10){
                        y2 += y1Dir;
                        back = 1;
                    }
                }
            }
        }
        else{
            y1 += y1DirN;
            if(y1 < cy1 - 10){
                cy1 += y1DirN;
                if(cy1 < cy2 - 10){
                    cy2 += y1DirN;
                    if(cy2 < y2 - 10){
                        y2 += y1DirN;
                        back = 0;
                    }
                }
            }
        }
    }
};

var snake = new snakeObj();
//drawing the whole zoo
var draw = function() {
    //background(2, 94, 3);
    grass.draw();
    sky.draw();
    for (var i=0; i<fountains.length; i++) {
        fountains[i].execute();
    }
    if(y1 > 240){
    snake.draw();
    snake.move();}
    noStroke();
    animal[0].draw();
    tree.display();
    tree2.display();
    
    
};