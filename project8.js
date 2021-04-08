/*
    3D model of a chair, you can change your view by the mouse.
    You have to restart in khan acamedy so that it works fine.
    My model is inspired by the chair with a desk that you can find on campus.
    it is all done using cuboids, I didn't need any other shapes.
*/
angleMode = "radians";
// creating the cubiod, it has nodes and faces, not like we had in class.
// I used faces not edges because I needed to color it.
var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x,     y,     z], 
                 [x,     y,     z + d],
                 [x,     y + h, z], 
                 [x,     y + h, z + d],
                 [x + w, y,     z], 
                 [x + w, y,     z + d],
                 [x + w, y + h, z], 
                 [x + w, y + h, z + d]];
                 
    var faces= [[0, 1, 3, 2], 
                [1, 0, 4, 5],
                [0, 2, 6, 4], 
                [3, 1, 5, 7],
                [5, 4, 6, 7], 
                [2, 3, 7, 6]];
    return { 'nodes': nodes, 'faces': faces };
};
// these are the initilization of all the shapes for the chair
var shape1 = createCuboid(-120, -20, -20, 150, 150, 40);
var shape2 = createCuboid(-120, -20, -20, 30, 30, 150);
var shape3 = createCuboid(0, 10, -180,  30, 90, 40);
var shape4 = createCuboid(0, -20, -180, 30, 30, 310);
var shape5 = createCuboid(0, 100, -180, 30, 30, 310);
var shape6 = createCuboid(-120, 100, -20, 30, 30, 150);
var shape7 = createCuboid(0, 10, -100,  30, 90, 40);
var shape8 = createCuboid(-60, -20, -80, 30, 30, 100);
var shape9 = createCuboid(-60, -20, -80, -100, 30, 10);
var shape10 = createCuboid(-100, -20, -80, -100, 150, 10);

var shapes = [shape2,shape3, shape4, shape5, shape6, shape7, shape8, shape1, shape9, shape10];
// this is a basic function to subtract 2 vectors.
var subtractVectors = function(v1, v2){
    return [[v1[0] - v2[0]],
            [v1[1] - v2[1]],
            [v1[2] - v2[2]]];
};
// function to normalize the vector.
var normaliseVector = function(v) {
    var d = sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    return [v[0]/d, v[1]/d, v[2]/d];
};
// get the normal for the plane
var normalOfPlane = function(face, nodes) {
    var n1 = nodes[face[0]];
    var n2 = nodes[face[1]];
    var n3 = nodes[face[2]];
    var v1 = subtractVectors(n1, n2);
    var v2 = subtractVectors(n1, n3);
    var v3 = [[v1[1]*v2[2] - v1[2]*v2[1]],
              [v1[2]*v2[0] - v1[0]*v2[2]],
              [v1[0]*v2[1] - v1[1]*v2[0]]];
    return v3;
};
// dot product for 2 vectors
var dotProduct = function(v1, v2){
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
};
// translate the shapes to 3D
var translate3D = function(x, y, z, nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i] = [nodes[i][0] + x, nodes[i][1] + y, nodes[i][2] + z];
    }
};
// rotate in the Y direction
var rotateY3D = function(theta, nodes) {
    var ct = cos(theta);
    var st = sin(theta);
    var x, y, z;

    for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [ct*x + st*z, y, -st*x + ct*z];
    }
};
// rotation in X direction
var rotateX3D = function(theta, nodes){
    var x, y, z;
    
    for (var i = 0; i < nodes.length; i+=1) {
        x = nodes[i][0];
        y = nodes[i][1];
        z = nodes[i][2];
        nodes[i] = [x, cos(theta)*y - sin(theta)*z, sin(theta)*y + cos(theta)*z];
    }
};
var lightVector =[0.5, -0.2, -2];
lightVector = normaliseVector(lightVector);
var BLACK = color(0, 0, 0);
var faceColor = color(83, 250, 80);
var backgroundLight = 0.1;
// drawong the chair
var draw = function() {
    var i;
    var face, nodes, node1, node2;
    
    background(8, 4, 8);

    for (var o in shapes) {
        var obj = shapes[o];
        nodes = obj.nodes;
        
        if ('edges' in obj) {
            var edges = obj.edges;
        
            for (i = 0; i < edges.length; i+=1) {
                node1 = nodes[edges[i][0]];
                node2 = nodes[edges[i][1]];
                line(node1[0], node1[1], node2[0], node2[1]);
            }     
        }
        
        if ('faces' in obj) {
            for (var f in obj.faces) {
                face = obj.faces[f];
                var fnorm = normalOfPlane(face, nodes);
                
                if (fnorm[2] < 0) {
                    var l = max(0, dotProduct(lightVector, normaliseVector(fnorm)));
                    l = backgroundLight + (1 - backgroundLight) * l;
                    var c = lerpColor(BLACK, faceColor, l);
                    fill(c);
                      
                    if (face.length !== 3) {
                        quad(nodes[face[0]][0], nodes[face[0]][1],
                             nodes[face[1]][0], nodes[face[1]][1],
                             nodes[face[2]][0], nodes[face[2]][1],
                             nodes[face[3]][0], nodes[face[3]][1]);
                    }
                }
            }
        }
        
    }
};
// the mouse function
var mouseDragged = function() {
    var dx = (mouseX - pmouseX) * (PI / 180);
    var dy = (mouseY - pmouseY) * (PI / 180);
    
    for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
        var nodes = shapes[shapeNum].nodes;
        rotateY3D(dx, nodes);
        rotateX3D(dy, nodes);
    }
};

translate(200, 200);