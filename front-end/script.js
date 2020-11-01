document.addEventListener('DOMContentLoaded', () => {

    const screen = document.getElementById('screen');
    const context = screen.getContext('2d');

    screen.width = 700;
    screen.height = 500;

    const pencil = {
        active: false,
        moving: false,
        initalPos: null,
        currentPos: {x: 0, y: 0},
    }

    const drawLine = line => {
        context.beginPath();
        context.moveTo(line.initialPos.x, line.initialPos.y);
        context.lineTo(line.currentPos.x, line.currentPos.y);
        context.stroke();
    }

    const cicle = () => {
        if(pencil.active && pencil.moving && pencil.initalPos) {
            drawLine({
                currentPos: pencil.currentPos,
                initialPos: pencil.initalPos, 
            });

            pencil.moving = false;
        }

        pencil.initalPos = {x: pencil.currentPos.x, y: pencil.currentPos.y };

        setTimeout(cicle, 0);
    }

    screen.onmousedown = () => { pencil.active = true; }
    screen.onmouseup = () => { pencil.active = false; }
    screen.onmousemove = (event) => { 
        pencil.moving = true;
        pencil.currentPos.x = event.clientX;
        pencil.currentPos.y = event.clientY;
    }

    cicle();

});