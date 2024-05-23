let cachedAvailableDates = {};

$(document).ready(function() {
    async function fetchAvailableDates(formule) {
        try {
            const response = await fetch('/get-available-days?formule=' + formule);
            const data = await response.json();
            cachedAvailableDates[formule] = data;
            return data;
        } catch (error) {
            console.error('Error fetching available dates:', error);
            return [];
        }
    }

    async function updateDatepicker(formule) {
        if (!formule) {
            return;
        }

        let availableDates = cachedAvailableDates[formule] || await fetchAvailableDates(formule);

        $('#datePicker').datepicker('destroy').datepicker({
            dateFormat: 'dd-mm-yy',
            beforeShowDay: function(date) {
                const string = jQuery.datepicker.formatDate('dd-mm-yy', date);
                return [availableDates.includes(string)];
            }
        });
    }

    document.querySelectorAll('input[name="formule"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            const selectedCategory = document.querySelector('input[name="formule"]:checked').value;
            updateDatepicker(selectedCategory);
        });
    });

    // Initieer de Datepicker bij het laden van de pagina
    const initialCategory = document.querySelector('input[name="formule"]:checked');
    if (initialCategory) {
        updateDatepicker(initialCategory.value);
    }

    // Background fetching for all categories
    document.querySelectorAll('input[name="formule"]').forEach((radio) => {
        const formule = radio.value;
        fetchAvailableDates(formule);
    });
});
