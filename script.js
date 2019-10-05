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
           
           initializeEvents();
            
           }
        
    }
    

    mejora.src = "mejora.jpg";
    
       function Upgrade(properties){//
       
       this.x = properties.x;
       this.y = properties.y;
       this.w = properties.w;
       this.h = properties.h;
       this.img = properties.img;
           this.lineWidth=properties.lineWidth;
           this.unlocked = properties.unlocked;
           this.length = properties.length;
       this.realX = this.x-this.w/2;
       this.realY = this.y-this.h/2;
       this.click = function(){
           if(window.parent){
              window.parent.postMessage("upgraded","*")
              }
           
       }
       
       if(properties.draw){
           this.draw = properties.draw;
       }else{
           this.draw = function(){
               
               ctx.drawImage(this.img,0,0,this.w,this.h);
               
           }
       }
       
       
       
           this.children=[]
       mejoras.push(this);
       
   }//
    
   var CQ = new Upgrade({x:canvas.width/2,
                         y:canvas.height/2,
                         w:80,
                         h:80,
                         img:mejora,
                         length:90,
                         lineWidth:4,
                        unlocked:true});
    
    pushUpgrade(CQ,new Upgrade({x:120,
                         y:70,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:3,
                            unlocked:false}),true)
    
  
    
    pushUpgrade(CQ,new Upgrade({x:-140,
                         y:100,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:3,
                            unlocked:false}),true)
    
      pushUpgrade(CQ,new Upgrade({x:-120,
                         y:-80,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:3,
                            unlocked:true}),true)
    
          pushUpgrade(CQ,new Upgrade({x:-120,
                         y:0,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:3,
                            unlocked:true}),true)
    
              
   
   function pushUpgrade(parent,child,relative){
       
       parent.children.push(child);
       if(relative){
          relativePos(parent,child,child.x,child.y) 
       }
       
   }
    function relativePos(parent,child,x,y){
        
        child.x = parent.x+x;
        child.y = parent.y+y;
        child.realX = child.x-child.w/2;
        child.realY = child.y-child.h/2;
    }

   
    

    function initializeEvents(){
        drawScene();
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
    

    
    
    
    

   

    function drawScene(){
        
    //ctx.clearRect(0,0,canvas.width,canvas.height);
        console.log("here")
        ctx.filter=""
    ctx.fillStyle="black";
    ctx.fillRect(-camara.x,-camara.y,canvas.width,canvas.height);

        
        recursiveDraw(CQ,true)
    
        
    }

    function recursiveDraw(upg,unlock){
        ctx.lineCap="square"
        
        
        
        for(var i = 0;i<upg.children.length;i++){
            
            ctx.lineWidth=upg.lineWidth;
            if(upg.children[i].unlocked){
               ctx.filter="brightness(100%)"
               }else{
                   ctx.filter="brightness(50%)" 
               }
            
            if(upg.x>=upg.children[i].x){
               var lineX = upg.x-upg.length;
               }else{
                   var lineX = upg.x+upg.length;
               }
            
        var lineY = upg.y;
        ctx.strokeStyle="white";
        ctx.beginPath();
        ctx.moveTo(upg.x,upg.y);
        
        ctx.lineTo(lineX,lineY);
        
        ctx.lineWidth=upg.lineWidth;
        ctx.stroke();
            
            
        ctx.beginPath();
            ctx.moveTo(lineX,lineY)
            ctx.lineTo(lineX,upg.children[i].y);
            ctx.lineTo(upg.children[i].x,upg.children[i].y);
            ctx.stroke();
       recursiveDraw(upg.children[i],upg.children[i].unlocked);
        
    }
   drawUpgrade(upg,unlock)
        
        
    }
    
    function drawUpgrade(upg,unlock){
        
        if(unlock===true){
           ctx.filter="opacity(100%)";
           }else{
                ctx.filter="brightness(50%)"    
           }
        console.log(ctx.filter,unlock)
        ctx.translate((upg.x-upg.w/2),(upg.y-upg.h/2));
                
        upg.draw();
        
        ctx.translate(-(upg.x-upg.w/2),-(upg.y-upg.h/2));
        
    }


    
}) //fin

