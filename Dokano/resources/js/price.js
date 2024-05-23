document.addEventListener('DOMContentLoaded', function() {
    function calculateTotalPrice() {
        const formule = document.querySelector('input[name="formule"]:checked').value;
        const amountAdults = parseInt(document.getElementById('aantal_volwassenen').value);
        const amountChildren = parseInt(document.getElementById('aantal_kinderen').value);

        fetch('/calculate-price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                formule: formule,
                amountAdults: amountAdults,
                amountChildren: amountChildren
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText || 'An error occurred');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('totalPriceDisplay').innerText = '€ ' + data.totalPrice;
            document.getElementById('totaal_prijs').value = data.totalPrice;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Voeg event listeners toe aan de invoervelden en radio buttons
    document.getElementById('aantal_volwassenen').addEventListener('change', calculateTotalPrice);
    document.getElementById('aantal_kinderen').addEventListener('change', calculateTotalPrice);
    document.querySelectorAll('input[name="formule"]').forEach(input => {
        input.addEventListener('change', calculateTotalPrice);
    });
});