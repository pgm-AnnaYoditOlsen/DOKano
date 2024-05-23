const bookingForm = document.getElementById("bookingForm");
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const form3 = document.getElementById("form3");

const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");

const sliderYellow = document.getElementById("sliderYellow");
const sliderYellow2 = document.getElementById("sliderYellow2");

const svgElement2 = document.getElementById("breadcrumb-2");
const svgElement3 = document.getElementById("breadcrumb-3");

const breadcrumb1 = document.getElementById("breadcrumb-1-small");
const breadcrumb2 = document.getElementById("breadcrumb-2-small");
const breadcrumb3 = document.getElementById("breadcrumb-3-small");

//booking check
let BFormOk = false;


form1.style.display = "block";
form2.style.display = "none";
form3.style.display = "none";

breadcrumb1.style.display = "block";
breadcrumb2.style.display = "none";
breadcrumb3.style.display = "none";

next2.onclick = function () {
  breadcrumb1.style.display = "none";
  breadcrumb2.style.display = "none";
  breadcrumb3.style.display = "block";
};

// Function to validate the form
function validateForm() {
  const selectedFormulaInput = document.querySelector('[name="formule"]:checked');
  const date = document.getElementById("datePicker").value;
  // const time = document.getElementById("voormiddag").value;
  const adults = document.getElementById("aantal_volwassenen").value;
  const children = document.getElementById("aantal_kinderen").value;
  const selectedCanoeInput = document.querySelector(
    '[name="type_kano"]:checked'
  );
  const canoe = selectedCanoeInput ? selectedCanoeInput.value : "";
  const comments = document.getElementById("opmerkingen").value;
  const error = document.getElementById("error");

  // Reset error message
  error.innerHTML = "";

  if (selectedFormulaInput === "") {
    error.innerHTML += "Selecteer alstublieft een formule.<br>";
  }
  if (date === "") {
    error.innerHTML += "Selecteer alstublieft een datum.<br>";
  }
  // if (time === "") {
  //   error.innerHTML += "Selecteer alstublieft een tijd.<br>";
  // }
  if (adults === "0" && children === "0") {
    error.innerHTML +=
      "Voer alstublieft het aantal volwassenen of kinderen in.<br>";
  }
  if (canoe === "") {
    error.innerHTML += "Selecteer alstublieft een kano.<br>";
  }
  if (comments === "") {
    error.innerHTML += "Voer alstublieft een opmerking in.<br>";
  }

  if (error.innerHTML !== "") {
    error.style = "color: red; font-size: 1rem; margin-top: 1rem;";
    return false;
  }

  return true;
}

next1.onclick = function () {
  if (validateForm()) {
    breadcrumb1.style.display = "none";
    breadcrumb2.style.display = "block";
    breadcrumb3.style.display = "none";
    form1.style.left = "-1450px";
    form1.style.display = "none";
    console.log("form1 hidden");
    form2.style.left = "50%";
    form2.style.display = "block";
    updateSliderWidth("100%");
    changeFillColor("#e4a621");
  }
};

back1.onclick = function () {
  breadcrumb1.style.display = "block";
  breadcrumb2.style.display = "none";
  breadcrumb3.style.display = "none";
  form1.style.left = "0%";
  form1.style.display = "block";
  form2.style.left = "1450px";
  form2.style.display = "none";

  // Reset the slider width when going back
  updateSliderWidth("0%");
  changeFillColor("#c5cad8");
};

function validateForm2() {
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("tel").value;
  const error = document.getElementById("error2");
  // Reset error message
  error.innerHTML = "";

  if (firstname === "") {
    error.innerHTML += "Voer alstublieft uw voornaam in.<br>";
  }
  if (lastname === "") {
    error.innerHTML += "Voer alstublieft uw achternaam in.<br>";
  }
  if (email === "") {
    error.innerHTML += "Voer alstublieft uw e-mailadres in.<br>";
  }
  if (phone === "") {
    error.innerHTML += "Voer alstublieft uw telefoonnummer in.<br>";
  }

  if (error.innerHTML !== "") {
    error.style = "color: red; font-size: 1rem; margin-top: 1rem;";
    return false;
  }

  return true;
}


next2.onclick = function () {
  if(validateForm2()){
    breadcrumb1.style.display = "none";
    breadcrumb2.style.display = "none";
    breadcrumb3.style.display = "block";
    form2.style.left = "-1450px";
    form2.style.display = "none";
    form3.style.left = "50%";
    form3.style.display = "block";
  
    // Update the slider width for the final step
    updateSliderWidth2("100%");
    changeFillColor2("#e4a621");
  }
};

back2.onclick = function () {
  breadcrumb1.style.display = "none";
  breadcrumb2.style.display = "block";
  breadcrumb3.style.display = "none";
  form2.style.left = "50%";
  form2.style.display = "block";
  form3.style.left = "1450px";
  form3.style.display = "none";

  // Update the slider width when going back
  updateSliderWidth2("0%");
  changeFillColor2("#c5cad8");
};

// Function to update the width of the slider-yellow element
function updateSliderWidth(widthPercentage) {
  // console.log('Updating slider width:', widthPercentage);
  sliderYellow.style.width = widthPercentage;
}

function updateSliderWidth2(widthPercentage) {
  // console.log('Updating slider2 width:', widthPercentage);
  sliderYellow2.style.width = widthPercentage;
}

function changeFillColor(color) {
  svgElement2.style.fill = color;
}

function changeFillColor2(color) {
  svgElement3.style.fill = color;
}
