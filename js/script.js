// set first text field to focus state

function focusFirst() {
    document.getElementById('name').focus();
}

window.onload = focusFirst();

/************
JOB ROLE SECTION 
******************/
// hide 'other' input 
var otherInput = document.getElementById('other-title');
otherInput.style.display = "none";

// when other selected
var formSelect = document.getElementById('title');
formSelect.addEventListener('input', (e) => {
    if (formSelect.value == "other") {
        otherInput.style.display = "block";
    }
// when it is not
    else {
        otherInput.style.display = "none";
}
});

/***************
T-SHIRT SECTION
**************/

// have T shirt selection match what options are available
// set variables
const tShirtDesignSelect = document.getElementById('design');
const tShirtColorSelect = document.getElementById('color');
const designList = tShirtDesignSelect.children; 
const colorList = tShirtColorSelect.children; 


// hide "select theme" from design drop-down
designList[0].style.display = "none";

// create placeholder text when drop down gone
var colorPlaceholder = document.createElement("div");
colorPlaceholder.innerHTML = "Please select a T-shirt theme";
var shirtDiv = document.getElementById('colors-js-puns');
shirtDiv.insertAdjacentElement("afterend", colorPlaceholder);



// add option item "select a T-shirt theme" to the color field
var selectOption = document.createElement("OPTION");
selectOption.innerHTML = "Select color";
selectOption.setAttribute('selected', "selected");
tShirtColorSelect.prepend(selectOption);
// hide new option so can't pick it in drop down
selectOption.style.display = "none";
// hide all colors before theme picked
tShirtColorSelect.style.display = "none";


tShirtDesignSelect.addEventListener('input', (e) => {
    if (tShirtDesignSelect.value == "js puns" || tShirtDesignSelect.value == "heart js" ) {
        // show colors list, hide placeholder div
        tShirtColorSelect.style.display = "block";
        colorPlaceholder.style.display = "none";
    }
    if (tShirtDesignSelect.value == "js puns") {
        colorList[1].style.display = "block";
        colorList[2].style.display = "block";
        colorList[3].style.display = "block";
        colorList[4].style.display = "none";
        colorList[5].style.display = "none";
        colorList[6].style.display = "none";
    }
    else if (tShirtDesignSelect.value == "heart js") {
        colorList[1].style.display = "none";
        colorList[2].style.display = "none";
        colorList[3].style.display = "none";
        colorList[4].style.display = "block";
        colorList[5].style.display = "block";
        colorList[6].style.display = "block";
    }
});

/**********************
ACTIVITY SECTION 
 *********************/
 // total up cost & block conflicts
 // create new div for total
 // add variables
 var currentCost = 0;
 var totalCost = document.createElement('div');
 totalCost.innerHTML = `Total Cost: ${currentCost}`;
 var activities = document.getElementsByClassName('activities')[0];
 activities.appendChild(totalCost);
 var checkboxes = document.getElementsByTagName("input");

 activities.addEventListener("change", (e) => {
    var selectedTime = event.target.getAttribute("data-day-and-time");
    // if already selected and changes (unchecked), subtract cost
    if (event.target.classList.contains("selected")) {
        event.target.classList.remove('selected');
        let selectedCost = parseInt(event.target.getAttribute("data-cost"));
        currentCost -= selectedCost;    
        totalCost.innerHTML = `Total Cost: ${currentCost}`;

      // remove blocking on time conflicts if unchecked
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            if (checkboxes[i].getAttribute('data-day-and-time') == selectedTime) {
               checkboxes[i].removeAttribute("disabled");
              // event.target.removeAttribute("disabled");
            }
        }
    }

 // if not & changes, add cost       
    } else {
        event.target.classList.add('selected'); 
        let selectedCost = parseInt(event.target.getAttribute("data-cost"))
        currentCost += selectedCost;
        totalCost.innerHTML = `Total Cost: ${currentCost}`;

        // add blocking on time conflicts

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == "checkbox") {
                if (checkboxes[i].getAttribute('data-day-and-time') == selectedTime) {
                   checkboxes[i].setAttribute("disabled", true);
                   event.target.removeAttribute("disabled");
                }
            }
        }
    }
});
 

/***************** 
CREDIT CARD SECTION
*****************/

var paymentSelect = document.getElementById('payment');
var paypal = document.getElementById('paypal');
var bitcoin = document.getElementById('bitcoin');
var credit = document.getElementById("credit-card");

// default to credit card, hide other divs
paymentSelect.children[1].setAttribute("selected", true);
paymentSelect.children[0].style.display = "none";
paypal.style.display = "none";
bitcoin.style.display = "none";

// fix html- no "if you selected"
paypal.innerHTML = "<p>We'll take you to Paypal's site to set up your billing information, when you click “Register” below.</p>";
bitcoin.innerHTML = "<p>We'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p>";

// show paypal detail if selected
paymentSelect.addEventListener("input", (e) => {
    if (paymentSelect.value == "paypal") {
        paypal.style.display = "block";
        credit.style.display = "none";
        bitcoin.style.display = "none";
// show bitcoin
    } else if (paymentSelect.value == "bitcoin") {
        bitcoin.style.display = "block";
        credit.style.display = "none";
        paypal.style.display = "none";
// show credit
    } else {
        credit.style.display = "block";
        bitcoin.style.display = "none";
        paypal.style.display = "none";
    }
})

