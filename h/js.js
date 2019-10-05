

    if (document.readyState === "complete") { code(); }
    else{
    
        window.addEventListener("load",code)
    }
    







function code(){    
    console.log("code");
    var slide = document.getElementById("slide");

slide.style.position="relative";
slide.style.zIndex = "auto";

var command = document.getElementById("command")

var height = command.offsetHeight;

var links = document.getElementById("links");

var upgrade = document.createElement("div");


upgrade.id = "upgrade";

upgrade.innerHTML="<p>></p>"

upgrade.style.height=height+"px";
    
upgrade.zIndex="-1";

slide.appendChild(upgrade);

var upScreen= document.createElement("div");
upScreen.id="upscreen";
    
var upFrame = document.createElement("iframe");
    
    upFrame.src = "https://comic-quest.github.io/mejora/";
    
    upFrame.width = 500;
    
    upFrame.height = 400;
    
    upFrame.id="upFrame";
    
    upScreen.appendChild(upFrame);
    



upgrade.appendChild(upScreen);
    
    links.style.visibility="hidden";

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (!event.origin.includes("https://comic-quest.github.io"))
    return;
    
    if(event.data==="upgraded"){
       links.style.visibility="visible"
       }

}

    
    }
    

