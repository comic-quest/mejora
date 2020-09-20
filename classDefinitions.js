class ResourceLoader {

    constructor(callback) {
        this.__onLoad = this.__onLoad.bind(this);
        this.resourceCount = 0;
        this.resourcesLoaded = 0;
        this.__resourceArray = [];
        this.callback = callback;

        this.resources = {};
    }

    startLoad() {

        for (var i = 0; i < this.__resourceArray.length; i++) {

            var resource = this.__resourceArray[i];
            resource.content.onload = this.__onLoad;
            resource.content.src = resource.src;

        }

    } //

    __onLoad() {

        this.resourcesLoaded++;
        if (this.resourceCount === this.resourcesLoaded) {

            for (var i = 0; i < this.__resourceArray.length; i++) {
                this.__resourceArray[i].loaded = true;

            }
            this.callback();

        }

    } //
    addResource(res) { //Confío en que aquí solo van a haber clases que extienden Resource, no me traiciones Universe del futuro

        this.resourceCount++;
        this.__resourceArray.push(res);
        this.resources[res.name] = res;

    } //

    addFromTree(tree) {

        for (var i = 0; i < tree.layers.length; i++) {
            if (tree.layers[i].sprite) {

                this.addResource(tree.layers[i].sprite);

            }
        }

    }

}

class Resource {

    constructor(src, name) {
        this.src = src;
        this.loaded = false;
        this.name = name;

    }

}

class ImageResource extends Resource {

    constructor(src, name) {
        super(src, name);
        this.content = new Image();
    }
}

class Renderer {

    constructor(properties) {

        if (properties.canvas) {
            this.canvas = properties.canvas;
            this.canvas.width = properties.width || this.canvas.width;
            this.canvas.height = properties.height || this.canvas.height;
        } else {

            this.canvas = document.createElement("canvas");

            if (properties.container) {

                properties.container.appendChild(canvas);

            }

        }

        this.defaultFont = properties.defaultFont || "20px Arial";

        this.ctx = this.canvas.getContext("2d");

        this.tree = properties.tree;

        this.selectedUpgrade;

        this.trees = properties.trees || [];

        this.coins = properties.coins || 0;
        
        this.setupCustoms();
        
        

    }
    
    renderCoins(){
        
        var ctx = this.ctx;
        
        ctx.font = "40px Arial";
        
        var measure = ctx.measureText(""+this.coins);
        
        var w = measure.actualBoundingBoxRight+measure.actualBoundingBoxLeft;
        
        var h = measure.actualBoundingBoxDescent+measure.actualBoundingBoxAscent;
        
        var y = this.buttonObjects[0].height
        
        ctx.strokeStyle = "white";
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.rect(0,y,w+10,h+10);
                ctx.stroke();
                ctx.closePath();
        
        ctx.textAlign="center";
        
        ctx.fillStyle="white";
            ctx.fillText(""+this.coins,w/2+5,y+h/2+7.5); //hard-coding YAY!!
        
        
        
    }


    upgradeCQ(){
        for(var i = 0;i<this.trees.length;i++){
            if(this.trees[i].upgrades[0]){
               this.trees[i].upgrades[0].level++
               }
        }
    }
    
    checkObjectives() {


        for (var i = 0; i < this.trees.length; i++) {
            var tree = this.trees[i]
            for (var j = 0; j < tree.pageObjectives.length; j++) {
                var objective = tree.pageObjectives[j]
                if (tree.getUpgradeFromKey(objective[0]).level < objective[1]) {
                    return false;
                }
            }
        }
        
        return true;

    }

    changeTree(index) {

        this.tree = this.trees[index]
        this.calculateSize();

    }

    setCustomWidth(upg) {

        var ctx = this.ctx;
        ctx.textAlign = "left";
        ctx.font = upg.font || this.font;

        var m = ctx.measureText(upg.text[0]);

        var margin = 10;

        var w = m.width;

        upg.boxWidth = w * 2 + margin;

    }

