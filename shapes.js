//function a drawing appinu

function Shape(position) {
    this.position = position;
};

Shape.prototype.render = function () {};// Rectangle mun erfa Shape

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};

function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};
// Fyrir circle:
function Circle(position, width, height){
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};

function Pencil(postion) {
    Shape.call(this, postion);
    this.points = [];
}


////////////////Rectangle/////////////////////
//Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    //Render a rectangle
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
    console.log("hello");
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, 0,  Math.PI * 2, false);// var kominn hingad..
};
Circle.prototype.resize = function (x, y) {
    //this.width = x - this.position.x;
    //this.height = y - this.position.y;
    drawio.ctx.moveTo(x, y);
    drawio.ctx.stroke();
};

/////////////Circle END///////////////////////

///////////////////Pen////////////////////////
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function () {
    drawio.ctx.beginPath();
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

