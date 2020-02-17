window.drawio = {
    shapes: [],
    selectedShape: 'rectangle', // by default
    ctx: document.getElementById('my-canvas').getContext('2d'),//halda utan um canvas contexid
    selectedElement: null,
    availableShapes: {
        RECTANGLE: 'rectangle'
    }
};

$(function () {
    // Document is loaded and parsed
    function drawCanvas() {
        if(drawio.selectedElement) {
            drawio.selectedElement.render();
        }
        for( var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    };
    $('.icon').on('click', function () {
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
    });
    //mousedown
    $('#my-canvas').on('mousedown', function (mouseEvent){
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({x: mouseEvent.offsetX, y: mouseEvent.offsetY} , 0, 0);
                break;
        }
    });
    //mousemove
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if(drawio.selectedElement) {
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            drawCanvas();
        }
    });
    //mouseup
});