    setupCustoms() {

        for (var i = 0; i < this.trees.length; i++) {
            for (var j = 0; j < this.trees[i].upgrades.length; j++) {
                var upg = this.trees[i].upgrades[j];
                if (upg.custom) {
                    this.setCustomWidth(upg);
                }
            }
        }

    }

    render() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.__renderTree();
        this.__renderBoundingBoxes();
        this.renderCoins();

    }

    __renderTree() {

        for (var i = 0; i < this.tree.layers.length; i++) {

            var lay = this.tree.layers[i];

            this.ctx.drawImage(lay.sprite.content, 0, lay.getPosition());

        }

    }

    __renderBoundingBoxes() {

        for (var i = 0; i < this.tree.upgrades.length; i++) {

            var upg = this.tree.upgrades[i];

            if (upg.level === 0) {
                this.ctx.globalCompositeOperation = "multiply";

                this.ctx.fillStyle = "#555555";

                this.ctx.fillRect(upg.x, upg.y + this.tree.upgradeOffset, upg.width, upg.height);

                this.ctx.globalCompositeOperation = "source-over";
            } else if (upg.level === upg.maxLevel) {
                this.ctx.globalCompositeOperation = "multiply";

                this.ctx.fillStyle = "#AA0000";

                this.ctx.fillRect(upg.x, upg.y + this.tree.upgradeOffset, upg.width, upg.height);

                this.ctx.globalCompositeOperation = "source-over";
            }

            if (window.debug) {

                this.ctx.strokeStyle = "red";
                this.ctx.lineWidth = 2.5;
                this.ctx.beginPath();
                this.ctx.rect(upg.x, upg.y + this.tree.upgradeOffset, upg.width, upg.height);
                this.ctx.stroke();
                this.ctx.closePath();

            }



        }



    }

    calculateSize() {
        var maxW = 1;
        var maxH = 1;

        for (var i = 0; i < this.tree.layers.length; i++) {

            var layer = this.tree.layers[i];

            if (maxW < layer.sprite.content.width) {

                maxW = layer.sprite.content.width;

            }

            if (maxH < layer.sprite.content.height) {

                maxH = layer.sprite.content.height;

            }

        }

        if (maxW) {

            this.canvas.width = maxW;

        }
        if (maxH) {

            this.canvas.height = maxH;

        }

        mspfaInterface.resize(this.canvas.width, this.canvas.height);

    }

    renderButtons() {

        var buttons = this.buttonObjects;
        var ctx = this.ctx;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.canvas.width, buttons[0].height);

        for (var i = 0; i < buttons.length; i++) {

            ctx.strokeStyle = "white";

            ctx.lineWidth = 2;

            ctx.beginPath();

            ctx.rect(buttons[i].x, 0, buttons[i].width, 50);

            ctx.closePath();

            ctx.stroke();

            if (this.trees[buttons[i].index].name) {

                var text = this.trees[buttons[i].index].name;

                ctx.font = "24px Arial"

                ctx.fillStyle = "white";

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, buttons[i].x + buttons[i].width / 2, buttons[i].height / 2);

            }

        }

    }

    get buttonObjects() {

        var arr = [];

        for (var i = 0; i < this.trees.length; i++) {
            var res = {};
            res.width = this.canvas.width / this.trees.length;
            res.height = 50;
            res.x = i * res.width;
            res.y = 1;
            res.index = i;
            arr.push(res);
        }
        return arr;

    }

    mouseCheckButtons(mouseX, mouseY) {

        var buttons = this.buttonObjects;
        for (var i = 0; i < buttons.length; i++) {

            var x = buttons[i].x;
            var y = buttons[i].y
            var w = buttons[i].width;
            var h = buttons[i].height;


            if (mouseX > x) {
                if (mouseX < x + w) {
                    if (mouseY > y) {
                        if (mouseY < y + h) {
                            return buttons[i];
                        }
                        continue
                    }
                    continue
                }
                continue
            }

            //

        }


    }



    renderUpgradeDescription(upg, mouseX, mouseY) {

        //render box

        var offset = 15;

        var lineWidth = 2.5;

        var finalOffsetX = offset;

        var finalOffsetY = 0;

        //prevent text box from going outside the canvas (horizontally)

        if (mouseX + offset + upg.boxWidth > this.canvas.width) { //upgrade hits right border
            if (mouseX + upg.boxWidth <= this.canvas.width) { //upgrade doesn't hit the border if you remove the offset

                finalOffsetX = this.canvas.width - mouseX + upg.boxWidth //set offset to the maximum possible without hitting the border

            }

            finalOffsetX = -(offset + upg.boxWidth) //invert the offset so the right side is next to the mouse

        } //

        //same but vertically
        if (mouseY + upg.boxHeight > this.canvas.height) { //upgrade hits bottom border
            finalOffsetY = -(upg.boxHeight) //invert the offset so the bottom side is next to the mouse

        } //

        var finalX = mouseX + finalOffsetX;

        var finalY = mouseY + finalOffsetY;

        this.drawTextBox(finalX, finalY, upg.boxWidth, upg.boxHeight, lineWidth);

        this.drawUpgradeLevel(upg.level, upg.maxLevel, finalX, finalY);

        this.drawDescriptionText(upg, finalX, finalY, upg.boxWidth, upg.boxHeight, lineWidth);


    }

    drawUpgradeLevel(level, maxLevel, x, y) {

        var ctx = this.ctx;

        ctx.font = this.defaultFont;

        var height = 40;

        var text = level + "/" + maxLevel;

        var width = ctx.measureText(text).width * 2 + 5;

        ctx.fillStyle = "black";

        ctx.fillRect(x, y - height, width, height);

        ctx.strokeStyle = "white";

        ctx.lineWidth = 2.5; //??

        ctx.beginPath();

        ctx.rect(x, y - height, width, height);

        ctx.stroke();

        ctx.closePath();

        ctx.fillStyle = "white";

        ctx.textAlign = "middle";

        ctx.fillText(text, x + width / 2, y - height / 2);

    }

    drawTextBox(x, y, width, height, lineWidth) {

        var ctx = this.ctx;

        ctx.fillStyle = "black";

        ctx.fillRect(x, y, width, height);

        ctx.strokeStyle = "white";

        ctx.lineWidth = lineWidth; //??

        ctx.beginPath();

        ctx.rect(x, y, width, height);

        ctx.stroke();

        ctx.closePath();
    }
    drawDescriptionText(upg, x, y, width, height, offset) {

        var ctx = this.ctx;

        ctx.textAlign = "left";

        ctx.font = upg.font || this.defaultFont;

        var highestPoint = ctx.measureText(upg.name).actualBoundingBoxAscent;

        var padding = offset + 2;

        var spacing = 20;

        ctx.fillStyle = "red";

        ctx.fillText(upg.name, x + padding, y + highestPoint + padding);

        ctx.fillStyle = "white";

        for (var i = 0; i < upg.text.length; i++) {

            ctx.fillText(upg.text[i], x + padding, (y + highestPoint + padding) + (i + 1) * spacing);

        }





    }

}

