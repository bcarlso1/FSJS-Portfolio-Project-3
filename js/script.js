// set first text field to focus state

function focusFirst() {
    document.getElementById('name').focus();
}

window.onload = focusFirst();


// create text field if "other" selected as job role
// 1. create the Div & hide it
var otherDiv = document.createElement('input');
        otherDiv.setAttribute("type", "text");
        otherDiv.setAttribute("placeholder", "Your Job Role");
        const fieldParent = document.getElementsByTagName('fieldset')[0];
        fieldParent.appendChild(otherDiv);
        otherDiv.style.display = "none";

// when other selected
var formSelect = document.getElementById('title');
formSelect.addEventListener('input', (e) => {
    if (formSelect.value == "other") {
        otherDiv.style.display = "block";
    }
// when it is not
    else {
        otherDiv.style.display = "none";
}
});



// have T shirt selection match what options are available
const tShirtDesignSelect = document.getElementById('design');
const tShirtColorSelect = document.getElementById('color');
const designList = tShirtDesignSelect.childNodes; 
const colorList = tShirtColorSelect.childNodes; 

// hide "select theme" from design drop-down
designList[1].style.display = "none";

// add option item "select a T-shirt theme" to the color field
var selectOption = document.createElement("OPTION");
selectOption.innerHTML = "Select a T-shirt theme";
selectOption.setAttribute('selected', "selected");
tShirtColorSelect.prepend(selectOption);
// hide new option so can't pick it in drop down
selectOption.style.display = "none";
// hide all colors before theme picked
for (var i = 0; i < colorList.length; i++) {
    colorList[i].style.display = "none";
}


//tShirtDesignSelect.addEventListener('input', (e) => {
 //   if (tShirtDesignSelect.value == "js puns") {
   //     colorList[1].style.display = "none";
     //   colorList[5].style.display = "none";
   // }
//});