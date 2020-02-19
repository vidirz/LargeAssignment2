window.drawio = {
    shapes: [],
    undo: [],
    strokeSize: 2,
    color:"#000000",
    selectedShape: 'pencil', // by default
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),//halda utan um canvas contexid
    selectedElement: null,
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        PENCIL: 'pencil',
        TEXT: 'text',
        LINE: 'line',
    }
};

$(function () {
    // Document is loaded and parsed

    function drawCanvas() {
        
        for( var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
        if(drawio.selectedElement) {
            drawio.selectedElement.render();
        }
    };

    $('.icon').on('click', function () {
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
    });

    $('#save').on('click', function () {
        var drawingName = prompt("Save as:", "");

        if (drawingName === "") {
            alert("Name not valid");
            return;
          }
        if (localStorage.getItem(drawingName) === null) {
            localStorage.setItem(drawingName, drawio.canvas.toDataURL());
          }
        else {
            alert("That name is taken");
        }
    })

    $('#load').on('click', function () {
        var savefiles = [];
        for (var i = 0; i < localStorage.length; i++){
            savefiles.push(localStorage.key(i));
        }
        var drawingName = prompt("What drawing do you want to load?\n" + savefiles.join("\n"), "");
        if (drawingName === "") {
            alert("Name not valid");
            return;
          }
        drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
        var dataURL = localStorage.getItem(drawingName);
        var img = new Image;
        img.src = dataURL;
        img.onload = function () {
            drawio.ctx.drawImage(img, 0, 0);
        };
    })

    $('#clearSave').on('click', function () {
        var choice = confirm("Do you want to delete all saved drawings?");
        if (choice == true) {
            localStorage.clear();
        } 
    })

    $('#undo').on('click', function () {
        drawio.undo.push(drawio.shapes.pop());
        drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    })

    $('#redo').on('click', function () {
        drawio.shapes.push(drawio.undo.pop());
        drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
        drawCanvas();
    })

    $('#brushSize').on('input', function (inputEvent) {
        //console.log("this is input: ", inputEvent.target.value);
        drawio.strokeSize = inputEvent.target.value;
        $('#brushSize2').val(inputEvent.target.value);
    });
    $('#brushSize2').on('input', function (inputEvent) {
        console.log("this is input: ", inputEvent.target.value);
        drawio.strokeSize = inputEvent.target.value;
        $('#brushSize').val(inputEvent.target.value);
    });
    $('#textUser').on('input', function (inputEvent) {
        console.log("this is input: ", inputEvent.target.value);
        drawio.strokeSize = inputEvent.target.value;
        $('#textUser').val(inputEvent.target.value);
    });

    $('#color').on('input', function (inputEvent) {
        drawio.color = inputEvent.target.value;
    })

    //mousedown
    $('#my-canvas').on('mousedown', function (mouseEvent){
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({x: mouseEvent.offsetX, y: mouseEvent.offsetY} , 0, 0, drawio.strokeSize, drawio.color);
                break;
            // Hérna bæti ég circle inn
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0, drawio.strokeSize, drawio.color);
                break;
            case drawio.availableShapes.PENCIL:
                drawio.selectedElement = new Pencil({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, drawio.strokeSize, drawio.color)
                // add point with offset of 1 to draw a dot if just clicking
                drawio.selectedElement.addPoint(mouseEvent.offsetX + 1, mouseEvent.offsetY + 1); 
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
                break;
            // Line
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({x: mouseEvent.offsetX, y: mouseEvent.offsetY}, drawio.strokeSize, drawio.color);
                break;
        }


        drawCanvas();
    });
    //mousemove
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if(drawio.selectedElement) {
            drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
            switch (drawio.selectedShape) {
                case drawio.availableShapes.PENCIL:
                    drawio.selectedElement.addPoint(mouseEvent.offsetX, mouseEvent.offsetY);
                    break;
                default:
                    drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
                    break;
            }
            drawCanvas();
        }
    });

    //mouseup
    $('#my-canvas').on('mouseup', function () {
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
    });
    $('#my-canvas').on('onclick', function () {

    });
});