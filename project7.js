/*this is a mini project to see how the NPCs will move towards the character using A* 
search.
You can move the character using the arrow keys.
The NPCs move on the same path of the A* search, that's why they end up moving together.
The cars will wait for you in the begining of the game, so that the character can move
freely for a couple of seconds.
*/

angleMode = "radians";

var tileMap = [
"wwwwwwwwwwwwwwwwwwww",
"w      b           w",
"w                  w",
"wwwwwwwwwwwwwww  www",
"w                  w",
"w                  w",
"wwwwwwww  wwwwww  ww",
"w                  w",
"w                  w",
"www  wwwwwwwwwwww  w",
"w                  w",
"w              b   w",
"wwwwwwwww  wwwwwwwww",
"w                  w",
"w                  w",
"wwww  wwwwwwwwwww  w",
"w                  w",
"w  c               w",
"w                  w",
"wwwwwwwwwwwwwwwwwwww"];

//Initialization of the wall
var wallObj = function(x, y) {
    this.x = x;
    this.y = y;
};

var qObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.fcost = 0;
};

//Initialization to the character object
var characterObj = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1;
};

var characterImg = getImage("avatars/robot_male_2");

var character = [];

//drawing of the character
characterObj.prototype.draw = function() {
    image(characterImg, this.x - 5, this.y - 10, 20, 20);
};

qObj.prototype.set = function(a, b) {
    this.x = a;
    this.y = b;
};

// Initializing some arrays needed for the A* search
var graph = new Array(20);
var cost = new Array(20);
var inq = new Array(20);
var comefrom = new Array(20);
for (var i=0; i<20; i++) {
    graph[i] = new Array(20);
    cost[i] = new Array(20);
    inq[i] = new Array(20);
    comefrom[i] = new Array(20);
}
var path = [];
var q = [];
for (i=0; i<400; i++) {
    path.push(new PVector(0, 0));
    q.push(new qObj(0, 0));
}
for (i=0; i<20; i++) {
    for(var j=0; j<20; j++) {
        comefrom[i][j] = new PVector(0, 0);
    }
}
var pathLen = 0;
var pathFound = 0;
var qLen = 0;
var qStart = 0;

var initialized = 0;
var walls = [];

// Initialization of the tile map
var initializeTilemap = function () {
    for (var i=0; i<tileMap.length; i++) {
        for (var j=0; j<tileMap[i].length; j++) {
            if(tileMap[i][j] === 'c'){
                character.push(new characterObj(j*20, i*20));
            }
            if (tileMap[i][j] === 'w') {
                walls.push(new wallObj(j*20, i*20));
                graph[i][j] = -1;
            }
            else {
                graph[i][j] = 0;
            }
        }
    }
};

// Drawing of the tile map and the walls
var displayTilemap = function() {
    fill(122, 10, 38);
    noStroke();
    for (var i =0; i<walls.length; i++) {
        rect(walls[i].x, walls[i].y, 20, 20);
    }
};

// detection of character and walls
characterObj.prototype.collide = function() {
    var hit = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x, walls[i].y) < 15) {
            hit = 1;   
        }
    }    
    
    return hit;
};

// moving the character using the arrows
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

// halt state function
var haltState = function() {
    this.angle = 0;
};

// turn state function
var turnState = function() {
    this.angle = 0;
    this.angleDir = 0;
    this.vec = new PVector(0,0);
};

// chase state function
var chaseState = function() {
    this.step = new PVector(0,0);
};

// Initialization of the enemy object
var enemyObj = function(x, y) {
    this.position = new PVector(x, y);
    this.state = [new haltState(), new turnState(), new chaseState()];
    this.currState = 0;
    this.angle = 0;
    this.whisker1 = new PVector(0, 0);
    this.whisker2 = new PVector(0, 0);
};

// initialization of the target of the NPCs
var targetObj = function(x, y) {
    this.x = x;
    this.y = y;
};

var enemy = new enemyObj(200, 100);
var enemy2 = new enemyObj(350, 160);
var target = new targetObj(0, 0);
var targetPos = new targetObj(0, 0);
var finalDest = new targetObj(0, 0);

// Function of the change state for the NPCs
enemyObj.prototype.changeState = function(x) {
    this.currState = x;
};

