let fake_buttons = document.querySelectorAll(".fake-btn");
let fake_buttons_ids = [];
const passcode_timeout = 1000;
const clearClicked =  () => {clicked = []; console.log("clear")};

let click_timer = setInterval(clearClicked, passcode_timeout)
let clicked = [];
let pass_code = ["btn-2", "btn-3", "btn-6", "btn-4", "btn-5"];
for(let i = 0; i < fake_buttons.length; i++) {
    fake_buttons_ids.push(fake_buttons[i].id);
}

for(let i = 0; i < fake_buttons_ids.length; i++) {
    document.getElementById(fake_buttons_ids[i]).addEventListener("click", function(e) {
        handleClicks(fake_buttons_ids[i]);
    });
}

function handleClicks(id) {
    clicked.push(id);
    console.log(id, clicked, pass_code, clicked === pass_code);
    clearInterval(click_timer);

    if(clicked.equals(pass_code)) {
        window.location.href = "config_dni.html";
    }else{
        click_timer = setInterval(clearClicked, passcode_timeout)
    }

}


if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});