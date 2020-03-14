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

    var hrefIndex = document.location.href.indexOf("?p")
    
    var pageNumber
    
    if(hrefIndex== -1){
       
        pageNumber=0;
        
       }else{
           
           pageNumber = document.location.href.substring(document.location.href.indexOf("?p")+3)
           
       }
    
    
    
    console.log(pageNumber)
    
    var canvas = document. getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font="14px Arial"
    
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
        currentImg:0,
        mousePos:{
            x:0,
            y:0
        },
        offsetX:20,
        offsetY:0
    }
        
        var mouseOn;
    
    var startTime = new Date();
    
    var now = new Date();
    
    var time = 0;
        
    
    
    function Mejora(x,y,w,h,box){
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
        if(box){
           this.box = box;
            this.box.parent = this;
           }else{
               this.box = new TextBox("prueba 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9",50,50,200,500,30);
               this.box.parent = this;
           }
        
    }
    
    
    
    
    function TextBox(text,w,h,spacing){
        this.w = w;
        this.h = h;
        this.lines = [];
        this.text = text;
        this.spacing=spacing;
        
        this.computeLines = function(){
        
            
        
        var words = text.split(" ");
        
        var textBuffer = "";
        
        var lines = [];
        
        for(var i = 0;i<words.length;i++){//////////////////////////
            
            var testLine;
            if(textBuffer==""){
               
                testLine = textBuffer+words[i];
               
               }else{
                  testLine =  textBuffer+" "+words[i];
               }
            
            
            var testWidth = ctx.measureText(testLine);
            
            var lineHeight = testWidth.actualBoundingBoxAscent+testWidth.actualBoundingBoxDescent;
            
            if(i==1){
                
                

                }
            if(testWidth.width>w){
                //no cabe
                
                var width = ctx.measureText(textBuffer).width;
                
                    this.lines.push({text:textBuffer,lineHeight:lineHeight,width:width});
                    textBuffer = "";
                
               }else{
                //cabe
                    textBuffer = testLine;
                   if(i===words.length-1){
                       testWidth = ctx.measureText(textBuffer)
                      
                       this.lines.push({text:textBuffer,lineHeight:lineHeight,width:testWidth.width});
                       
                       
                       
                       
                      }
                   
               }
        }//////////////////////////
            
        
        
        
        
        
        
        
        
    }
        this.computeLines();
        
        this.drawTextBox = function(x,y){
            
            ctx.beginPath();
        ctx.fillStyle="white";
        
        ctx.rect(x-3,y-3,w+3,Math.max(this.lines.length*spacing+3,h+3));
            ctx.closePath();
        ctx.fill();
            
                ctx.beginPath();
        ctx.fillStyle="black";        
        
        ctx.rect(x,y,w-3,Math.max(this.lines.length*spacing-3,h-3));
            ctx.closePath();
        ctx.fill();
            for(var i = 0 ; i < this.lines.length ; i++){
                ctx.fillStyle="white";
                ctx.fillText(this.lines[i].text,x,(y+this.spacing*i)+this.lines[i].lineHeight);
                
                
            }
            
            /*
            ctx.strokeStyle="red";
            ctx.strokeRect(x-3,y-3,w+3,Math.max(this.lines.length*spacing+3,h+3));
            
            ctx.strokeStyle="blue";
            ctx.strokeRect(x,y,w-3,Math.max(this.lines.length*spacing-3,h-3));
            
            ctx.strokeStyle="green";
            ctx.strokeRect(x,y,this.lines[0].width,h);
            console.log(this.lines[0].width,ctx.measureText("probando 123"))
            */
            
            
            
        }
            
    }
    
    var upgradeArray = []
    
    var mejoras = [];
    
    
    mejoras.push(new Mejora(166,106,48,59,new TextBox("probando 123 123 123 123 123 123 123 123 123",150,70,15)))
    
    mejoras.push(new Mejora(122,112,0,0,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(76,137,47,48,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(73,218,46,45,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(15,175,47,46,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(19,266,47,46,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
        
    mejoras.push(new Mejora(57,325,46,47,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(18,383,47,46,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(167,189,48,58,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(75,65,48,48,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(167,269,49,58,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    mejoras.push(new Mejora(302,171,64,94,new TextBox("probando 123 123 123 123 123 123 123 123 123",100,70,15)))
    
    upgradeArray.push(mejoras)
    
    mejoras = [];
    
    
    mejoras = upgradeArray[0]
    
    
    var paginas = [];
    
    
    
    paginas.push(new Pagina(upgradeArray,[
    
        new Layer("fondos/mejoras-1-0.png",1,1,0,0),
        
        new Layer("fondos/mejoras-1-1.png",1,1,5,0),
        
        new Layer("fondos/mejoras-1-2.png",1,1,5,0)
        
    ]));
    
    
    
            
    function Layer(url,phase,speed,amplitude,height){
            
            this.url = url;
            this.phase = phase;
            this.speed = speed;
            this.amplitude = amplitude;
            this.height = height;
        
            this.image = new Image();
        
            this.image.onload=function(){
                
                canvas.width = this.image.width;
                canvas.height = this.image.height;
                
            }
            
            
            this.image.src = url;
            
            this.renderLayer = function(){
            
                var imageHeight = Math.sin((time+this.phase)*0.001*this.speed)*this.amplitude+height;
            
                ctx.drawImage(this.image,0,imageHeight);
                
                console.log(imageHeight)
            
            }
            
        }
    
    
    function Pagina(upgrades,layers){
        
        this.upgrades = upgrades;
        this.layers = layers;
        
        this.renderPage = function(){
            
            for(var i = 0;i < this.layers.length;i++){
                
                this.layers[i].renderLayer();
                
            }
            
        }
        
        
    }
    
    var currentPage;
    
    if(paginas[pageNumber]){
       
        currentPage = paginas[pageNumber];
        
       }else{
           
           currentPage = paginas[0]
           
       }
    
    
    
    
    
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
        
      
    
    
        
    
        function init(){ ///////////////////////////////////////////   init
            
            requestAnimationFrame(draw);
            
            
            
            function draw(){
                
                requestAnimationFrame(draw);
                
                        now = new Date();
                time = now.getTime()-startTime.getTime();
                
                
                
                ctx.fillStyle="black"
                ctx.fillRect(0,0,canvas.width,canvas.height);
                
                    currentPage.renderPage();
                
                if(mouseOn){
                    
                    if(mouseOn.box){
                        var textPos = {x:camara.x+camara.mousePos.x+camara.offsetX,y:camara.y+camara.mousePos.y+camara.offsetY}
                        
                       if(textPos.x+mouseOn.box.w>canvas.width){
                           
                           
                           textPos.x -= (mouseOn.box.w+camara.offsetX*2)
                          
                          }
                        
                         mouseOn.box.drawTextBox(textPos.x,textPos.y);
                        
                       }
                    
                   
                    
                }
                
                
                
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
        
        camara.mousePos = {x:e.offsetX,y:e.offsetY}
        
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
                
                mouseOn = undefined;
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
    
    //setTimeout(init,5000)
   init(); 
}) //fin