class Upgrade {

    constructor(properties) {
        properties = properties || {};
        this.x = properties.x || 0;
        this.y = properties.y || 0;
        this.width = properties.width || 50;
        this.height = properties.height || 50;
        this.name = properties.name || "name";
        this.boxWidth = properties.boxWidth || 200;
        this.boxHeight = properties.boxHeight || 100;
        this.showTextBox = properties.showTextBox || true;
        this.text = properties.text || ["this is a test", "second line", "third line i guess"];
        this.font = properties.font;
        this.custom = properties.custom || false;

        if (this.custom) {
            this.text = Upgrade.customTexts[Math.floor(Math.random() * Upgrade.customTexts.length)];
        }
        this.level = properties.level || 0;
        this.maxLevel = properties.maxLevel || 0;
        this.maxLogicLevel = properties.maxLogicLevel || 0;
    }

    levelUp(renderer) {

        if (this.level < this.maxLogicLevel) {
            if(this.custom===true){
               renderer.upgradeCQ();
               }else{
                this.level++
               }
        }

    }

}

Upgrade.customTexts = [
["CQ no fabrica para otras marcas"],
["Cambiando de artista", "desde 2017"],
["Hecho en el garaje", "de erizo"],
["Erizo no tiene garaje"],
["Universe approves"],
["The bite of 87"],
["all your FACM are", "belong to us"],
["¡Hola, mundo!"],
["SOLO"],
["Hola, Chess"],
["Lo importante no son los Favs"],
["Funniest shit i've ever seen"],
["La Fundación Áurea", "no hizo nada malo"],
["Como Speedwagon pero en alien"],
["The end of Comic Machine"],
["CQ 1.11: You are (not) a furry"],
["Prueba mi fursona"],
["¡Hey, CQ, Reader here!"],
["Atrapados en casa"],
["Él siempre ve"],
["No tenemos los permisos", "en orden"],
["Evadimos impuestos"]
];

