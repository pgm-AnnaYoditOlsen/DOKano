document.addEventListener("DOMContentLoaded", function() {

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
        return days[day];
    }

    function isFutureFixedDay(date, fixedDays) {
        let currentDayOfWeek = date.getDay();
        let fixedDayIndices = fixedDays.map(day => convertToDayIndex(day));
        let today = new Date();

        return fixedDayIndices.includes(currentDayOfWeek) && date >= today;
    }

    function initializeDatepicker(category) {
        let categoriesData = JSON.parse(sessionStorage.getItem('categories'));
        if (!categoriesData || !categoriesData[category]) {
            console.error('Categorie data niet gevonden voor:', category);
            return;
        }

        let availableDates = categoriesData[category].availableDates || [];
        let fixedDays = categoriesData[category].fixedDays || [];
        let notAvailableDates = categoriesData[category].notAvailableDates || [];

        console.log('Initialiseer datepicker voor categorie:', category, availableDates, fixedDays, notAvailableDates);

        $('#datePicker').datepicker('destroy');
        $('#datePicker').datepicker({
            dateFormat: 'dd-mm-yy',
            beforeShowDay: function(date) {
                let dateString = $.datepicker.formatDate('dd-mm-yy', date);
                let today = new Date();

                if (notAvailableDates.includes(dateString)) {
                    return [false, '', 'Niet beschikbaar'];
                }

                if (date < today) {
                    return [false, '', 'Niet beschikbaar'];
                }

                if (availableDates.includes(dateString) || isFutureFixedDay(date, fixedDays)) {
                    return [true, 'available-date', 'Beschikbaar'];
                } else {
                    return [false, '', 'Niet beschikbaar'];
                }
            }
        });
    }

    fetchAndCacheCategories();

    document.getElementById('datePicker').disabled = true;

    document.querySelectorAll('input[name="formule"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            const selectedCategory = document.querySelector('input[name="formule"]:checked').value;
            console.log('Geselecteerde categorie:', selectedCategory);
            document.getElementById('datePicker').disabled = false;
            initializeDatepicker(selectedCategory);
        });
    });
});
