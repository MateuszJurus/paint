const app = document.getElementById('file');
let mousePosition = {
    x: 0,
    y: 0
}

/* --- TRACK MOUSE POSITION --- */

document.addEventListener('mousemove',(e)=>{
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY
})

/* --- CREATING NEW CANVAS --- */

/* create canvas and append to dom */
function newFile(){
    clearFile();
    console.log(mousePosition.x, mousePosition.y)
    let canvas = document.createElement('canvas');
    canvas.classList.add('file__canvas');
    app.appendChild(canvas)
} 

/* remove previous canvas if there are any */
function clearFile(){
    let canvasList = document.getElementsByTagName('canvas');
    console.log()
    if(canvasList.length != 0){
        for(let i = 0; i <= canvasList.length; i++){
            canvasList[i].parentNode.removeChild(canvasList[i]);
        }
    }
}



/* --- TOOLS --- */