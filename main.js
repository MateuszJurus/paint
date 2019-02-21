const app = document.getElementById('file');
let canvasCount = 0;

/* --- TRACK MOUSE POSITION --- */
let mousePosition = {
    x: 0,
    y: 0
}
const domX = document.getElementById('mouseX');
const domY = document.getElementById('mouseY');

document.addEventListener('mousemove',(e)=>{
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    domX.innerText = e.clientX;
    domY.innerText = e.clientY;
})

/* DISPLAY NUMBER OF LAYERS */

const layerN = document.getElementById('layerCount');
function displayLayerN(){
    layerN.innerText = canvasCount;
}
displayLayerN();

/* --- CREATING NEW CANVAS --- */

class Canvas{
    constructor(cl,id){
        this.class = cl;
        this.id = id;
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('file__canvas');
        this.canvas.id = "base";
        this.canvas.setAttribute('width', '598px');
        this.canvas.setAttribute('height', '598px');
        app.appendChild(this.canvas);
        this.c = document.getElementById(this.id);
    }
    drawRectOutline(outline,sX,sY,eX,eY){
        if(sX > eX){
            outline.style.left = eX + 'px';
            outline.style.width = Math.abs(sX-eX) + 'px';
        }else{
            outline.style.left = sX + 'px';
            outline.style.width = Math.abs(sX-eX) + 'px';
        }
        if(sY > eY){
            outline.style.top = eY + 'px';
            outline.style.height = Math.abs(eY-sY) + 'px';
        }else{
            outline.style.top = sY + 'px';
            outline.style.height = Math.abs(sY-eY) + 'px';
        }
    }
    drawRect(sX,sY,eX,eY){
        let ctx = this.c.getContext('2d');
        ctx.fillRect(sX,sY,eX-sX,eY-sY);
        ctx.stroke();
    }
}

/* create canvas and append to dom */
function newFile(){
    clearFile();
    const x = new Canvas('file__canvas', 'base');
    let isPress = 0;
    let initX = 0;
    let initY = 0;
    let outline = document.createElement('span');
    outline.classList.add('rectangle__outline');
    x.c.addEventListener('mousedown', function(){
        isPress = 1;
        initX = mousePosition.x;
        initY = mousePosition.y;
        app.appendChild(outline)
    })
    x.c.addEventListener('mouseup', function(){
        isPress = 0;
    })
    x.c.addEventListener('mousemove', function(){
        //check if mouse button is pressed
        if(isPress != 0){
           x.drawRectOutline(outline,initX,initY,mousePosition.x,mousePosition.y) 
        }
    })
    
    canvasCount++;
    displayLayerN();
    console.log(isPress)
} 

/* remove previous canvas if there are any */
function clearFile(){
    let c = document.getElementsByTagName('canvas');
    if(c.length != 0){
        for(let i = 0; i < c.length; i++){
            c[i].parentNode.removeChild(c[i]);
        }
    }
    canvasCount = 0;
}

/* --- TOOLS --- */

/* rectangle */

class RectangleFeature {
    constructor(initX, initY, endX, endY, type, color){
        this.initX = initX;
        this.initY = initY;
        this.endX = endX;
        this.endY = endY;
        this.type = type;
        this.color = color;
    }
}

function drawRectangle(sX, sY, eX, eY, col, type){
    new RectangleFeature(sX, sY, eX, eY, col, type);
    let c = document.getElementById('base');
    let ctx = c.getContext('2d');
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.stroke();
}
