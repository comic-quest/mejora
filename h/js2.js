



if(document.readyState==="interactive"||document.readyState==="complete"){
   code();
   }else{
       document.addEventListener("load",code);
   }

function code(){
    
    /*

Each day a page glitches out until the remake of the comic is released. However long that is.
This just uses a random number generator with a fixed seed and iterates through the days passed to check if the page is glitched or not.


*/
    
    var pageNumber = document.documentElement.className.substring(1);
console.log(pageNumber)
var random = new Random(333); //doesn't matter to use 1,after a few iterations it gets more unpredictable.Also it's hard to see a pattern

var startDate = new Date();
startDate.setUTCFullYear(2019)
startDate.setUTCMonth(9)
startDate.setUTCDate(16)

var currentDate = new Date();

var dayDifference = Math.floor((currentDate.getTime()-startDate.getTime())/1000/60/60/24)


//i loop through all previous days to see if it was glitched already.

dayDifference=10
for(var i = 0;i<dayDifference+1;i++){
    var rng = random.nextFloat()
    
    var glitchedPage = Math.floor(rng*115)+1;
    console.log(glitchedPage)
    if(glitchedPage==pageNumber){
       
        glitch();
        break;
        
       }
    
}

function Random(seed) {
  this._seed = seed % 2147483647;
    this.next = function(){
       
    return this._seed = this._seed * 16807 % 2147483647;
       
    }
    this.nextFloat=function(){
        return (this.next() - 1) / 2147483646;
    }
  if (this._seed <= 0) this._seed += 2147483646;
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */



/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */


function glitch(){
    console.log("yeetus")
    //hide the elements inside slide and change the background image.
    var staticUrl = "https://i.imgur.com/zWmDgPH.gif"
    var slide = document.getElementById("slide");
    for(var i = 0;i<slide.children.length;i++){
        
        slide.children[i].style.visibility="hidden";
        
    }
    slide.style.backgroundImage="url("+staticUrl+")";
    
}
    
}
