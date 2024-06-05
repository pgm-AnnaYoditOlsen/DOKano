// // Selecteer alle categorie-elementen en kano-elementen
// const categories = document.querySelectorAll('.radio-formule-wrapper input[name="formule"]');
// const canoes = document.querySelectorAll('.radio-formule-wrapper input[name="type_kano"]');

// // Voeg een click event listener toe aan elk categorie-element
// categories.forEach(category => {
//   category.addEventListener('click', () => {
//     // Haal de geselecteerde waarde van de categorie op en zet om naar lowercase
//     const selectedCategory = category.value.toLowerCase();

//     // Verberg alle kano's
//     canoes.forEach(canoe => {
//       canoe.closest('div').classList.add('hidden');
//     });

//     // Toon de kano's van de geselecteerde categorie
//     const selectedCanoes = document.querySelectorAll(`[data-categories]`);
//     selectedCanoes.forEach(canoe => {
//       const canoeCategories = canoe.getAttribute('data-categories').toLowerCase();
//       if (canoeCategories.includes(selectedCategory)) {
//         canoe.closest('div').classList.remove('hidden');
//       }
//     });
//   });
// });