/*********************
 FORM VALIDATION
 *********************/
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('mail');
var submit = document.getElementsByTagName('button')[0];
var zipInput = document.getElementById('zip');
var CVVInput = document.getElementById('cvv');
var cardInput = document.getElementById("cc-num");
var emailTest;
var zipTest;
var CVVTest;
var cardTest;
var nameTest = false;
var activityTest = false;

// create error structures
var submitError = document.createElement('div');
submitError.style.color = "purple";
submit.insertAdjacentElement("beforebegin", submitError);

var nameError = document.createElement('div');
nameError.style.color = "purple";
nameInput.insertAdjacentElement("beforebegin", nameError);

var emailError = document.createElement('div');
emailError.style.color = "purple";
emailInput.insertAdjacentElement("beforebegin", emailError);

var checkboxError = document.createElement('div');
checkboxError.style.color = "purple";
activities.insertAdjacentElement("afterbegin", checkboxError);


 // validate name
 function checkName() {
    const nameRegex = /^[a-z]+$/i;
    name = nameInput.value;
    nameTest = nameRegex.test(name); 
    // error response & undo
    if (nameTest == false) {
        nameInput.style.border = "2px solid red";
        if (name == "") {
        nameError.innerHTML = "You gotta a name or what?";
        } else {
            nameError.innerHTML = "How about a real name?";
        }
    }
    if (nameTest == true) {
        nameInput.style.border = "2px solid rgb(111, 157, 220)";
        nameError.innerHTML = "";
    }
}
 


// validate email
function checkEmail() {
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i;
    email = emailInput.value;
    emailTest = emailRegex.test(email); 
    if (emailTest == false) {
        emailInput.style.border = "2px solid red";
        if (email == "") {
            emailError.innerHTML = "You expect me to believe you don't have email?";
        } else {
        emailError.innerHTML = "You thought I'd believe that's a real email?";
        }
    }
    else {
        emailInput.style.border = "2px solid rgb(111, 157, 220)";
        emailError.innerHTML = "";
    }
}

// validate if 1+ activity selected
function checkActivity() {
    var count = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            if (checkboxes[i].checked) {
                count++;             
            }
        } 
    }
    if (count == 0) {
        activityTest = false;
    } else {
        activityTest = true;
    }

    if (activityTest) {
        checkboxError.innerHTML = "";
        checkboxError.style.border = "none";
    } else {
        checkboxError.innerHTML = "Planning to do anything here?";
                checkboxError.style.borderBottom = "2px solid red";
                activity = true;
    }
}


// validation if credit card selected
function checkCard() {
    if (paymentSelect.value == "credit card") {
        
        const cardRegex = /^[0-9]{13}([0-9])?([0-9])?([0-9])?$/;
        var card = cardInput.value;
        cardTest = cardRegex.test(card); 
        if (cardTest == false) {
            cardInput.style.border = "2px solid red";
            } else {
            cardInput.style.border = "2px solid rgb(111, 157, 220)";
        }
    }};

function checkZip() {
if (paymentSelect.value == "credit card") {
    
    const zipRegex = /^[0-9]{5}$/;
    var zip = zipInput.value;
    zipTest = zipRegex.test(zip); 
    if (zipTest == false) {
        zipInput.style.border = "2px solid red";
        } else {
        zipInput.style.border = "2px solid rgb(111, 157, 220)";
    }
}};

function checkCVV() {
    if (paymentSelect.value == "credit card") {
    
        const CVVRegex = /^[0-9]{3}$/;
        var CVV = CVVInput.value;
        CVVTest = CVVRegex.test(CVV); 
        if (CVVTest == false) {
            CVVInput.style.border = "2px solid red";
            } else {
            CVVInput.style.border = "2px solid rgb(111, 157, 220)";
        }
    }};




 //check functions line by line as form completed or when edited
nameInput.addEventListener("input", (e) => {
    checkName();
});

nameInput.addEventListener("focusout", (e) => {
    checkName();
});

emailInput.addEventListener("focusout", (e) => {
   checkEmail();
 });

emailInput.addEventListener("input", (e) => {
    if (emailTest == false) {
    checkEmail();
    }
});

activities.addEventListener("input", (e) => {
    checkActivity();
    }
);

zipInput.addEventListener("input", (e) => {
    checkZip();
});

CVVInput.addEventListener("input", (e) => {
    checkCVV();
});

cardInput.addEventListener("input", (e) => {
    checkCard();
});
 // validation function overall - on submit button (event listener)
submit.addEventListener("click", (e) => {
    checkName();
    checkEmail();
    checkActivity();
    checkZip();
    checkCVV();
    checkCard();
    console.log("functions run")
    if (nameTest && activityTest && emailTest && zipTest && CVVTest && cardTest) {  
        submit.setAttribute('type', 'submit');
        submitError.innerHTML = "";
    } else {
        // type is button so it won't submit
        submit.setAttribute('type', 'button');
        submitError.innerHTML = "Not even close.  See the errors in your ways above.";
        setTimeout(function() { submitError.innerHTML = "";}, 3000);
    }
} 
);


 