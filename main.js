const app = document.getElementById('file');
let canvasCount = 0;
let currentTool = 1;
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

/* --- GET CURRENT COLOR --- */

const colorInput = document.getElementById('color');
let color = 'black';
colorInput.addEventListener('change', ()=>{
    color = colorInput.value;
})

/* --- TOOL SELECTION --- */

let tool = 1;
const toolInput = document.getElementById('toolInput');
toolInput.addEventListener('change', ()=>{
    let t = document.getElementsByClassName('option');
    for(let i = 0; i < t.length; i++){
        if(!t[i].classList.contains('option--hidden')){
            t[i].classList.add('option--hidden')
        }
    }
    tool = parseInt(toolInput.value);
    currentTool = tool;
    switch(tool){
        case 1:
            const brushSettings = document.getElementById('settingsBrush')
            brushSettings.classList.remove('option--hidden');
            break;  
        case 2:
            const lineSettings = document.getElementById('settingsLine')
            lineSettings.classList.remove('option--hidden');
            break;  
        case 3:
            const circleSettings = document.getElementById('settingsCircle')
            circleSettings.classList.remove('option--hidden');
            break;   
        case 4:
            const rectSettings = document.getElementById('settingsRectangle')
            rectSettings.classList.remove('option--hidden');
            break;         
    }
})

/* DISPLAY BRUSH WIDTH */

const currentWidth = document.getElementById('currentBrushWidth');
const widthInput = document.getElementById('brushWidth');
let brushWidth = 1;
currentWidth.innerText = widthInput.value;
widthInput.addEventListener('input', ()=>{
    currentWidth.innerText = widthInput.value;
    brushWidth = widthInput.value;
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
        this.tool = tool;
        this.class = cl;
        this.id = id;
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('file__canvas');
        this.canvas.id = "base";
        this.canvas.setAttribute('width', '498px');
        this.canvas.setAttribute('height', '498px');
        app.appendChild(this.canvas);
        this.c = document.getElementById(this.id);
        this.ctx = this.c.getContext('2d');
    }
    drawRectOutline(outline,sX,sY,eX,eY,color){
        outline.style.borderColor = color;
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
        
        let rectFill = document.getElementById('rectFill');
        if(rectFill.checked){
            this.ctx.fillStyle = color;
            this.ctx.fillRect(sX,sY,eX-sX,eY-sY);
            
        }else{
            this.ctx.strokeStyle = color;
            this.ctx.strokeRect(sX,sY,eX-sX,eY-sY);
            
        }        
    }
    drawBrush(sX,sY,w,color){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(sX, sY, w, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

/* create canvas and append to dom */
function newFile(){
    clearFile();
    const x = new Canvas('file__canvas', 'base');
    let isPress = 0;
    let initX = 0;
    let initY = 0;
    let w = 10;
    let outline = document.createElement('span');
    outline.classList.add('rectangle__outline');
    x.c.addEventListener('mousedown', function(){
        isPress = 1;
        initX = mousePosition.x;
        initY = mousePosition.y;
        switch(currentTool){
            case 1:
                x.drawBrush(initX,initY,brushWidth,color)
                break;
            case 4:
                app.appendChild(outline);   
                break;
        }
    })
    x.c.addEventListener('mouseup', function(){
        isPress = 0;
        switch(currentTool){
            case 4:
                app.removeChild(outline);
                x.drawRect(initX,initY,mousePosition.x,mousePosition.y,color);
                break;
        }
    })
    x.c.addEventListener('mousemove', function(){
        //check if mouse button is pressed
        if(isPress != 0){
           switch(currentTool){
                case 1:
                    initX = mousePosition.x;
                    initY = mousePosition.y;
                    x.drawBrush(initX,initY,brushWidth,color)
                    break;
               case 4:
                    x.drawRectOutline(outline,initX,initY,mousePosition.x,mousePosition.y,color);
                    break;
           }
        }
    })
    canvasCount++;
    displayLayerN();
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
