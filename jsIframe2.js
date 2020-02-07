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
    
    if(window.parent){
              window.parent.postMessage("hideNext","*")
               console.log("click!")
              }

    
    
    var canvas = document. getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    var debugX;
    var debugY;
    
        var camara = {
        x:0,
        y:0,
        
        dragging:false,
        movedWhileDragging:false,
        /*
        draggingStart:{x:0, y:0},
        
        draggingEnd:{x:0,y:0}
    */
        currentImg:0
    }
        
        var mouseOn;
    
    var startTime = new Date();
    
    var now = new Date();
    
    var time = 0;
        
    var mejoras = [];
    
    function Mejora(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.click = function(){
           if(window.parent){
              window.parent.postMessage("nextPage","*")
               console.log("click!")
              }
           
       }
    }
    
    
    
    mejoras.push(new Mejora(166,106,48,59))
    
    mejoras.push(new Mejora(122,112,0,0))
    
    mejoras.push(new Mejora(76,137,47,48))
    
    mejoras.push(new Mejora(73,218,46,45))
    
    mejoras.push(new Mejora(15,175,47,46))
    
    mejoras.push(new Mejora(19,266,47,46))
        
    mejoras.push(new Mejora(57,325,46,47))
    
    mejoras.push(new Mejora(18,383,47,46))
    
    mejoras.push(new Mejora(167,189,48,58))
    
    mejoras.push(new Mejora(75,65,48,48))
    
    mejoras.push(new Mejora(167,269,49,58))
    
    mejoras.push(new Mejora(302,171,64,94))
    
    
    
        function checkCollision(upg,x,y){//-----

        if(upg.x<=x){//
        if(upg.x+upg.w>x){//-^ detección en la x
                   if(upg.y<=y){
                   if(upg.y+upg.h>y){
                       return true
                        }
                    }
            }
            
           }
            
        }//-----
        
      
    
        var imagenesFondo = [];
    
        var totalImages = 0;
    
        var loadedImages = 0;
    
        var ready = false;
    
    
    
        function loadImage(url,array){
            
            var img = new Image();
            
            img.onload = function(){
                
                if(loadedImages===totalImages){
                   if(ready){
                      console.log("yeehaw");
                      init();
                      }
                    
                    
                   }
               array.push(img) 
                console.log("yeet")
            }
            img.src = url;
            
        }
    
    loadImage("fondos/ciervait_0000_Capa-1.png",imagenesFondo);
    loadImage("fondos/ciervait_0001_Capa-2.png",imagenesFondo);
    loadImage("fondos/ciervait_0002_Capa-3.png",imagenesFondo);
    loadImage("fondos/ciervait_0003_Capa-4.png",imagenesFondo);
    
    ready = true;
    
    
        
    
        function init(){ ///////////////////////////////////////////   init
            
            requestAnimationFrame(draw);
            console.log(mejoras)
            
            
            function draw(){
                
                requestAnimationFrame(draw);
                
                        now = new Date();
                time = now.getTime()-startTime.getTime();
                
                var mod = time%(imagenesFondo.length*200)
                
                var imagen = imagenesFondo[Math.floor(mod/200)]
                
                ctx.fillStyle="black"
                ctx.fillRect(0,0,canvas.width,canvas.height);
                
                
                
                
                
                
                //console.log(imagen,camara.currentImg)
                ctx.drawImage(imagen,0,0,imagen.width,imagen.height)
                
            //ctx.strokeStyle="red";
            //ctx.rect(166,106,48,59);
            //ctx.stroke();
                /*
                for(var i = 0;i<mejoras.length;i++){
                    ctx.beginPath();
                    ctx.strokeStyle="red";
                    ctx.rect(mejoras[i].x,mejoras[i].y,mejoras[i].w,mejoras[i].h);
                    ctx.closePath();
                    ctx.stroke();
                    
                    
                    
                }
                */
                
            }
            
            
            
            canvas.addEventListener("mousedown",function(e){
        
            camara.dragging=true;
                
                debugX = e.offsetX;
                debugY = e.offsetY;
             
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
                    
                   /* var w = e.offsetX-debugX;
                    var h = e.offsetY-debugY;
                    
                    console.log(debugX,debugY,w,h);
                    
                    mejoras.push(new Mejora(debugX,debugY,w,h))
        */
        camara.dragging=false;
        
        if(camara.movedWhileDragging){
           
            canvas.style.cursor = "default";
            
           }else{
               if(camara.clickedObject){
                  camara.clickedObject.click();
                    camara.clickedObject = undefined;
                  }
               
               
           }
        camara.movedWhileDragging = false;
        
        
    })
        
        
    canvas.addEventListener("mousemove",function(e){
        
        
        var on = false;
        
        if(camara.dragging){
            /*
            camara.movedWhileDragging = true;
            camara.x+= e.movementX;
            camara.y+= e.movementY;
            canvas.style.cursor = "grabbing";
            ctx.translate(e.movementX,e.movementY)
            */
            
       
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
            
        } ////////////////////////// INIT
    
    
    function mouseToScene(x,y){
     
        var mat = ctx.getTransform();
        
        mat.invertSelf();
        
    }
    
    
    
}) //fin

