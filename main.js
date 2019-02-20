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

/* create canvas and append to dom */
function newFile(){
    clearFile();
    console.log(mousePosition.x, mousePosition.y)
    let canvas = document.createElement('canvas');
    canvas.classList.add('file__canvas');
    app.appendChild(canvas);
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

/* --- TOOLS --- */

/* brush */