Upgrade.debugIndex = 0;

class Tree {

    constructor(properties) {

        this.layers = properties.layers;
        if (properties.upgrades) {

            this.upgrades = properties.upgrades;

        } else {

            this.upgrades = [];

        }

        this.upgradeLayerIndex = properties.upgradeLayerIndex;
        this.name = properties.name;

        this.upgradeMap = {};

        for (var i = 0; i < this.upgrades.length; i++) {

            this.upgradeMap[this.upgrades[i].name] = this.upgrades[i];

        }

        this.pageObjectives = properties.pageObjectives || []; //array containing other arrays. each array contains an index or name (the upgrade) and a level



    }

    addObjective(key, level) {

        this.pageObjectives.push([key, level]);

    }

    getUpgradeFromKey(key) {

        if (typeof key === "number") {

            return this.upgrades[key];

        } else if (typeof key === "string") {

            return this.upgradeMap[key];

        } else {
            return undefined
        }

    }

    get upgradeOffset() {

        if (this.upgradeLayerIndex) {
            return this.layers[this.upgradeLayerIndex].getPosition();
        } else {
            return 0;
        }

    }

    mouseCheck(mouseX, mouseY) {

        for (var i = 0; i < this.upgrades.length; i++) {

            var x = this.upgrades[i].x;
            if (this.upgradeLayerIndex) {
                var y = this.upgrades[i].y + this.layers[this.upgradeLayerIndex].getPosition();
            } else {
                var y = this.upgrades[i].y;
            }
            var w = this.upgrades[i].width;
            var h = this.upgrades[i].height;

            // Le epic h4xx0r collision algorithm ( O(1) or some crazy shit like that, some 5head stuff )

            if (mouseX > x) {
                if (mouseX < x + w) {
                    if (mouseY > y) {
                        if (mouseY < y + h) {
                            return this.upgrades[i];
                        }
                        continue
                    }
                    continue
                }
                continue
            }

            //

        }


    }

}

class Layer {

    constructor(properties) {

        this.sprite = properties.sprite;
        if (properties.phase || properties.phase === 0) { //ugh

            this.phase = properties.phase

        } else {

            this.phase = 0;

        }
        this.offset = properties.offset || 0;

        this.speed = 0.001;

    }

    getPosition() {

        return Math.sin((Date.now() * this.speed) + this.phase) * 5 + this.offset

    }

}



///////

//exported data looks like:

//-root
//  -layers
//      -layer
//          -sprite
//              -src
//              -name
//          -speed
//          -phase
//  -upgrades
//      -upgrade
//          -x
//          -y
//          -width
//          -height
//  -upgradeLayerIndex

class TreeImporterExporter {}

TreeImporterExporter.ImportJSON = (str) => {

    var json = JSON.parse(str);

    var layers = [];

    var upgrades = [];

    for (var i = 0; i < json.layers.length; i++) {

        let layer = json.layers[i];
        let sprite = new ImageResource(layer.sprite.src, layer.sprite.name)
        layers.push(new Layer({
            speed: layer.speed,
            phase: layer.phase,
            sprite: sprite,
            offset: layer.offset
        }));

    }
    var upgImports = ["x", "y", "width", "height", "name", "text", "font", "boxWidth", "boxHeight", "custom", "level", "maxLevel", "maxLogicLevel"];
    for (var i = 0; i < json.upgrades.length; i++) {
        let upg = json.upgrades[i];
        let properties = {};
        for (var j = 0; j < upgImports.length; j++) {
            properties[upgImports[j]] = upg[upgImports[j]];
        }
        upgrades.push(new Upgrade(properties)); //yay

    }
    return new Tree({
        layers: layers,
        upgrades: upgrades,
        upgradeLayerIndex: json.upgradeLayerIndex,
        name: json.name,
        pageObjectives:json.pageObjectives
    });

}

