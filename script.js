if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}


window.addEventListener("load",function(){
    
    var startTime = new Date();
    
    var now = new Date();
    
    var time = 0;
 
    var mouseOn;
    
    var sin = 0;
    
    var moveMultiplier = 3;
    
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
                         w:50,
                         h:50,
                         img:mejora,
                         length:70,
                         lineWidth:2,
                        unlocked:true});
    
    pushUpgrade(CQ,new Upgrade({ //S
                         x:-100,
                         y:0,
                         w:40,
                         h:40,
                         img:mejora,
                        length:50,
                         lineWidth:2,
                            unlocked:true}),true)
    
        pushUpgrade(CQ,new Upgrade({ //P
                         x:-100,
                         y:-100,
                         w:40,
                         h:40,
                         img:mejora,
                        length:40,
                         lineWidth:2,
                            unlocked:true}),true)
    
    
    
    
    
    
        pushUpgrade(CQ,new Upgrade({ //COM
                         x:-100,
                         y:70,
                         w:40,
                         h:20,
                         img:mejora,
                        length:50,
                         lineWidth:2,
                            unlocked:true}),true)
    
            pushUpgrade(CQ.children[2],new Upgrade({ //CM
                         x:-200,
                         y:70,
                         w:40,
                         h:20,
                         img:mejora,
                        length:40,
                         lineWidth:2,
                            unlocked:true}),true)
    
    pushUpgrade(CQ.children[2],new Upgrade({ //OBJ
                         x:-200,
                         y:-10,
                         w:40,
                         h:20,
                         img:mejora,
                        length:40,
                         lineWidth:2,
                            unlocked:true}),true)
    
        pushUpgrade(CQ.children[2],new Upgrade({ //LV
                         x:-150,
                         y:25,
                         w:40,
                         h:20,
                         img:mejora,
                        length:40,
                         lineWidth:2,
                            unlocked:true}),true)
    
    pushUpgrade(CQ.children[0],new Upgrade({ //ST
                         x:-110,
                         y:-30,
                         w:40,
                         h:40,
                         img:mejora,
                        length:20,
                         lineWidth:2,
                            unlocked:true}),true)
    
        pushUpgrade(CQ.children[0],new Upgrade({ //T
                         x:-85,
                         y:10,
                         w:30,
                         h:30,
                         img:mejora,
                        length:20,
                         lineWidth:2,
                            unlocked:true}),true)
    
        pushUpgrade(CQ.children[1],new Upgrade({ //PN
                         x:-70,
                         y:40,
                         w:30,
                         h:30,
                         img:mejora,
                        length:20,
                         lineWidth:2,
                            unlocked:true}),true)
    
        pushUpgrade(CQ.children[1],new Upgrade({ //PS
                         x:-70,
                         y:-40,
                         w:30,
                         h:30,
                         img:mejora,
                        length:20,
                         lineWidth:2,
                            unlocked:true}),true)
    
  /*
    
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
                         lineWidth:2,
                            unlocked:true}),true)
    
          pushUpgrade(CQ,new Upgrade({x:-120,
                         y:0,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:2,
                            unlocked:true}),true)
    
              pushUpgrade(CQ,new Upgrade({x:0,
                         y:100,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:2,
                            unlocked:false}),true)
            pushUpgrade(CQ.children[CQ.children.length-1],new Upgrade({x:40,
                         y:50,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:2,
                            unlocked:true}),true)
    
    pushUpgrade(CQ.children[CQ.children.length-1],new Upgrade({x:-100,
                         y:50,
                         w:40,
                         h:40,
                         img:mejora,
                        length:0,
                         lineWidth:2,
                            unlocked:true}),true)
                
    
              */
   
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

        requestAnimationFrame(drawScene);
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
        
        
        var on = false;
        
        if(camara.dragging){
            camara.movedWhileDragging = true;
            camara.x+= e.movementX;
            camara.y+= e.movementY;
            canvas.style.cursor = "grabbing";
            ctx.translate(e.movementX,e.movementY)
            
            
       
        }else{
            
            var x = e.offsetX-camara.x;
            var y = e.offsetY-camara.y;
        
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
                if(canvas.style.cursor==="grabbing")return
                   
                   
           canvas.style.cursor = "default";
           }
            
        }
        
        
        
    })
        
        canvas.addEventListener("mouseleave",function(e){
       
            camara.dragging=false;
        
    })
        
        
    }


//testCtx.fillStyle="white";
//testCtx.fillRect(0,0,75,75);
    

    
    
    
    

   

    function drawScene(){
        requestAnimationFrame(drawScene);
        
        now = new Date();
        time = now.getTime()-startTime.getTime();
        sin = Math.sin(time/200);
        
        
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
            
                        var ulock;
            if(unlock){
               ulock=true;
                if(!upg.children[i].unlocked){
                   ulock=false;
                   }
               }else if(!unlock){
                        ulock=false
                        }
            
            ctx.lineWidth=upg.lineWidth;
            if(ulock){
               ctx.filter="brightness(100%)"
               }else{
                   ctx.filter="brightness(50%)" 
               }
            
            var lineX;
            var lineY;
            if(upg.x>upg.children[i].x){
               lineX = upg.x-upg.length;
                lineY = upg.y;
                
               }else if(upg.children[i].x===upg.x){
                        if(upg.children[i].y>upg.y){
                            lineX = upg.x;
                            lineY = upg.y+upg.length;
                            
                           }else{
                              
                               lineX = upg.x
                              lineY = upg.y-upg.length;
                           }
                        }else{
                   var lineX = upg.x+upg.length;
                            var lineY = upg.y;
               }
            
        
        ctx.strokeStyle="white";
        ctx.beginPath();
        ctx.moveTo(upg.x,upg.y);
        console.log(upg.x,upg.y,lineX,lineY)
        ctx.lineTo(lineX,lineY);
        
        ctx.lineWidth=upg.lineWidth;
        ctx.stroke();
            
            
        ctx.beginPath();
            ctx.moveTo(lineX,lineY)
            ctx.lineTo(lineX,upg.children[i].y);
            ctx.lineTo(upg.children[i].x,upg.children[i].y);
            ctx.stroke();
            

            
            
       recursiveDraw(upg.children[i],ulock);
        
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
        ctx.translate((upg.x-upg.w/2),((upg.y+sin*moveMultiplier)-upg.h/2));
                
        upg.draw();
        
        ctx.translate(-(upg.x-upg.w/2),-((upg.y+sin*moveMultiplier)-upg.h/2));
        
    }


    
}) //fin

