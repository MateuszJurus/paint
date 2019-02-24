const app = document.getElementById('file');
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

/* --- CREATING NEW CANVAS --- */

class Canvas{
    constructor(cl,id){
        this.tool = tool;
        this.class = cl;
        this.id = id;
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add(this.class);
        this.canvas.id = this.id;
        this.canvas.setAttribute('width', '698px');
        this.canvas.setAttribute('height', '498px');
        app.appendChild(this.canvas);
        this.c = document.getElementById(this.id);
        this.ctx = this.c.getContext('2d');
    }
    drawRectOutline(outline,sX,sY,eX,eY){
        outline.style.borderColor = color;
        if(rectFill.checked){
            outline.style.backgroundColor = color;
        }else{
            outline.style.backgroundColor = 'transparent';
        }
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
    drawCircleOutline(cOutline,sX,sY,eX,eY){
        cOutline.style.borderColor = color;
        if(circleFill.checked){
            cOutline.style.backgroundColor = color;
        }else{
            cOutline.style.backgroundColor = 'transparent';
        }
        if(sX > eX){
            cOutline.style.left = eX + 'px';
            cOutline.style.width = Math.abs(sX-eX) + 'px';
        }else{
            cOutline.style.left = sX + 'px';
            cOutline.style.width = Math.abs(sX-eX) + 'px';
        }
        if(sY > eY){
            cOutline.style.top = eY + 'px';
            cOutline.style.height = Math.abs(eY-sY) + 'px';
        }else{
            cOutline.style.top = sY + 'px';
            cOutline.style.height = Math.abs(sY-eY) + 'px';
        }
    }
    drawLineOutline(lineOutline,sX,sY,eX,eY,w){
        lineOutline.style.top = sY + 'px';
        lineOutline.style.left = sX + 'px';
        lineOutline.style.borderColor = color;
        lineOutline.style.backgroundColor = color;
        lineOutline.style.height = w + 'px';
        lineOutline.style.transform = 'rotate(' + (Math.atan2(eY - sY, eX - sX) * 180 / Math.PI) + 'deg)';
        lineOutline.style.width = Math.floor(Math.sqrt(Math.pow(sX-eX,2)+Math.pow(sY-eY,2))) + 'px';
    }
    drawLine(sX,sY,eX,eY){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(sX,sY);
        this.ctx.lineTo(eX,eY);
        this.ctx.closePath();   
        this.ctx.stroke();
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
    drawBrush(sX,sY){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(sX, sY, brushWidth, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    drawCircle(sX,sY,eX,eY){
        let circleFill = document.getElementById('circleFill');
        if(eX > sX && eY > sY){
            this.ctx.ellipse(sX+(Math.abs(sX-eX)/2),sY+(Math.abs(sY-eY)/2),(Math.abs(eX-sX))/2,(Math.abs(eY-sY))/2, 0, 0, Math.PI*2);
        }else if(eX > sX && eY < sY){
            this.ctx.ellipse(sX+(Math.abs(sX-eX)/2),sY-(Math.abs(sY-eY)/2),(Math.abs(eX-sX))/2,(Math.abs(eY-sY))/2, 0, 0, Math.PI*2);
        }else if(eX < sX && eY > sY){
            this.ctx.ellipse(sX-(Math.abs(sX-eX)/2),sY+(Math.abs(sY-eY)/2),(Math.abs(eX-sX))/2,(Math.abs(eY-sY))/2, 0, 0, Math.PI*2);
        }else{
            this.ctx.ellipse(sX-(Math.abs(sX-eX)/2),sY-(Math.abs(sY-eY)/2),(Math.abs(eX-sX))/2,(Math.abs(eY-sY))/2, 0, 0, Math.PI*2);
        }
        if(circleFill.checked){
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }else{
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }
}

/* create canvas and append to dom */

let layerList = new Array();
let layerLength = 0;
layerList[layerLength] = new Canvas('file__layer', 'canvas'+layerList.length);
function newFile(){
    clearFile();        
    const x = new Canvas('file__canvas', 'base');
    let isPress = 0;
    let initX = 0;
    let initY = 0;
    let outline = document.createElement('span');
    outline.classList.add('rectangle__outline');
    let cOutline = document.createElement('span');
    cOutline.classList.add('circle__outline');
    let lineOutline = document.createElement('span');
    lineOutline.classList.add('line__outline');
    x.c.addEventListener('mousedown', onPress);
    x.c.addEventListener('mouseup', onRelease);
    x.c.addEventListener('mousemove', onMove);
    let base = document.getElementById('base');
    let event = new Event('mouseup');
    base.dispatchEvent(event)
    /* ON MOUSE PRESS FUNCTION */
    function onPress(){
        isPress = 1;
            initX = mousePosition.x;
            initY = mousePosition.y;
            switch(currentTool){
                case 1:
                layerList[layerLength].drawBrush(initX,initY,color)
                    break;
                case 2:
                    app.appendChild(lineOutline);
                    break;
                case 3:
                    app.appendChild(cOutline);
                    break;
                case 4:
                    app.appendChild(outline);   
                    break;
            }
    }
    /* ON MOUSE MOVE FUNCTION*/
    function onMove(){
        //check if mouse button is pressed
        if(isPress != 0){
            switch(currentTool){
                 case 1:
                     initX = mousePosition.x;
                     initY = mousePosition.y;
                     layerList[layerLength].drawBrush(initX,initY,brushWidth)
                     break;
                 case 2:
                 layerList[layerLength].drawLineOutline(lineOutline,initX,initY,mousePosition.x,mousePosition.y)
                 case 3:
                 layerList[layerLength].drawCircleOutline(cOutline,initX,initY,mousePosition.x,mousePosition.y);
                     break;
                 case 4:
                 layerList[layerLength].drawRectOutline(outline,initX,initY,mousePosition.x,mousePosition.y);
                     break;
            }
         }
    }
    /* ON MOUSE RELEASE FUNCTION*/
    function onRelease(){
        isPress = 0;
        switch(currentTool){
            case 2:
                app.removeChild(lineOutline);
                layerList[layerLength].drawLine(initX,initY,mousePosition.x,mousePosition.y)
                layerList[layerLength].drawLine(0,0,0,0);
                break;
            case 3:
                app.removeChild(cOutline);
                layerList[layerLength].drawCircle(initX,initY,mousePosition.x,mousePosition.y);
                layerList[layerLength].drawCircleOutline(cOutline,0,0,0,0);
                break;
            case 4:
                layerList[layerLength].drawRect(initX,initY,mousePosition.x,mousePosition.y);
                layerList[layerLength].drawRectOutline(outline,0,0,0,0);
                break;
        };
        layerLength++;
        layerList[layerLength] = new Canvas('file__layer', 'canvas'+layerList.length);
        layerList[layerLength].c.addEventListener('mousedown', onPress);
        layerList[layerLength].c.addEventListener('mouseup', onRelease);
        layerList[layerLength].c.addEventListener('mousemove', onMove);
    }
} 

/* remove previous canvas if there are any */
function clearFile(){
    let c = document.getElementsByTagName('canvas');
    while(c.length != 0){
        for(let i = 0; i < c.length; i++){
            c[i].parentNode.removeChild(c[i]);
        }
    }
}


/* UNDO PREVIOUS ACTION */

function undo(){
    let cList = document.getElementsByTagName('canvas');
    let l = cList.length;
    if(cList[l-2]){
        cList[l-2].remove();
    }
}
