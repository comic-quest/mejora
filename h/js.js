//IM SORRY FOR THE SPAGUETTI CODE//





function code() { // this will basically add an element to the side of the panel itself with an iframe inside. The iframe sends a message to activate the next page link.
    //console.log("code");
    
    var variables;

function getVariables() {

    var elementvariables = document.getElementById("scriptvariables");

    if (!elementvariables) return {}




console.log(elementvariables.innerHTML)
    var temp = elementvariables.innerHTML.split("<br>");

    temp = temp.join("");
    temp = temp.split(";");
    
    
    console.log(temp)





    var variables = {};



    for (var i = 0; i < temp.length; i++) {

        if (temp[i]) {

            if (temp[i].includes(":")) {

                var name = temp[i].substring(0, temp[i].indexOf(":"));

                var value = temp[i].substring(temp[i].indexOf(":") + 1);

                variables[name] = value;

            }



        }




    }

    return variables;


}


    var slide = document.getElementById("slide");

    var links = document.getElementById("links").children[0]
    
    var startover,goback;

    if (links) {

        links = links.children;

    } else {
        links = undefined;
    }

    variables = getVariables();

    function callback () { //when a link that changes the page is clicked, reset the upgrades iframe and check variables again

       
        var temp = variables.upgrades;
        
        variables = getVariables();
        console.log(variables)
        if(temp){
           unSetUpgrades();
           }
        if(variables.upgrades){
            var preset,coins;
            preset = variables.preset || 0;
            coins = variables.coins || 0;
            console.log(preset,coins,variables)
           setUpgrades(preset,coins);
           }
        setLinkEvents(false)

    }

    function setLinkEvents(n) {
        var linkArray = [];
        var temp;
        links = document.getElementById("links").children[0]
        //console.log(links,links.children)
        if (links) {
            for (var i = 0; i < links.children.length; i++) {
                if (links.children[i]) {
                    //console.log("ATENCION ADFGDSFGHKIDSFH", links[i])
                    linkArray.push(links.children[i]);
                }
            }


        }
        
        if(!startover){
            
            temp = document.getElementById("startover")
            
        
        
        if (temp) {
            linkArray.push(temp);
        }
            startover = true
            
        }else{
            startover = false;
        }
        
        if(!goback){
           
        var temp1 = document.getElementById("goback");

        if (temp1) {
            linkArray.push(temp1);
        }
            goback = true;
        }else{
            
            goback = false;
            
        }
        if(n){
           var temp2 = document.getElementById("loadgame");
           }
        

        if (temp2) {
            linkArray.push(temp2);
        }
        
        for(var i = 0;i<linkArray.length;i++){
            console.log("link")
            linkArray[i].addEventListener("click",callback)
            
        }
           
           

        

    }

    setLinkEvents(true);







    slide.style.position = "relative";
    slide.style.zIndex = "auto";

    var command = document.getElementById("command")



    var links = document.getElementById("links");

    var upgrade = document.createElement("div");


    upgrade.id = "upgrade";

    upgrade.innerHTML = "<p>></p>"



    upgrade.zIndex = "-1";

    var upgradePos;


    var mouseOnIframe;
    var upgradesOpen = false;
    function enterTransition() { //move upgrade element into view
        console.log("start")
        mouseOnIframe = true;
        var height = document.documentElement.offsetHeight;
        var width = document.documentElement.offsetWidth;


        var upgradeMove = Number(upFrame.width);


        upgrade.style.right = (-upgradeMove-52) + "px";

        upScreen.style.height = upFrame.height + "px";

        var newWidth = upgradePos + upgradeMove;
        console.log(newWidth,width,upgradeMove,upgradePos)
        if (newWidth > width) {
            var scaleFactor = width / (newWidth);
            
            var mainPos = document.getElementById("main").offsetLeft;

            document.documentElement.style.transform = "translate("+-(newWidth-width)/2+"px,0) scale(" + scaleFactor + "," + scaleFactor + ")"

        }




    }

    function leaveTransition() { //move up
        mouseOnIframe = false;
        upgrade.style.right = -40 + "px";
        document.documentElement.style.transform = "scale(1,1)"
        upScreen.style.height = "0px";
    } //

    var upScreen = document.createElement("div");
    upScreen.id = "upscreen";

    var upFrame = document.createElement("iframe");

        upScreen.appendChild(upFrame);

        upgrade.appendChild(upScreen);



    

    //upFrame.width = 381;

    //upFrame.height = 485;

    upFrame.id = "upFrame";


    
    upgrade.addEventListener("click",upgradeClick)
    
    function upgradeClick(e){  //ugh just kill me, this code is terrible
        
        if(e.target !== upgrade) return
        
        upgradesOpen = !upgradesOpen
        
        if(upgradesOpen){
            
            enterTransition();
            
        }else{
            
            leaveTransition();
            
        }
        
        
    }




    function changeIframeSize(w, h) {
        //console.log(w,h,mouseOnIframe)
        upFrame.width = w
        upFrame.height = h
        //upgrade.style.transition = "none"
        upgrade.classList.add("noTransition")

        if (mouseOnIframe) {
            upgrade.style.right = (-w - 50) + "px"
        } else {
            upgrade.style.right = "-50px"
        }


        //upgrade.style.transition = "1s ease-in-out"
        upScreen.style.height = h + "px";

        upgrade.offsetHeight;

        upgrade.classList.remove("noTransition")
        
        if(upgradesOpen){
           enterTransition();
           }

    }


    function setUpgrades(p,c) {

        var height = command.offsetHeight;

        upgrade.style.height = height + "px";

        slide.appendChild(upgrade);

        upgradePos = upgrade.getBoundingClientRect().right;
        
        upScreen.style.height = 0;
        
        upFrame.src = "https://comic-quest.github.io/mejora?p=" +p+"&coins="+c;

    }

    function unSetUpgrades() {


        slide.removeChild(upgrade);

    }
    
    
    if (variables.upgrades) {


        var preset,coins;
            preset = variables.preset || 0;
            coins = variables.coins || 0;
           setUpgrades(preset,coins);

    }


    //links.style.visibility="hidden";





    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
        if (!event.origin.includes("https://comic-quest.github.io"))
            return;

        if (event.data.name === "nextPage") {
            if (links) {
                links.style.visibility = "visible"
            }

        }

        if (event.data.name === "hideNext") {
            if (links) {
                links.style.visibility = "hidden"
            }

        }

        if (event.data.name === "resizeIframe") {

            changeIframeSize(event.data.w, event.data.h);

        }

    }


} //code

code();
