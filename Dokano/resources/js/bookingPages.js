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
  const time = document.getElementById("tijd").value;
  const adults = document.getElementById("aantal_volwassenen").value;
  const children = document.getElementById("aantal_kinderen").value;
  const amountCanoe = document.getElementById("aantal_kanos").value;
  const selectedCanoeInput = document.querySelector(
    '[name="type_kano"]:checked'
  );
  const canoe = selectedCanoeInput ? selectedCanoeInput.value : "";
  // const comments = document.getElementById("opmerkingen").value;
  const error = document.getElementById("error");

  // Reset error message
  error.innerHTML = "";

  if (!selectedFormulaInput) {
    error.innerHTML += "Gelieve een formule te selecteren.<br>";
  }
  if (date === "") {
    error.innerHTML += "Gelieve een datum te selecteren.<br>";
  }
  if (time === "Kies uw tijd") {
    error.innerHTML += "Gelieve een tijd te selecteren.<br>";
  }
  if ((adults === "0" && children === "0") || (adults === "" && children === "")) {
    error.innerHTML += "Gelieve het aantal volwassenen en/of kinderen in te voeren.<br>";
  }
  if (amountCanoe === "0" || amountCanoe === "") {
    error.innerHTML += "Gelieve het aantal kano's in te voeren.<br>";
  }
  if (canoe === "") {
    error.innerHTML += "Gelieve een kano te selecteren.<br>";
  }
  // if (comments === "") {
  //   error.innerHTML += "Voer alstublieft een opmerking in.<br>";
  // }

  return error.innerHTML === "";
}

next1.onclick = function (event) {
  if (validateForm()) {
    breadcrumb1.style.display = "none";
    breadcrumb2.style.display = "block";
    breadcrumb3.style.display = "none";
    form1.style.left = "-1450px";
    form1.style.display = "none";
    console.log("form1 hidden");
    form2.style.left = "50%";
    form2.style.display = "block";
    console.log("form2 shown");
    updateSliderWidth("100%");
    changeFillColor("#e4a621");
  } else {
    // Prevent default action if there are errors
    event.preventDefault();
    event.stopPropagation();
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
    error.innerHTML += "Gelieve uw voornaam in te voeren..<br>";
  }
  if (lastname === "") {
    error.innerHTML += "Gelieve uw achternaam in te voeren..<br>";
  }
  if (email === "") {
    error.innerHTML += "Gelieve uw email in te voeren.<br>";
  }
  if (phone === "") {
    error.innerHTML += "Gelieve uw telefoonnummer in te voeren.<br>";
  }

  if (error.innerHTML !== "") {
    error.style = "color: red; font-size: 1rem; margin-top: 1rem;";
    return false;
  }
  if (error.innerHTML === "") {
    BFormOk = true;
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