TreeImporterExporter.ExportJSON = (obj) => {

    var temp = {};

    temp.upgradeLayerIndex = obj.upgradeLayerIndex;

    temp.name = obj.name;

    temp.layers = [];
    temp.upgrades = [];

    for (var i = 0; i < obj.layers.length; i++) {

        var layer = obj.layers[i]
        temp.layers.push({
            phase: layer.phase,
            speed: layer.speed,
            sprite: {
                src: layer.sprite.src,
                name: layer.sprite.name
            },
            offset: layer.offset
        });
    }

    var upgExports = ["x", "y", "width", "height", "name", "text", "font", "boxWidth", "boxHeight", "custom", "level", "maxLevel", "maxLogicLevel"];
    for (var i = 0; i < obj.upgrades.length; i++) {
        let upg = obj.upgrades[i];
        let newUpg = {};
        for (var j = 0; j < upgExports.length; j++) {
            newUpg[upgExports[j]] = upg[upgExports[j]];
        }
        temp.upgrades.push(newUpg);

    }
    
    temp.pageObjectives = obj.pageObjectives;

    return JSON.stringify(temp);
}

class Controller {

    constructor(properties) {
        this.__mousemove = this.__mousemove.bind(this);
        this.__mousedown = this.__mousedown.bind(this);
        this.__mouseup = this.__mouseup.bind(this);
        this.callback = properties.callback;
        this.context = properties.context;
        this.mouse = {
            x: 0,
            y: 0,
            movementX: 0,
            movementY: 0,
            heldPositionX: 0,
            heldPositionY: 0,
            button1: false
        }
        if (properties.canvas) {
            canvas.addEventListener("mousemove", this.__mousemove);
            canvas.addEventListener("mousedown", this.__mousedown);
            canvas.addEventListener("mouseup", this.__mouseup);
        } else {
            addEventListener("mousemove", this.__mousemove);
            addEventListener("mousedown", this.__mousedown);
            addEventListener("mouseup", this.__mouseup);
        }

        this.selected;

    }

    changeCursor(cursor) {
        document.body.style.cursor = cursor;
    }

    __mousemove(event) {

        var x = event.offsetX;
        var y = event.offsetY;


        this.mouse.movementX = x - this.mouse.x;
        this.mouse.movementY = y - this.mouse.y;

        this.mouse.x = x;
        this.mouse.y = y;

        if (this.dragging) {
            this.dragging.x = x;
            this.dragging.y = y;
        }



    }

    __mousedown(event) {
        this.mouse.heldPositionX = this.mouse.x;
        this.mouse.heldPositionY = this.mouse.y;
        this.mouse.button1 = true;
    }

    __mouseup(event) { /////////////////////////////////////////YANDEREDEV MOMENT; FIX OR SMTH IDK
        if (this.mouse.heldPositionX === this.mouse.x) {
            if (this.mouse.heldPositionY === this.mouse.y) {
                if (this.callback) {
                    if (this.context) {
                        this.callback.call(context);
                    } else {
                        this.callback();
                    }
                }

            }
        }
        this.mouse.button1 = false;
    }


}

class mspfaInterface {}


mspfaInterface.sendMessage = function (name, values) {
    var obj = values || {};
    obj.name = name;
    window.parent.postMessage(obj, "*")

}

mspfaInterface.hideLink = function () {

    this.sendMessage("hideNext");
}

mspfaInterface.showLink = function () {

    this.sendMessage("nextPage");

}

mspfaInterface.resize = function (w, h) {

        this.sendMessage("resizeIframe", {
            w: w,
            h: h
        });
    
}

