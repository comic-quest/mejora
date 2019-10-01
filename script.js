window.addEventListener("load",function(){
    
    var mouseOn;
    
    function checkCollision(upg,x,y){//-----

        if(upg.realX<=x){//
        if(upg.realX+upg.w>x){//-^ detección en la x
                   if(upg.realY<=y){
                   if(upg.realY+upg.h>y){
                       return true
                        }
                    }
            }
            
           }
            
        }//-----
    
    var camara = {
        x:0,
        y:0,
        
        dragging:false,
        movedWhileDragging:false
        /*
        draggingStart:{x:0, y:0},
        
        draggingEnd:{x:0,y:0}
    */
    }
   
    
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

    var mejoras = []
    
var images = 1;
var loadedimages=0;
    
 var mejora = new Image();

    mejora.onload = function(){
    
        loadedimages+=1;
        if(loadedimages===images){
           drawScene();
           initializeEvents();
            
           }
        
    }

    mejora.src = "mejora.jpg";
    
    new Upgrade(canvas.width/2,canvas.height/2,30,30,mejora);
    
     new Upgrade(400,200,40,40,mejora);

    function initializeEvents(){
        
         canvas.addEventListener("mousedown",function(e){
        
            camara.dragging=true;
             
             var x = e.offsetX-camara.x;
            var y = e.offsetY-camara.y;
             if(mouseOn){
                if(checkCollision(mouseOn,x,y)){
                  camara.clickedObject = mouseOn;
                //click
                    return
                }
                 
                }
             
        
        for(var i = 0;i<mejoras.length;i++){
            //check collision
            
            if(checkCollision(mejoras[i],x,y)){
                camara.clickedObject = mejoras[i];
                //click
                break;
                
                
               
               }
            
        }
             
             
        
        
        
    })
    
    canvas.addEventListener("mouseup",function(e){
        
        camara.dragging=false;
        
        if(camara.movedWhileDragging){
           
            canvas.style.cursor = "default";
            
           }else{
               if(camara.clickedObject){
                  camara.clickedObject.click();
                  }
               
               
           }
        camara.movedWhileDragging = false;
        
        
    })
        
        
    canvas.addEventListener("mousemove",function(e){
        
        var x = e.offsetX-camara.x;
            var y = e.offsetY-camara.y;
        var on = false;
        for(var i = 0;i<mejoras.length;i++){
            //check collision
            
            if(checkCollision(mejoras[i],x,y)){
                console.log("collision detected ",mejoras[i])
                mouseOn = mejoras[i]
                canvas.style.cursor = "pointer";
                on = true;
                break;
                
                
               
               }
            
        }
        
        if(!on){
           canvas.style.cursor = "default";
           }
        if(camara.dragging){
            camara.movedWhileDragging = true;
            camara.x+= e.movementX;
            camara.y+= e.movementY;
            canvas.style.cursor = "grabbing";
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
    
   function Upgrade(x,y,w,h,img,draw){
       
       this.x = x;
       this.y = y;
       this.w = w;
       this.h = h;
       this.img = img;
       this.realX = x-w/2;
       this.realY = y-h/2;
       this.click = function(){
           console.log("honk")
       }
       
       if(draw){
           this.draw = draw;
       }else{
           this.draw = function(){
               
               ctx.drawImage(img,0,0,w,h);
               
           }
       }
       mejoras.push(this)
   }
    
    
    
    

   

    function drawScene(){
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(-camara.x,-camara.y,canvas.width,canvas.height);
        ctx.lineWidth=4.5;
        ctx.strokeStyle="white";
        ctx.beginPath();
        ctx.moveTo(232,100);
        ctx.lineTo(262,100);
        ctx.lineTo(262,62);
        ctx.lineTo(300,62);
        ctx.stroke();
        
    for(var i = 0;i<mejoras.length;i++){
        console.log(mejoras[i])
        console.log(ctx.currentTransform)
        ctx.translate((mejoras[i].x-mejoras[i].w/2),(mejoras[i].y-mejoras[i].h/2));
        console.log(ctx.currentTransform,"2")
        mejoras[i].draw();
        
        ctx.translate(-(mejoras[i].x-mejoras[i].w/2),-(mejoras[i].y-mejoras[i].h/2));
        console.log(ctx)
        
        
    }
        
    }



    
}) //fin

