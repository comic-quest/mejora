window.onload=function(){
    
    var camara = {
        x:0,
        y:0,
        
        dragging:false,
        /*
        draggingStart:{x:0, y:0},
        
        draggingEnd:{x:0,y:0}
    */
    }
   
    
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);


    function initializeEvents(){
        
         canvas.addEventListener("mousedown",function(e){
        
        camara.dragging=true;
        
        
        
    })
    
    canvas.addEventListener("mouseup",function(e){
        
        camara.dragging=false;
        
        
        
    })
    canvas.addEventListener("mousemove",function(e){
        
        console.log(e.movementX,e.movementY);
        if(camara.dragging){
            
            camara.x+= e.movementX;
            camara.y+= e.movementY;
            
            ctx.translate(e.movementX,e.movementY)
            
            drawScene();
            
        }
        
        
        
    })
        
        canvas.addEventListener("mouseleave",function(e){
       
            camara.dragging=false;
        
    })
        
        
    }


//testCtx.fillStyle="white";
//testCtx.fillRect(0,0,75,75);
    
   
    

    var mejora = new Image();

    mejora.onload = function(){
    drawScene();
    initializeEvents();
    }

    mejora.src = "mejora.jpg";

    function drawScene(){
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(mejora,canvas.width/2-mejora.width/2+32,canvas.height/2-mejora.height/2+32,64,64); //todo esto para dibujarlo en el centro,yare yare
    
    ctx.drawImage(mejora,300,30,64,64)
    }



    
} //fin

