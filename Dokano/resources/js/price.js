document.addEventListener('DOMContentLoaded', function() {
    function calculateTotalPrice() {
        const aantalVolwassenen = parseInt(document.getElementById('aantal_volwassenen').value);
        const aantalKinderen = parseInt(document.getElementById('aantal_kinderen').value);
        const formule = document.querySelector('input[name="formule"]:checked').value;

        fetch('/calculate-total-price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
                formule: formule,
                aantal_volwassenen: aantalVolwassenen,
                aantal_kinderen: aantalKinderen
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalPrice').innerText = `€${data.total_price}`;
        })
        .catch(error => console.error('Error:', error));
    }

    document.getElementById('aantal_volwassenen').addEventListener('input', calculateTotalPrice);
    document.getElementById('aantal_kinderen').addEventListener('input', calculateTotalPrice);
    document.querySelectorAll('input[name="formule"]').forEach(input => {
        input.addEventListener('change', calculateTotalPrice);
    });
});
