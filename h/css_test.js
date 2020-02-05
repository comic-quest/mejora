var UI = document.createElement("div");

UI.style.position="fixed";
UI.style.top="0px";
UI.style.left="0px";
UI.style.backgroundColor="gray";



var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d")
canvas.style.position="absolute";
canvas.style.top="0px";
canvas.style.left="0px";
canvas.style.zIndex="-1"


function resize(){
    
    var width = document.body.offsetWidth;
var height = document.body.offsetHeight;
    
    UI.innerHTML = "width: "+width+",height: "+height
    
canvas.width=width;
canvas.height=height;
    canvas.style.width=width;
    canvas.style.height=height;
    render()
    
}

var resEvent = window.addEventListener("resize",resize)
var offCanvas = document.createElement("canvas")
var offCtx = offCanvas.getContext("2d")

offCanvas.width=32;
offCanvas.height=32;
offCtx.rect(0.5,0.5,offCanvas.width-0.5,offCanvas.height-0.5);
offCtx.lineWidth=0.5;
offCtx.stroke();
var pat = ctx.createPattern(offCanvas, "repeat");


function render(){
    ctx.rect(0, 0,canvas.width,canvas.height);
ctx.fillStyle = pat;
ctx.fill();
   
     
}
resize()

setInterval(()=>resize(),500)

document.body.appendChild(canvas)
document.body.appendChild(UI)