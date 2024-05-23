$(document).ready(function() {

    function updateDatepicker(formule) {
        if (!formule) {
            return;
        }

        let availableDates = [];

        fetch('/get-available-days?formule=' + formule)
            .then(response => response.json())
            .then(data => {
                availableDates = data;

                $('#datePicker').datepicker('destroy').datepicker({
                    dateFormat: 'dd-mm-yy',
                    beforeShowDay: function(date) {
                        const string = jQuery.datepicker.formatDate('dd-mm-yy', date);
                        return [availableDates.includes(string)];
                    }
                });

                console.log(availableDates);
            })
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
});