// document.addEventListener('DOMContentLoaded', () => {
//   const formuleSelect = document.querySelectorAll('.radio-formule-wrapper input[name="formule"]');
//   const tijdSelect = document.getElementById('timeCheck'); // Corrected the selector

//   // Check if tijdSelect is not null
//   if (tijdSelect) {
//     formuleSelect.forEach(formule => {
//       formule.addEventListener('click', () => {
//         const selectedFormule = formule.value;
//         console.log(selectedFormule);
//         tijdSelect.innerHTML = selectedFormule; // Set innerHTML to the selected value
//       });
//     });
//   }
// });
document.addEventListener('DOMContentLoaded', () => {
  const formuleSelect = document.querySelectorAll('.radio-formule-wrapper input[name="formule"]');
  const tijdSelect = document.getElementById('timeCheck'); // Corrected the selector
  const tijdDropdown = document.getElementById('tijd'); // Select the dropdown

  // Check if tijdSelect is not null
  if (tijdSelect) {
    // Event listener for radio buttons
    formuleSelect.forEach(formule => {
      formule.addEventListener('click', () => {
        const selectedFormule = formule.value;
        tijdSelect.innerHTML = selectedFormule; // Set innerHTML to the selected value
      });
    });

    // Event listener for the dropdown
    tijdDropdown.addEventListener('change', () => {
      const selectedTime = tijdDropdown.value;
      tijdSelect.innerHTML = selectedTime; // Set innerHTML to the selected time
    });
  }
});
