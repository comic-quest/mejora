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

var cqTexts = "CQ no fabrica para otras marcas\nCambiando de artista desde 2017\nHecho en el garaje de erizo\nErizo no tiene garaje\nUniverse approves\nThe bite of 87\nall your FACM are belong to us\n¡Hola, mundo!\nSOLO\nHola, Chess\nLo importante no son los Favs\nFunniest shit i've ever seen\nLa Fundación Áurea no hizo nada malo\nComo Speedwagon pero en alien\nThe end of Comic Machine\nCQ 1.11: You are (not) a furry\nPrueba mi fursona\n¡Hey, CQ, Reader here!\nAtrapados en casa\nÉl siempre ve\nNo tenemos los permisos en orden\nEvadimos impuestos\nArael no es canon aquí\nHow do you like that,Mr Obama?\nI pissed on the moon, you idiot!"

cqTexts = cqTexts.split("\n");


function pickRandomText(){
    
    return cqTexts[Math.floor(Math.random()*cqTexts.length)]
}



window.addEventListener("load",function(){
    
    var debug
    
    if(window.self !== window.top){
              window.parent.postMessage("hideNext","*")
               console.log("click!")
         debug = false;
              }else{
                  debug=false;
              }
    
    var urlParameters = {}

    const queryString = window.location.search;
    
    if(queryString){
       console.log("live")
        
        const urlParams = new URLSearchParams(queryString);
        
        for(var pair of urlParams.entries()) {
        urlParameters[pair[0]] = pair[1]
}
        
       }
    console.log(urlParameters)
    
   var coins;
    
    if(urlParameters.p){
       
        
        pageNumber = urlParameters.p
        
       }else{
           
         pageNumber=0;  
           
       }
    
    if(urlParameters.coins){
       coins=urlParameters.coins;
       }else{
           coins=0;
       }
    
    
    
    console.log(pageNumber)
    
    var canvas = document. getElementById("canvas");
    var ctx = canvas.getContext("2d");
    //ctx.font="20px Arial"
    
    var debugX;
    var debugY;
    
    var debugUpgradeArray = [];
    
    var debugUpgradeElement;
    
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
        
    
    function parseUpgrades(text){
        
        var data = text; //??? cosas supongo
        
        var arr = [];
        
        for(var i = 0;i<data.length;i++){
            
            if(data[i].text=="CQ"){
               
                data[i].text = "CQ \n "+pickRandomText();
                
               }
            
            if(!data[i].maxLevel){
               
                data[i].maxLevel = 1;
                
               }
            
            arr[i] = new Mejora(data[i].x,data[i].y,data[i].w,data[i].h,new TextBox(data[i].text,data[i].boxw,data[i].boxh,data[i].spacing,data[i].font,data[i].color),data[i].maxLevel)
            
        }
        
        return arr
        
    }
    
    
    function Mejora(x,y,w,h,box,maxLevel){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.level = 0;
        if(maxLevel){
            this.maxLevel=maxLevel;
        }else{
            this.maxLevel = 1;
        }

        this.click = function(){
           if(window.parent){
              window.parent.postMessage("nextPage","*")
               if(this.level<this.maxLevel){
                  this.level++
                   this.box.level = this.level;
                   if(this.level === this.maxLevel){
                      this.box.upgColor = "red";
                      }
                  }
               
               
               console.log("click!")
              }
           
       }
        if(box){
           this.box = box;
            this.box.parent = this;
            this.box.level = this.level;
            this.box.maxLevel = this.maxLevel;
           }else{
               this.box = new TextBox("Esto es un texto de prueba.",110,50,15,undefined,"red");
               this.box.parent = this;
               this.box.level = this.level;
               this.box.maxLevel = this.maxLevel;
           }
        
        this.drawDebug = function(){
            
            ctx.beginPath();
            ctx.rect(this.x,this.getPosition(),this.w,this.h);
            ctx.closePath();
            ctx.strokeStyle="red";
            ctx.stroke();
            
            
        }
        
        this.getPosition = function(){return this.y+this.parent.layers[1].getPosition();}
        
    }
    
    
    
    function addUpgrade(page,upg){
        
        page.upgrades.push(upg);
        upg.parent = page;
        updateUpgrades();
        
    }
    
    
    function TextBox(text,w,h,spacing,font,color,upgFont){
        this.textBoxOffset = 25;
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
        
        if(upgFont){
            
            this.upgradeFont = upgFont;
            
        }else{
            
            this.upgradeFont = "17px Courier New"
            
        }
        
        if(color){
           this.color = color;
           }else{
               this.color = "red";
           }
        
        this.upgColor = "white";
        
        this.computeLines = function(){
        
            ctx.font = this.font;
        
        var words = this.text.split(" ");
            
            console.log(words)
        
        var textBuffer = "";
        
        this.lines = [];
            
        this.textHeight = 0;
            
        var lastTest;
        
        for(var i = 0;i<words.length;i++){//////////////////////////
            
            var testLine;
            
            if(words[i] == "\n" || words[i]=="\\n"){
            
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
            if(testWidth.width>this.w-5){
                //no cabe
                
                var width = ctx.measureText(textBuffer)
                
                lastTest = width;
                
                this.lines.push({text:textBuffer,lineHeight:lineHeight,width:width.width});
                
                if(this.lines.length==1){
                       
                        this.textHeight = width.actualBoundingBoxAscent
                        
                        
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
            
                
            }
            
        }//////////////////////////
            
            
            
            
        this.textHeight += (this.spacing*this.lines.length)+lastTest.actualBoundingBoxDescent
            
        
        
        
        
        
        
        
    }
        this.computeLines();
        
        this.drawTextBox = function(x,y){
            
            ctx.beginPath();
        ctx.fillStyle="white";
        
        ctx.rect(x-3,y-3,this.w+3,Math.max(this.textHeight+3+this.textBoxOffset,this.h+3+this.textBoxOffset));
            ctx.closePath();
        ctx.fill();
            
                ctx.beginPath();
        ctx.fillStyle="black";        
        
        ctx.rect(x,y,this.w-3,Math.max(this.textHeight-3+this.textBoxOffset,this.h-3+this.textBoxOffset));
            ctx.closePath();
        ctx.fill();
            
            ctx.font = this.upgradeFont;
            
            ctx.fillStyle=this.upgColor;
            
            var levelString = this.level+"/"+this.maxLevel
            
            var levelHeight = ctx.measureText(levelString).actualBoundingBoxAscent
            
            ctx.fillText(levelString,x+3,y+3+levelHeight);
            
            for(var i = 0 ; i < this.lines.length ; i++){
                if(i==0){
                   ctx.fillStyle=this.color;
                   }else{
                       ctx.fillStyle="white";
                   }
                
                
                ctx.font = this.font;
                ctx.fillText(this.lines[i].text,x+3,(y+this.textBoxOffset+this.spacing*i)+this.lines[i].lineHeight+3); //quitar el +3 alaverga me da sida de verlo
                
                
            }
            console.log("bruh")
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
    
 
    
    mejoras = parseUpgrades([{"x":166,"y":102,"w":48,"h":59,"text":"Puzzles: \n A partir de ahora las salas de la mazmorra pueden contener rompecabezas","color":"red","boxw":150,"boxh":70,"spacing":25,"maxLevel":2},{"x":76,"y":132,"w":47,"h":48,"text":"Premios: \n añade recompensas al final de los combates","color":"red","boxw":200,"boxh":70,"spacing":25,"maxLevel":2},{"x":73,"y":214,"w":46,"h":45,"text":"Tienda: \n Añade salas con tienda a la mazmorra","color":"red","boxw":150,"boxh":70,"spacing":25},{"x":15,"y":170,"w":47,"h":46,"text":"Salas del tesoro: \n Añade salas con cofre al repertorio de la mazmorra","color":"red","boxw":250,"boxh":70,"spacing":25},{"x":19,"y":263,"w":47,"h":46,"text":"Objetos: \n Con esta mejora puedes encontrar diferentes objetos en la mazmorra y guardarlos en tu inventario","color":"red","boxw":200,"boxh":70,"spacing":25},{"x":57,"y":322,"w":46,"h":47,"text":"Nivel: \n Sube de nivel, adquiere habilidades y asesina a todo lo que se oponga a ti","color":"red","boxw":250,"boxh":70,"spacing":25},{"x":18,"y":379,"w":47,"h":46,"text":"Música de combate: \n Ahora sonará un tema de combate cuando estés enzarzado en una disputa","color":"red","boxw":280,"boxh":70,"spacing":15},{"x":167,"y":185,"w":48,"h":58,"text":"Salas: \n Añade variedad a las habitaciones de la mazmorra","color":"red","boxw":150,"boxh":70,"spacing":25,"maxLevel":3},{"x":75,"y":61,"w":48,"h":48,"text":"Pistas: \n ¿Atascado? esta mejora te otorga la posibilidad de comprar una pista por Comic Coins","color":"red","boxw":200,"boxh":70,"spacing":25},{"x":167,"y":265,"w":49,"h":58,"text":"Combate: \n Date de leches contra los enemigos gracias a esta mejora","color":"red","boxw":150,"boxh":70,"spacing":25},{"x":302,"y":167,"w":64,"h":94,"text":"CQ","color":"red","boxw":175,"boxh":5,"spacing":25}])
    

    upgradeArray.push([...mejoras])
    
    mejoras = parseUpgrades([{"x":312,"y":106,"w":54,"h":45,"text":"Colores primarios: \\n Añade el rojo, azul y verde a los paneles","color":"red","boxw":250,"boxh":72,"spacing":16},{"x":312,"y":224,"w":56,"h":51,"text":"¡Paneles animados!","color":"#ffffff","boxw":120,"boxh":40,"spacing":15},{"x":32,"y":225,"w":32,"h":28,"text":"Descripciones: \\n Examina los objetos y obtén una descripción detallada de sus características","color":"red","boxw":250,"boxh":115,"spacing":18},{"x":23,"y":175,"w":31,"h":30,"text":"Dialogos: \\n Entabla conversación con otros individuos","color":"red","boxw":160,"boxh":100,"spacing":18},{"x":92,"y":67,"w":54,"h":50,"text":"Fabrica de monedas: \\n Aumenta el número de monedas por página","color":"red","boxw":240,"boxh":85,"spacing":17,"maxLevel":5},{"x":187,"y":28,"w":55,"h":52,"text":"Intermedios: \\n Interrumpe la acción para ir a otro punto de la historia","color":"red","boxw":170,"boxh":120,"spacing":16},{"x":141,"y":143,"w":66,"h":93,"text":"CQ","color":"red","boxw":150,"boxh":90,"spacing":16},{"x":237,"y":152,"w":41,"h":71,"text":"Resolución: \\n Aumenta el tamaño de los paneles","color":"red","boxw":150,"boxh":80,"spacing":17,"maxLevel":3},{"x":396,"y":226,"w":54,"h":47,"text":"Flash: \\n ¡Desbloquea los videos!","color":"red","boxw":170,"boxh":60,"spacing":17},{"x":376,"y":113,"w":34,"h":28,"text":"Colores secundarios: \\n Añade el resto de colores a los paneles","color":"#ff0000","boxw":250,"boxh":80,"spacing":17}]);
    
    
    upgradeArray.push([...mejoras])
    
    var paginas = [];
    
    
    
    paginas.push(new Pagina(upgradeArray[0],[
    
        new Layer("fondos/mejoras-2-0.png",0,1,0,0),
        
        new Layer("fondos/mejoras-2-1.png",0,1,5,0),
        
        new Layer("fondos/mejoras-2-2.png",Math.PI/8,1,5,0)
        
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
    
    function updateUpgrades(){
        
        if(debug){
            
            document.body.removeChild(debugUpgradeElement);
            
            debugUpgradeElement = document.createElement("div");
            
            document.body.appendChild(debugUpgradeElement);
           
            for(var i = 0;i<currentPage.upgrades.length;i++){
                
               debugUpgradeElement.appendChild(new DebugElement(currentPage.upgrades[i]).elem,i);
                
            }
            
           }
        
    }
    
    
    function DebugElement(upg,index){
        
        this.elem = document.createElement("div");
        
        var elem = this.elem
        
        this.elem.className = "UpgElem";
        
        this.text = document.createElement("INPUT");
        
        this.text.setAttribute("type","text")
        
        this.text.className="elemValue"
        
        this.upg = upg;
        
        this.text.value = upg.box.text;
        
        this.text.onchange = function(){
            
            var value = this.value;
            
            console.log(value)
            
            upg.box.text = value;
            upg.box.computeLines();
            
            console.log(upg.box)
            
            
            
        }
        
        this.xy = document.createElement("INPUT")
        
        this.xy.setAttribute("type","text")
        
        this.xy.className="elemValue"
        
        this.xy.value = upg.x+","+upg.y;
        
        this.xy.onchange = function(){
            
            var value = this.value;
            
            var arr = value.split(",")
            
            upg.x = Number(arr[0]);
            
            upg.y = Number(arr[1]);
                     
            
            
        }
        
        this.wh = document.createElement("INPUT")
        
        this.wh.setAttribute("type","text")
        
        this.wh.className="elemValue"
        
        this.wh.value = upg.w+","+upg.h;
        
        this.wh.onchange = function(){
            
            var value = this.value;
            
            console.log(value)
            
            var arr = value.split(",")
            
            upg.w = Number(arr[0]);
            
            upg.h = Number(arr[1]);
                     
            
            
        }
        
        
        
        this.color = document.createElement("INPUT")
        
        this.color.setAttribute("type","color")
        
        this.color.className="elemValue"
        
        this.color.value = upg.box.color;
        
        this.color.onchange = function(){
            console.log(this.value)
            var value = this.value;
            
            console.log(value)
            
            upg.box.color = value;
                     
            
            
        }
        
        this.font = document.createElement("INPUT")
        
        this.font.setAttribute("type","text")
        
        this.font.className="elemValue"
        
        this.font.value = upg.box.font;
        
        this.font.onchange = function(){
            
            var value = this.value;
            
            console.log(value)
            
            upg.box.font = value;
                     
            
            
        }
        
        this.boxwh = document.createElement("INPUT")
        
        this.boxwh.setAttribute("type","text")
        
        this.boxwh.className="elemValue"
        
        this.boxwh.value = upg.box.w+","+upg.box.h;
        
        this.boxwh.onchange = function(){
            
            var value = this.value;
            
            console.log(value)
            
            var arr = value.split(",")
            
            upg.box.w = Number(arr[0]);
            
            upg.box.h = Number(arr[1])
                     
            console.log(upg)
            upg.box.computeLines()
            console.log(upg)
            
        }
        
        this.spacing = document.createElement("INPUT")
        
        this.spacing.setAttribute("type","text")
        
        this.spacing.className="elemValue"
        
        this.spacing.value = upg.box.spacing;
        
        this.spacing.onchange = function(){
            
            var value = Number(this.value);
            
            upg.box.spacing = value;
            upg.box.computeLines()
            
        }
        
        this.del = document.createElement("button")
        
        this.del.className = "elemValue"
        
        this.del.innerHTML="delete this"
        
        this.del.onclick = function(){
            
            currentPage.upgrades.splice(index,1)
            
            debugUpgradeElement.removeChild(elem)
            
        }
        
        this.sub = document.createElement("button")
        
        this.sub.className = "elemValue"
        
        this.sub.innerHTML="guardar"
        
        this.sub.onclick = function(){
            
            var arr = []
            
            for(var i = 0;i<currentPage.upgrades.length;i++){
                var u = currentPage.upgrades[i];
                
                var newText = u.box.text.replace(/'/,"\\'")
                    
                
               arr.push({x:u.x,y:u.y,w:u.w,h:u.h,text:newText,color:u.box.color,boxw:u.box.w,boxh:u.box.h,font:u.font,spacing:u.box.spacing})
                
            }
            
            document.write(JSON.stringify(arr))
            
        }
        
        
        
        //this.text.style="flex:1 0 auto;"
        
        this.elem.appendChild(this.text);
        
        this.elem.appendChild(this.xy);
        this.elem.appendChild(this.wh);
        this.elem.appendChild(this.color)
        this.elem.appendChild(this.font)
        this.elem.appendChild(this.boxwh)
        this.elem.appendChild(this.spacing)
        this.elem.appendChild(this.del)
        this.elem.appendChild(this.sub)
        
        
        
        
    }
    
        
    
        function init(){ ///////////////////////////////////////////   init
            
            requestAnimationFrame(draw);
            
        
            if(debug){
               
                if(window.self == window.top){
                   
                    debugUpgradeElement = document.createElement("div");
                    
                    document.body.appendChild(debugUpgradeElement);
                    
                    updateUpgrades();
                    
                }
               }
            
            function draw(){
                
                requestAnimationFrame(draw);
                
                changePage(pageNumber);
                
                        now = new Date();
                time = now.getTime()-startTime.getTime();
                
                
                
                ctx.fillStyle="black"
                ctx.fillRect(0,0,canvas.width,canvas.height);
                
                    currentPage.renderPage();
                
                
                ctx.strokeStyle="white";
                ctx.lineWidth=2.5;
                ctx.beginPath();
                
                ctx.rect(2.5,2.5,50,50);
                
                ctx.closePath();
                ctx.stroke();
                
                ctx.font = "38px Arial";
                
                ctx.fillStyle="white";
                
                var measure = ctx.measureText(coins+"");
                
                textPosX =  25 - measure.actualBoundingBoxRight/2
                
                var textPosY = 25 + (measure.actualBoundingBoxDescent + measure.actualBoundingBoxAscent)/2 //25 es la posicion del texto broh
                
                ctx.fillText(coins+"",textPosX,textPosY);
                
                for(var i = 0;i<currentPage.upgrades.length;i++){
                    
                    let upg = currentPage.upgrades[i]
                    
                    if(debug){
                    upg.drawDebug();
                    }
                    
                    

                    
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
                        
                       addUpgrade(currentPage,upg)
                        
                        
                       
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

