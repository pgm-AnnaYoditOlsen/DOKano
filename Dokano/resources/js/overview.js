const next = document.getElementById("next2");
const overview = document.getElementById("overview");

next.addEventListener("click", () => {
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("tel").value;

  const selectedFormulaInput = document.querySelector('[name="formule"]:checked');
  const formula = selectedFormulaInput ? selectedFormulaInput.value : '';
  const date = document.getElementById("datePicker").value;
  // const time = document.getElementById("voormiddag").value;
  const adults = document.getElementById("aantal_volwassenen").value;
  const children = document.getElementById("aantal_kinderen").value;
  const selectedCanoeInput = document.querySelector('[name="type_kano"]:checked');
  const canoe = selectedCanoeInput ? selectedCanoeInput.value : '';
  const comments = document.getElementById("opmerkingen").value;
  overview.innerHTML = `
        <strong>${formula}</strong>
        <p>Datum: ${date}</p>  
        <p>Volwassenen: ${adults}</p>
        <p>Kinderen: ${children}</p>
        <p>Kano: ${canoe}</p>
        <p>Opmerkingen: ${comments}</p>
        <hr>
        <p>Voornaam: ${firstname}</p>
        <p>Achternaam: ${lastname}</p>
        <p>Email: ${email}</p>
        <p>Telefoonnummer: ${phone}</p>

    `;
});