// execution of the halt state
haltState.prototype.execute = function(me) {
    
    if (dist(me.position.x, me.position.y, target.x, target.y) < 5) {
        me.changeState(1);
    }
};

// execution of the turn state
turnState.prototype.execute = function(me) {
    this.vec.set(target.x - me.position.x, target.y - me.position.y);
    this.angle = this.vec.heading();
    var angleDiff = abs(this.angle - me.angle);
    if (angleDiff > 0.0349066) {
        if (this.angle > me.angle) {
            this.angleDir = 0.0174533;
        }
        else {
            this.angleDir = -0.0174533;
        }
        if (angleDiff > 3.14159) {
            this.angleDir = -this.angleDir;
        }
        
        me.angle += this.angleDir;
        if (me.angle > 3.14159) {
            me.angle = -3.12414;
        }
        else if (me.angle < -3.14159) {
            me.angle = 3.12414;
        }
    }
    else {
        me.changeState(2);
    }
};

// finding the intersections for the NPCs
var findIntersection = function(p) {
    var distance = 0;
    
    for (var i=0; i<walls.length; i++) {
        var d = dist(p.x, p.y, walls[i].x+10, walls[i].y+10);
        if (d < 20) {
            distance += d;
        }
    }
    
    if (distance === 0) {
        distance = 100000;
    }
    
    return(distance);
};

// detecting if the NPCs collide with walls
chaseState.prototype.collideWall = function(me) {
    var collide = 0;
    this.step.set(target.x - me.position.x, target.y - me.position.y);
    this.step.normalize();
    this.step.mult(15);
    var ahead = PVector.add(me.position, this.step);
    for (var i=0; i<walls.length; i++) {
        if (dist(ahead.x, ahead.y, walls[i].x+10, walls[i].y+10) < 20) {
            collide = 1;
            
            me.whisker1.set(this.step.x, this.step.y);
            me.whisker2.set(this.step.x, this.step.y);
            me.whisker1.rotate(0.785398);
            me.whisker2.rotate(-0.785398);
            me.whisker1.add(me.position);
            me.whisker2.add(me.position);
            var dist1 = findIntersection(me.whisker1);
            var dist2 = findIntersection(me.whisker2);
            
            if (dist1 > dist2) {
                target.x = me.whisker1.x;
                target.y = me.whisker1.y;
            }
            else {
                target.x = me.whisker2.x;
                target.y = me.whisker2.y;
            }
        }
    }
    
    return(collide);
};

// execution of the chase state
chaseState.prototype.execute = function(me) {
    if (this.collideWall(me) === 1) {
        me.changeState(1);
    }
    else if (dist(target.x, target.y, me.position.x, me.position.y) > 2) {
        this.step.set(target.x - me.position.x, target.y - me.position.y);
        this.step.normalize();
        me.position.add(this.step);
    }
    else {
        if ((finalDest.x === target.x) && (finalDest.y === target.y)) {
            me.changeState(0);
        }
        else {
            pathLen--;
            if (pathLen > 0) {
                target.x = path[pathLen].x;
                target.y = path[pathLen].y;
            }
            else {
                target.x = finalDest.x;
                target.y = finalDest.y;
            }
            me.changeState(1);
        }
    }
};

// initializing of the graph for the A* search
var initGraph = function(x, y) {
    for (var i = 0; i< 20; i++) {
        for (var j = 0; j<20; j++) {
            if (graph[i][j] > 0) {
                graph[i][j] = 0;
            }
            inq[i][j] = 0;
            cost[i][j] = 0;
        }
    }
    
    graph[x][y] = 1;
};

