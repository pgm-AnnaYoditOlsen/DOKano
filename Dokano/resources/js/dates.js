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
                console.log('Fetched and cached categories:', data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Functie om te controleren of een datum een vaste dag is
    function isFixedDay(date, fixedDays) {
        const daysMap = {
            'zo': 0, // Zondag
            'ma': 1, // Maandag
            'di': 2, // Dinsdag
            'wo': 3, // Woensdag
            'do': 4, // Donderdag
            'vr': 5, // Vrijdag
            'za': 6  // Zaterdag
        };
        const day = date.getDay();
        return Object.keys(daysMap).some(dayKey => fixedDays.includes(dayKey) && daysMap[dayKey] === day);
    }

    // Functie om de datepicker te initialiseren
    function initializeDatepicker(category) {
        let categoriesData = JSON.parse(sessionStorage.getItem('categories'));
        if (!categoriesData || !categoriesData[category]) {
            console.error('Categorie data niet gevonden voor:', category);
            return;
        }

        let availableDates = categoriesData[category].availableDates || [];
        let fixedDays = categoriesData[category].fixedDays || [];

        console.log('Initialiseer datepicker voor categorie:', category, availableDates, fixedDays);

        $('#datePicker').datepicker('destroy');
        $('#datePicker').datepicker({
            dateFormat: 'dd-mm-yy',
            beforeShowDay: function(date) {
                let today = new Date();
                today.setHours(0, 0, 0, 0); // Zorg ervoor dat de huidige datum geen tijdcomponent heeft

                if (date < today) {
                    return [false, '', 'Niet beschikbaar']; // Datum in het verleden, niet beschikbaar
                }

                let dateString = $.datepicker.formatDate('dd-mm-yy', date);
                if (availableDates.includes(dateString) || isFixedDay(date, fixedDays)) {
                    return [true, 'available-date', 'Beschikbaar'];
                } else {
                    return [false, '', 'Niet beschikbaar'];
                }
            }
        });
    }

    fetchAndCacheCategories();

    document.getElementById('datePicker').disabled = true;

    // Datepicker initialiseren wanneer een formule wordt geselecteerd
    document.querySelectorAll('input[name="formule"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            const selectedCategory = document.querySelector('input[name="formule"]:checked').value;
            console.log('Geselecteerde categorie:', selectedCategory);
            document.getElementById('datePicker').disabled = false;
            initializeDatepicker(selectedCategory);
        });
    });
});
