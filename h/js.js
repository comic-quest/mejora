
        
        console.log("?");


var variables;
function getVariables(){
    
    var elementvariables = document.getElementById("scriptvariables");
    
    if (!elementvariables) return {}
    
    
    
    
    
    var temp = elementvariables.innerHTML.split("<br>");
    
    temp = temp.join("");
    temp = temp.split("\n");
    
    
    
    
    
    var variables = {};
    
    
    
    for(var i = 0;i<temp.length;i++){
        
        if(temp[i]){
            
            if(temp[i].includes(":")){
               
                var name =temp[i].substring(0,temp[i].indexOf(":"));
        
            var value =temp[i].substring(temp[i].indexOf(":")+1);
        
            variables[name] = value;
                
               }
           
            
            
           }
        
        
        
        
    }
    
    return variables;
    
    
}


function code(){    // this will basically add an element to the side of the panel itself with an iframe inside. The iframe sends a message to activate the next page link.
    console.log("code");
    var slide = document.getElementById("slide");
    
    var links = document.getElementById("links").children[0]
    
    if(links){
        
        links = links.children;
       
       }else{
        links = undefined;
       }
    
    variables = getVariables();
    
    var callback = function(){
        
        console.log("reloaded");
        
        console.log(links[0])
        
    }
    if(links){
       for(var i = 0;i < links.length;i++){
        if(links[0]){
           links[i].addEventListener("click",callback);
           }
       }
    
        
        
    }
    
    
            slide.style.position="relative";
slide.style.zIndex = "auto";

var command = document.getElementById("command")



var links = document.getElementById("links");

var upgrade = document.createElement("div");


upgrade.id = "upgrade";

upgrade.innerHTML="<p>></p>"


    
upgrade.zIndex="-1";
    
var upgradePos;

upgrade.addEventListener("mouseover",function(){
    console.log(upgradePos)
    var height = document.documentElement.offsetHeight;
    var width = document.documentElement.offsetWidth;
    
    if(variables["upgradeMove"]){
        
        var upgradeMove = variables["upgradeMove"];
       
       }else{
           var upgradeMove = 433;
       }
    
    var newWidth = upgradePos+upgradeMove;
    console.log(newWidth,width)
    if(newWidth>width){
        var scaleFactor = width/newWidth;
        
        document.documentElement.style.transform="scale("+scaleFactor+","+scaleFactor+")"
        
       }
    
    
    
})
    
    upgrade.addEventListener("mouseleave",function(){

        document.documentElement.style.transform="scale(1,1)"
        
        
       
    
    
    
})

var upScreen= document.createElement("div");
upScreen.id="upscreen";
    
var upFrame = document.createElement("iframe");
    

    
    upFrame.src = "https://comic-quest.github.io/mejora?p="+(variables.pageNumber||0);
    
    //upFrame.width = 381;
    
    //upFrame.height = 485;
    
    upFrame.id="upFrame";
    
    
    function changeIframeSize(){
        
        upFrame.width = upFrame.contentWindow.document.body.scrollWidth;
        upFrame.height = upFrame.contentWindow.document.body.scrollHeight;
        
    }
    
    
    function setUpgrades(){
        
        console.log("upgrades")
        var height = command.offsetHeight;
        
        upgrade.style.height=height+"px";
        
        slide.appendChild(upgrade);
        
        upScreen.appendChild(upFrame);
    
        upgrade.appendChild(upScreen);
        
        upgradePos = upgrade.getBoundingClientRect().right;
        
    }
    
    function unSetUpgrades(){
        
    
        slide.removeChild(upgrade);
        
    }
console.log(links)
    if(variables.upgrades){
       console.log("hh?");
        
            setUpgrades();
       
       }

    
    //links.style.visibility="hidden";
    
    
    
    

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (!event.origin.includes("https://comic-quest.github.io"))
    return;
    
    if(event.data==="nextPage"){
        if(links){
            links.style.visibility="visible"
           }
      
       }
    
    if(event.data==="hideNext"){
        if(links){
            links.style.visibility="hidden"
           }
       
       }
    
    if(event.data === "resizeIframe"){
       
        changeIframeSize();
        
       }

}

    
    } //code

code();
    

        
        
    
    
    
    

