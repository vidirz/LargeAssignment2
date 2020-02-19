//function a drawing appinu

function Shape(position, strokeSize, color) {
    this.position = position;
    this.strokeSize = strokeSize;
    this.color = color;
};

Shape.prototype.render = function () {};// Rectangle mun erfa Shape

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () {};

Shape.prototype.hit = function () {};

function Rectangle(position, width, height, strokeSize, color) {
    Shape.call(this, position, strokeSize, color);
    this.width = width;
    this.height = height;
};
// Fyrir circle:
function Circle(position, width, height, strokeSize, color){
    Shape.call(this, position, strokeSize, color);
    this.width = width;
    this.height = height;
};
// Fyrir text:

function Pencil(position, strokeSize, color) {
    Shape.call(this, position, strokeSize, color);
    this.points = [];
}

function Text(position, width, height){
    Shape.call(this, position, color);
    this.words = [];
    this.width = width;
    this.height = height;
}

// Line
function Line(position, width, height, strokeSize, color){
    Shape.call(this, position, strokeSize, color);
    this.width = width;
    this.height = height;
};
function myInputFunction() {
    //var person = prompt("Please enter your name", "");
    //var person = $("#textUser").val();
    //console.log($("#textUser"));
    var person = $("#textUser").val();

    return (person);
}

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

Rectangle.prototype.hit = function (x, y) {

    // Find edge values
    if(this.width < 0) {
        this.left = this.position.x + this.width;
        this.right = this.position.x;
    }
    else {
        this.left = this.position.x;
        this.right = this.position.x + this.width;
    }

    if(this.height < 0) {
        this.bottom = this.position.y + this.height;
        this.top = this.position.y;
    }
    else {
        this.bottom = this.position.y;
        this.top = this.position.y + this.height;
    }

    // check if hit position is within the edges
    if(x > this.left && x < this.right) {
        if(y > this.bottom && y < this.top) {
            return true;
        }
    }

    return false;
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
    var newstuff = myInputFunction();
    drawio.ctx.strokeStyle = this.color; //virkar ekki
    drawio.ctx.fillText(newstuff, this.position.x, this.position.y, 140);
    drawio.selectedElement = false; //slekkur a loopunni
    this.words.push(newstuff);
    console.log("newstuff: ", newstuff);
    console.log("this.words: ", this.words);
    //console.log($("#textUser"))
    
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
