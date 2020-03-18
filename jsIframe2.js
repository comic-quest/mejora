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

var cqTexts = "CQ no fabrica para otras marcas\nCambiando de artista desde 2017\nHecho en el garaje de erizo\nErizo no tiene garaje\nUniverse approves\nThe bite of 87\nall your FACM are belong to us\n¡Hola, mundo!\nSOLO\nHola, Chess\nLo importante no son los Favs\nFunniest shit i've ever seen\nLa Fundación Áurea no hizo nada malo\nComo Speedwagon pero en alien\nThe end of Comic Machine\nCQ 1.11: You are (not) a furry\nPrueba mi fursona\n¡Hey, CQ, Reader here!\nAtrapados en casa\nÉl siempre ve\nNo tenemos los permisos en orden\nEvadimos impuestos\nArael no es canon aquí"

cqTexts = cqTexts.split("\n");

function pickRandomText(){
    
    return cqTexts[Math.floor(Math.random()*cqTexts.length)]
}



window.addEventListener("load",function(){
    
    var debug = true;
    
    if(window.parent){
              window.parent.postMessage("hideNext","*")
               console.log("click!")
              }

    var hrefIndex = document.location.href.indexOf("?p")
    
    var pageNumber
    
    if(hrefIndex== -1){
       
        pageNumber=1;
        
       }else{
           
           pageNumber = document.location.href.substring(document.location.href.indexOf("?p")+3)
           
       }
    
    
    
    console.log(pageNumber)
    
    var canvas = document. getElementById("canvas");
    var ctx = canvas.getContext("2d");
    //ctx.font="20px Arial"
    
    var debugX;
    var debugY;
    
    var loadingCount = 0;
    var loadedCount = 0;
    
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
               this.box = new TextBox("Esto es un texto de prueba.",110,50,15,undefined,"red");
               this.box.parent = this;
           }
        
        this.drawDebug = function(){
            
            ctx.beginPath();
            ctx.rect(this.x,this.getPosition(),this.w,this.h);
            ctx.closePath();
            ctx.strokeStyle="red";
            ctx.stroke();
            
            
        }
        
        this.getPosition = function(){return  this.y+this.parent.layers[i].getPosition();}
        
    }
    
    
    
    
    function TextBox(text,w,h,spacing,font,color){
        this.w = w;
        this.h = h;
        this.lines = [];
        this.text = text;
        this.spacing=spacing;
        this.textHeight = 0;
        if(font){
           this.font = font;
           }else{
               this.font = "20px Courier New"
           }
        
        if(color){
           this.color = color;
           }else{
               this.color = "red";
           }
        
        
        this.computeLines = function(){
        
            ctx.font = this.font;
        
        var words = text.split(" ");
        
        var textBuffer = "";
        
        var lines = [];
            
        this.textHeight = 0;
            
        var lastTest;
        
        for(var i = 0;i<words.length;i++){//////////////////////////
            
            var testLine;
            
            if(words[i] == "\n"){
            
                var testWidth = ctx.measureText(textBuffer)
                
                this.lines.push({text:textBuffer,lineHeight:testWidth.actualBoundingBoxAscent,width:testWidth.width});
                textBuffer="";
            }else{
                
                
            if(textBuffer==""){
               
                testLine = words[i];
               
               }else{
                  testLine =  textBuffer+" "+words[i];
               }
            
            
            
            
            var testWidth = ctx.measureText(testLine);
            
            var lineHeight = testWidth.actualBoundingBoxAscent;
            
            /*
            if(i==0){
               
                this.textHeight = testWidth.actualBoundingBoxAscent
                
               }else if(i===words.length-1){
                        
                   this.textHeight += (this.spacing*lines.length)+testWidth.actualBoundingBoxDescent
                   
                        
                        }
            */
            if(testWidth.width>w-5){
                //no cabe
                
                var width = ctx.measureText(textBuffer)
                
                lastTest = width;
                
                this.lines.push({text:textBuffer,lineHeight:lineHeight,width:width.width});
                
                if(this.lines.length==1){
                       console.log("hh1")
                        this.textHeight = width.actualBoundingBoxAscent
                        console.log(this.textHeight)
                        
                       }
                
                if(i===words.length-1){
                    var width2 = ctx.measureText(words[i])
                    
                    lastTest=width2;
                       
                       this.lines.push({text:words[i],lineHeight:width2.actualBoundingBoxAscent ,width:width2.width});
                       
                      }
                
                    
                
                    
                
                    textBuffer = words[i];
                
               }else{
                //cabe
                    textBuffer = testLine;
                   if(i===words.length-1){
                       
                      
                       this.lines.push({text:textBuffer,lineHeight:lineHeight,width:testWidth.width});
                       
                       if(this.lines.length==1){
                       
                        this.textHeight = testWidth.actualBoundingBoxAscent
                        
                       }
                       
                       
                       lastTest=testWidth
                       
                       
                       
                      }
                   
               }
            console.log(this.textHeight,this.spacing,this.lines,testWidth.actualBoundingBoxAscent,testWidth.actualBoundingBoxDescent)
                
            }
            
        }//////////////////////////
            
            
            
            
        this.textHeight += (this.spacing*this.lines.length)+lastTest.actualBoundingBoxDescent
            console.log(lastTest)
        
        
        
        
        
        
        
    }
        this.computeLines();
        
        this.drawTextBox = function(x,y){
            
            ctx.beginPath();
        ctx.fillStyle="white";
        
        ctx.rect(x-3,y-3,w+3,Math.max(this.textHeight+3,h+3));
            ctx.closePath();
        ctx.fill();
            
                ctx.beginPath();
        ctx.fillStyle="black";        
        
        ctx.rect(x,y,w-3,Math.max(this.textHeight-3,h-3));
            ctx.closePath();
        ctx.fill();
            for(var i = 0 ; i < this.lines.length ; i++){
                if(i==0){
                   ctx.fillStyle=this.color;
                   }else{
                       ctx.fillStyle="white";
                   }
                
                ctx.font = this.font;
                ctx.fillText(this.lines[i].text,x+3,(y+this.spacing*i)+this.lines[i].lineHeight+3); //quitar el +3 alaverga me da sida de verlo
                
                
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
    
    
    mejoras.push(new Mejora(166,106,48,59,new TextBox("Puzzles: \n A partir de ahora las salas de la mazmorra pueden contener rompecabezas",150,70,25))) //P
    
    mejoras.push(new Mejora(76,137,47,48,new TextBox("Premios: \n añade recompensas al final de los combates",200,70,25))) //PN
    
    mejoras.push(new Mejora(73,218,46,45,new TextBox("Tienda: \n Añade salas con tienda a la mazmorra",150,70,25))) //T 
    
    mejoras.push(new Mejora(15,175,47,46,new TextBox("Salas del tesoro: \n Añade salas con cofre al repertorio de la mazmorra",250,70,25))) //ST
    
    mejoras.push(new Mejora(19,266,47,46,new TextBox("Objetos: \n Con esta mejora puedes encontrar diferentes objetos en la mazmorra y guardarlos en tu inventario",200,70,25))) //OBJ 
      
    mejoras.push(new Mejora(57,325,46,47,new TextBox("Nivel: \n Sube de nivel, adquiere habilidades y asesina a todo lo que se oponga a ti",250,70,25))) //LV
    
    mejoras.push(new Mejora(18,383,47,46,new TextBox("Música de combate: \n Ahora sonará un tema de combate cuando estés enzarzado en una disputa",280,70,15,"16px Courier New"))) //CM
    
    mejoras.push(new Mejora(167,189,48,58,new TextBox("Salas: \n Añade variedad a las habitaciones de la mazmorra",150,70,25))) //S
    
    mejoras.push(new Mejora(75,65,48,48,new TextBox("Pistas: \n ¿Atascado? esta mejora te otorga la posibilidad de comprar una pista por Comic Coins",200 ,70,25))) //PS
    
    mejoras.push(new Mejora(167,269,49,58,new TextBox("Combate: \n Date de leches contra los enemigos gracias a esta mejora",150,70,25))) //COM
    
    mejoras.push(new Mejora(302,171,64,94,new TextBox("CQ: \n "+pickRandomText(),175,5,25))) //CQ
    
    upgradeArray.push([...mejoras])
    
    mejoras = [];
    
    mejoras.push(new Mejora(166,106,48,59,new TextBox("Puzzles: \n A partir de ahora las salas de la mazmorra pueden contener rompecabezas",150,70,25))) //P
    
    upgradeArray.push([...mejoras])
    
    var paginas = [];
    
    
    
    paginas.push(new Pagina(upgradeArray[0],[
    
        new Layer("fondos/mejoras-2-0.png",0,1,0,0),
        
        new Layer("fondos/mejoras-2-1.png",0,1,5,0),
        
        new Layer("fondos/mejoras-2-2.png",Math.PI/4,1,5,0)
        
    ]));
    
    paginas.push(new Pagina(upgradeArray[1],[
    
        new Layer("fondos/mejoras-1-0.png",0,1,0,0),
        
        new Layer("fondos/mejoras-1-1.png",0,1,5,0),
        
        new Layer("fondos/mejoras-1-2.png",Math.PI/4,1,5,0)
        
    ]));
    
    startLoad();
    
    console.log(loadingCount,loadedCount);
    
    function startLoad(){
        
        for(i=0;i<paginas.length;i++){
            
            for(j=0;j<paginas[i].layers.length;j++){
                
                var layer = paginas[i].layers[j]
                
                layer.image.src = layer.url;
            }
            
        }
        
    }
    
            
    function Layer(url,phase,speed,amplitude,height){
            
            this.url = url;
            this.phase = phase;
            this.speed = speed;
            this.amplitude = amplitude;
            this.height = height;
        
            this.image = new Image();
        loadingCount++
        
            this.image.onload=function(){
                

                loadedCount++
                
                if(loadedCount==loadingCount){
                   init();
                   }
                
                
            }
            
            
            
            //this.image.src = url;
            
            this.renderLayer = function(){
            
                
            
                ctx.drawImage(this.image,0,this.getPosition());
                
            
            }
            
            this.getPosition = function(){
                
                return Math.sin(time*0.001*this.speed+this.phase)*this.amplitude+height;
                
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
        
        for(var i = 0;i<this.upgrades.length;i++){
            
            this.upgrades[i].parent = this;
            
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
                   if(upg.getPosition()<=y){
                   if(upg.getPosition()+upg.h>y){
                       return true
                        }
                    }
            }
            
           }
            
        }//-----
        
      
    function changePage(n){
        
        pageNumber=n;
        
        currentPage = paginas[n];
        
        canvas.width = paginas[n].layers[0].image.width
        canvas.height = paginas[n].layers[0].image.height
        
    }
    
        
    
        function init(){ ///////////////////////////////////////////   init
            
            requestAnimationFrame(draw);
            
        
            
            function draw(){
                
                requestAnimationFrame(draw);
                
                changePage(pageNumber);
                
                        now = new Date();
                time = now.getTime()-startTime.getTime();
                
                
                
                ctx.fillStyle="black"
                ctx.fillRect(0,0,canvas.width,canvas.height);
                
                    currentPage.renderPage();
                
                for(var i = 0;i<currentPage.upgrades.length;i++){
                    
                    currentPage.upgrades[i].drawDebug();
                    
                }
                
                if(mouseOn){
                    
                    if(mouseOn.box){
                        var textPos = {x:camara.x+camara.mousePos.x+camara.offsetX,y:camara.y+camara.mousePos.y+camara.offsetY}
                        
                       if(textPos.x+mouseOn.box.w>canvas.width){
                           
                           
                           textPos.x -= (mouseOn.box.w+camara.offsetX*2)
                          
                          }
                        
                         mouseOn.box.drawTextBox(textPos.x,textPos.y);
                        
                       }
                    
                   
                    
                }
                
                
                
            
                
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
             
        
        for(var i = 0;i<paginas[pageNumber].upgrades.length;i++){
            //check collision
            
            if(checkCollision(paginas[pageNumber].upgrades[i],x,y)){
                camara.clickedObject = paginas[pageNumber].upgrades[i];
                //click
                break;
                
                
               
               }
            
        }
             
             
        
        
        
    })
            
            
            
                canvas.addEventListener("mouseup",function(e){
                    if(debug){
                        
                        var w = e.offsetX-debugX;
                    var h = e.offsetY-debugY;
                    
                        var upgPos = [debugX,debugY]
                        
                    if(w<0){
                       
                        upgPos[0]=e.offsetX
                        
                       }
                        
                        if(h<0){
                           
                            upgPos[1]=e.offsetY
                            
                           }
                        
                        w = Math.abs(w);
                        h = Math.abs(h);
                        
                        var upg = new Mejora(upgPos[0],upgPos[1],w,h)
                        
                        upg.parent = currentPage;
                    
                    currentPage.upgrades.push(upg)
                        
                        console.log(currentPage);
                       
                       }
                    
                    
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
        
        for(var i = 0;i<paginas[pageNumber].upgrades.length;i++){
            //check collision
            
            if(checkCollision(paginas[pageNumber].upgrades[i],x,y)){
                mouseOn = paginas[pageNumber].upgrades[i]
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
   //init(); 
}) //fin

