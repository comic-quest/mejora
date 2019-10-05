

    if (document.readyState === "complete") { code(); }
    else{
    
        document.onload = code; 
    }
    







function code(){    
    console.log("code");
    var slide = document.getElementById("slide");

slide.style.position="relative";
slide.style.zIndex = "auto";

var command = document.getElementById("command")

var height = command.offsetHeight;



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



slide.appendChild(upScreen);



    
    }
    