// the A* search
var findAStarPath = function(x, y) {
    var i, j, a, b;
    qLen = 0;
    graph[x][y] = 1;
    inq[x][y] = 1;
    q[qLen].set(x, y);
    q[qLen].fcost = 0;
    qLen++;
    pathLen = 0;
    qStart = 0;
    
    var findMinInQ = function() {
        var min = q[qStart].fcost;
        var minIndex = qStart;
        for (var i = qStart+1; i<qLen; i++) {
            if (q[i].fcost < min) {
                min = q[i].qStart;
                minIndex = i;
            }
        }
        if (minIndex !== qStart) {  // swap
            var t1 = q[minIndex].x;
            var t2 = q[minIndex].y;
            var t3 = q[minIndex].fcost;
            q[minIndex].x = q[qStart].x;
            q[minIndex].y = q[qStart].y;
            q[minIndex].fcost = q[qStart].fcost;
            q[qStart].x = t1;
            q[qStart].y = t2;
            q[qStart].fcost = t3;
        }
    };
    
    var setComeFrom = function(a, b, i, j) {
        inq[a][b] = 1;
        comefrom[a][b].set(i, j);
        q[qLen].set(a, b);
        cost[a][b] = cost[i][j] + 10;
        q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10, finalDest.x, finalDest.y);
        qLen++;
    };
    
    while ((qStart < qLen) && (pathFound === 0)) {
        findMinInQ();
        i = q[qStart].x;
        j = q[qStart].y;
        graph[i][j] = 1;
        qStart++;
        
        if ((i === targetPos.x) && (j === targetPos.y)) {
            pathFound = 1;
            path[pathLen].set(j*20+10, i*20+10);
            pathLen++;
        }
        
        a = i+1;
        b = j;
        if ((a < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i-1;
        b = j;
        if ((a >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i;
        b = j+1;
        if ((b < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
        a = i;
        b = j-1;
        if ((b >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                setComeFrom(a, b, i, j);
            }
        }
    }   // while
    
    while ((i !== x) || (j !== y)) {
        a = comefrom[i][j].x;
        b = comefrom[i][j].y;
        path[pathLen].set(b*20 + 10, a*20+10);
        pathLen++;
        i = a;
        j = b;
    }
};


var gameOver = 0;

// check collision between the NPCs and the character
characterObj.prototype.checkCollision = function () {
        if (dist(this.x, this.y, enemy.position.x, enemy.position.y) < 20) {
                gameOver = 1;
        }
        if (dist(this.x, this.y, enemy2.position.x, enemy2.position.y) < 20) {
                gameOver = 1;
        }
    
};
var currFrame = 0;
var currFrame2 = 0;

// drawing of the cars
enemyObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    scale(0.7);
    fill(31, 79, 28);
    rect(-10, -10, 45, 30);
    fill(0,0,0);
    rect(15, -5, 10, 20);
    rect(-2, -6, 15, 3);
    rect(-2, 14, 15, 3);
    rect(-7, -2, 8, 15);
    popMatrix();
    if (currFrame < (frameCount - 500)) {
        currFrame = frameCount;
        target.x = character[0].x;
        target.y = character[0].y;
        finalDest.x = target.x;
        finalDest.y = target.y;
        targetPos.x = floor(finalDest.y / 20);
        targetPos.y = floor(finalDest.x / 20);
        var i = floor(enemy.position.y / 20);
        var j = floor(enemy.position.x / 20);
        initGraph(i, j);
        pathFound = 0;
        pathLen = 0;
        findAStarPath(i, j);
        pathLen--;
        target.x = path[pathLen].x;
        target.y = path[pathLen].y;
        if (enemy.currState !== 1) {
            enemy.changeState(1);
        }
    }
    if (currFrame2 < (frameCount - 1000)) {
        currFrame2 = frameCount;
        target.x = character[0].x;
        target.y = character[0].y;
        finalDest.x = target.x;
        finalDest.y = target.y;
        targetPos.x = floor(finalDest.y / 20);
        targetPos.y = floor(finalDest.x / 20);
        var i2 = floor(enemy2.position.y / 20);
        var j2 = floor(enemy2.position.x / 20);
        initGraph(i2, j2);
        pathFound = 0;
        pathLen = 0;
        findAStarPath(i2, j2);
        pathLen--;
        target.x = path[pathLen].x;
        target.y = path[pathLen].y;
        if (enemy2.currState !== 1) {
            enemy2.changeState(1);
        }
    }
};

// drawing of the whole game
var draw = function() {
    background(0, 0, 0);
    if(gameOver !== 1){
        if (initialized === 0) {
            initialized = 1;
            initializeTilemap();
        }
        displayTilemap();
        character[0].draw();
        character[0].checkCollision();
        enemy.draw();
        enemy2.draw();
        enemy.state[enemy.currState].execute(enemy);
        enemy2.state[enemy2.currState].execute(enemy2);
    }
};