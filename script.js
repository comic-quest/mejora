var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle="black";
ctx.fillRect(0,0,400,200);

var mejora = new Image();

mejora.onload = function(){
    ctx.drawImage(mejora,canvas.width/2-mejora.width/2,canvas.height/2-mejora.height/2);
}

mejora.src = "mejora.jpg";