document.addEventListener("DOMContentLoaded", function() {
    // Functie om categorieën op te halen en te cachen
    function fetchAndCacheCategories() {
        fetch('get-available-days')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fout bij het ophalen van beschikbare dagen');
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.setItem('categories', JSON.stringify(data));
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Functie om de datepicker te initialiseren
    function initializeDatepicker(category) {
        let categoriesData = JSON.parse(sessionStorage.getItem('categories'));
        let availableDates = categoriesData[category] || [];

        $('#datePicker').datepicker('destroy');
        $('#datePicker').datepicker({
            beforeShowDay: function(date) {
                let dateString = $.datepicker.formatDate('dd-mm-yy', date);
                if (availableDates.includes(dateString)) {
                    return [true, 'available-date', 'Beschikbaar'];
                } else {
                    return [false, '', 'Niet beschikbaar'];
                }
            }
        });
    }

    fetchAndCacheCategories();

    document.getElementById('datePicker').disabled = true;

    // datepicker initialiseren wanneer een formule wordt geselecteerd
    document.querySelectorAll('input[name="formule"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            const selectedCategory = document.querySelector('input[name="formule"]:checked').value;
            console.log('Geselecteerde categorie:', selectedCategory);
            document.getElementById('datePicker').disabled = false;
            initializeDatepicker(selectedCategory);
        });
    });
});
