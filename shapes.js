//function a drawing appinu

function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () {};// Rectangle mun erfa Shape

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};

function Rectangle(position, width, height, strokeSize) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeSize = strokeSize;
};
// Fyrir circle:
function Circle(position, width, height, strokeSize){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeSize = strokeSize;
};
// Fyrir text:

function Pencil(postion, strokeSize) {
    Shape.call(this, postion);
    this.points = [];
    this.strokeSize = strokeSize;
}

function Text(position, width, height){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
}

////////////////Rectangle/////////////////////
//Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    //Render a rectangle
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.strokeSize;
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};
//////////////Rectangle END///////////////////

//////////////Circle//////////////////////////
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    //render a circle
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.strokeSize;
    drawio.ctx.arc(this.position.x, this.position.y, this.height, 0, Math.PI * 2);// var kominn hingad..
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};
Circle.prototype.resize = function (x, y) {
    this.width = Math.abs(x - this.position.x);
    this.height = Math.abs(y - this.position.y); 
    //drawio.ctx.moveTo(x, y);
};

/////////////Circle END///////////////////////

///////////////////Pen////////////////////////
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function () {
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.strokeSize;
    drawio.ctx.moveTo(this.position.x, this.position.y);

    for(i = 0; i < this.points.length; i++) {
        drawio.ctx.lineTo(this.points[i][0], this.points[i][1]);
    }

    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Pencil.prototype.addPoint = function(x, y) {
    var point = [];
    point.push(x);
    point.push(y);
    this.points.push(point);
}

///////////////////Pen END////////////////////

//////////////Text//////////////////////////
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Circle;

Text.prototype.render = function () {
    //render a circle
    console.log("hello");
    
};
Text.prototype.resize = function (x, y) {
    this.width = Math.abs(x - this.position.x);
    this.height = Math.abs(y - this.position.y); 
    //drawio.ctx.moveTo(x, y);
};

/////////////Text END///////////////////////