//function a drawing appinu

function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () {};// Rectangle mun erfa Shape

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};

function Rectangle(position, width, height, strokeSize, color) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeSize = strokeSize;
    this.color = color;
};
// Fyrir circle:
function Circle(position, width, height, strokeSize, color){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeSize = strokeSize;
    this.color = color;
};
// Fyrir text:

function Pencil(postion, strokeSize, color) {
    Shape.call(this, postion);
    this.points = [];
    this.strokeSize = strokeSize;
    this.color = color;
}

function Text(position, width, height){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
}

// Line
function Line(position, width, height, strokeSize, color){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.strokeSize = strokeSize;
    this.color = color;
};

////////////////Rectangle/////////////////////
//Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    //Render a rectangle
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.strokeSize;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    drawio.ctx.closePath();
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
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.arc(this.position.x, this.position.y, this.height, 0, Math.PI * 2);// var kominn hingad..
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};
Circle.prototype.resize = function (x, y) {
    this.width = Math.abs(x-this.position.x);
    this.height = Math.abs(y-this.position.y);
    this.radius = Math.sqrt(Math.pow(this.width,2)+Math.pow(this.height,2)); 
};

/////////////Circle END///////////////////////

///////////////////Pen////////////////////////
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function () {
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.strokeSize;
    drawio.ctx.strokeStyle = this.color;
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
    //render a text
    //drawio.ctx.beginPath();
    //drawio.ctx.rect(this.position.x, this.position.y, this.width, this.height);
    //drawio.ctx.stroke();
    //drawio.ctx.closePath();
    drawio.ctx.font = '50px serif';
    drawio.ctx.strokeText('Hello world', this.position.x, this.position.y, 140);

    
};
Text.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y; 
    //drawio.ctx.moveTo(x, y);
};

/////////////Text END///////////////////////

////////////////Line/////////////////////
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
    //render a line
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.strokeSize;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.width, this.height);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Line.prototype.resize = function (x, y) {
    this.width = x;
    this.height = y;
};

////////////////Line END/////////////////////
