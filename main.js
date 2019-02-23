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
        this.canvas.setAttribute('width', '498px');
        this.canvas.setAttribute('height', '498px');
        app.appendChild(this.canvas);
        this.c = document.getElementById(this.id);
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
        let ctx = this.c.getContext('2d');
        let rectFill = document.getElementById('rectFill');
        if(rectFill.checked){
            ctx.fillStyle = color;
            ctx.fillRect(sX,sY,eX-sX,eY-sY);
            
        }else{
            ctx.strokeStyle = color;
            ctx.strokeRect(sX,sY,eX-sX,eY-sY);
            
        }        
    }
    drawBrush(x,y,w,color){
        let ctx = this.c.getContext('2d');
        ctx.lineWidth = w;
        ctx.stroke.style = color;
        ctx.stroke(x,y);
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
        app.removeChild(outline);
        x.drawRect(initX,initY,mousePosition.x,mousePosition.y,color)
    })
    x.c.addEventListener('mousemove', function(){
        //check if mouse button is pressed
        if(isPress != 0){
           x.drawRectOutline(outline,initX,initY,mousePosition.x,mousePosition.y,color) ;
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
