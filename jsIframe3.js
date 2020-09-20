var canvas = document.getElementById("canvas");

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();

}

//

var urlParameters = {};

const queryString = window.location.search;

if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    for (var pair of urlParams.entries()) {
        urlParameters[pair[0]] = pair[1]
    }

}

//data is stored in this format:
//
//-treeData(array)
//  -array (these are the collection of trees at that index based on the preset number)
//      -trees
//
//
//
//

if(!urlParameters.p){
   urlParameters.p = 0;
   }

var treeData = [ 
    [
        '{"upgradeLayerIndex":1,"name":"Locales","layers":[{"phase":0,"speed":0.001,"sprite":{"src":"fondos/mejoras-1-0.png","name":"1-0"},"offset":29},{"phase":0,"speed":0.001,"sprite":{"src":"fondos/mejoras-1-1.png","name":"1-1"},"offset":29},{"phase":0.7853981633974483,"speed":0.001,"sprite":{"src":"fondos/mejoras-1-2.png","name":"1-2"},"offset":29}],"upgrades":[{"x":141,"y":142,"width":66,"height":96,"name":"CQ","text":["¡Hola, mundo!"],"boxWidth":135.615234375,"boxHeight":100,"custom":true,"level":0,"maxLevel":1,"maxLogicLevel":1},{"x":237,"y":154,"width":41,"height":71,"name":"Resolución","text":["Aumenta el tamaño","de los paneles"],"boxWidth":200,"boxHeight":70,"custom":false,"level":0,"maxLevel":5,"maxLogicLevel":5},{"x":312,"y":103,"width":55,"height":50,"name":"Colores Primarios","text":["Añade el rojo, azul y","verde a los paneles"],"boxWidth":200,"boxHeight":70,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":377,"y":114,"width":33,"height":29,"name":"Colores secundarios","text":["Añade el resto de","colores a los paneles"],"boxWidth":200,"boxHeight":69,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":313,"y":225,"width":55,"height":50,"name":"GIF","text":["¡Paneles animados!"],"boxWidth":200,"boxHeight":50,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":396,"y":225,"width":55,"height":50,"name":"Flash","text":["¡Desbloquea los videos!"],"boxWidth":226,"boxHeight":64,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":92,"y":68,"width":55,"height":50,"name":"Fábrica de monedas","text":["Aumenta el número de","monedas por página"],"boxWidth":215,"boxHeight":75,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":32,"y":224,"width":33,"height":29,"name":"Descripciones","text":["Examina los objetos y obtén","una descripción detallada","de sus características"],"boxWidth":260,"boxHeight":100,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":22,"y":175,"width":33,"height":29,"name":"Diálogos","text":["Entabla conversación","con otros individuos"],"boxWidth":205,"boxHeight":75,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":187,"y":30,"width":55,"height":50,"name":"Intermedios","text":["Interrumpe la acción para","ir a otro punto de la historia"],"boxWidth":253,"boxHeight":100,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0}],"pageObjectives":[[0,1]]}'
    ,
        '{"upgradeLayerIndex":1,"name":"Locales","layers":[{"phase":0,"speed":0.001,"sprite":{"src":"fondos/mejoras-2-0.png","name":"2-0"},"offset":29},{"phase":0,"speed":0.001,"sprite":{"src":"fondos/mejoras-2-1.png","name":"2-1"},"offset":29},{"phase":0.7853981633974483,"speed":0.001,"sprite":{"src":"fondos/mejoras-2-2.png","name":"2-2"},"offset":29}],"upgrades":[{"x":141,"y":142,"width":66,"height":96,"name":"CQ","text":["¡Hola, mundo!"],"boxWidth":135.615234375,"boxHeight":100,"custom":true,"level":0,"maxLevel":1,"maxLogicLevel":1},{"x":237,"y":154,"width":41,"height":71,"name":"Resolución","text":["Aumenta el tamaño","de los paneles"],"boxWidth":200,"boxHeight":70,"custom":false,"level":0,"maxLevel":5,"maxLogicLevel":5},{"x":312,"y":103,"width":55,"height":50,"name":"Colores Primarios","text":["Añade el rojo, azul y","verde a los paneles"],"boxWidth":200,"boxHeight":70,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":377,"y":114,"width":33,"height":29,"name":"Colores secundarios","text":["Añade el resto de","colores a los paneles"],"boxWidth":200,"boxHeight":69,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":313,"y":225,"width":55,"height":50,"name":"GIF","text":["¡Paneles animados!"],"boxWidth":200,"boxHeight":50,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":396,"y":225,"width":55,"height":50,"name":"Flash","text":["¡Desbloquea los videos!"],"boxWidth":226,"boxHeight":64,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":92,"y":68,"width":55,"height":50,"name":"Fábrica de monedas","text":["Aumenta el número de","monedas por página"],"boxWidth":215,"boxHeight":75,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":32,"y":224,"width":33,"height":29,"name":"Descripciones","text":["Examina los objetos y obtén","una descripción detallada","de sus características"],"boxWidth":260,"boxHeight":100,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":22,"y":175,"width":33,"height":29,"name":"Diálogos","text":["Entabla conversación","con otros individuos"],"boxWidth":205,"boxHeight":75,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0},{"x":187,"y":30,"width":55,"height":50,"name":"Intermedios","text":["Interrumpe la acción para","ir a otro punto de la historia"],"boxWidth":253,"boxHeight":100,"custom":false,"level":0,"maxLevel":0,"maxLogicLevel":0}],"pageObjectives":[[0,1]]}'
    ]
    
    
]



//parse data
var preset = treeData[urlParameters.p] || treeData[0];

var trees = [];
for(var i = 0;i<preset.length;i++){
    
    trees[i] = TreeImporterExporter.ImportJSON(preset[i]);
    
}




var renderer = new Renderer({
    canvas: canvas,
    tree: trees[0],
    trees: trees,
    coins:urlParameters.c
});

var debug = false;
//console.log(TreeImporterExporter);

var controller = new Controller({
    canvas: canvas,
    callback: () => {
        var flag = false;
        if (debug) {
            if (controller.dragging) {
                controller.dragging = undefined
                flag = true;
            }
        }



        if (controller.selected) {

            if (controller.selected.constructor === Upgrade) {

                if (debug) {
                    if (!controller.dragging && !flag) {
                        controller.dragging = controller.selected;
                    }

                } else {
                    controller.selected.levelUp(renderer);
                    if (renderer.checkObjectives()) {
                        mspfaInterface.showLink();
                    }
                }



            } else {

                renderer.changeTree(controller.selected.index);

            }



        }


    }
});


var start = () => {
    renderer.calculateSize();
    if (renderer.checkObjectives()) {

        mspfaInterface.showLink();

    } else {

        mspfaInterface.hideLink();

    }
    loop();






    function loop() {

        requestAnimationFrame(loop);

        var button = renderer.mouseCheckButtons(controller.mouse.x, controller.mouse.y);

        if (button) {
            controller.selected = button;
        }

        var upg = renderer.tree.mouseCheck(controller.mouse.x, controller.mouse.y);

        renderer.render();

        if (upg) {

            renderer.renderUpgradeDescription(upg, controller.mouse.x, controller.mouse.y);
            controller.selected = upg;
        }

        if (button || upg) {
            controller.changeCursor("pointer");
        } else {
            controller.changeCursor("default");
        }

        renderer.renderButtons();



    }

}




var resources = new ResourceLoader(start);

for(var i = 0;i<trees.length;i++){
    resources.addFromTree(trees[i]);
}

resources.startLoad();
