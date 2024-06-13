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
            })
            .catch(error => {
                console.error(error);
            });
    }

    function convertToDayIndex(day) {
        const days = {
            'zo': 0,
            'ma': 1,
            'di': 2,
            'wo': 3,
            'do': 4,
            'vr': 5,
            'za': 6
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
            document.getElementById('datePicker').disabled = false;
            initializeDatepicker(selectedCategory);
        });
    });
});
