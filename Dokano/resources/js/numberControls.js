document.addEventListener("DOMContentLoaded", () => {

    const adultInput = document.getElementById("aantal_volwassenen");
    const plusAdultButton = document.getElementById("plusAdult");
    const minusAdultButton = document.getElementById("minusAdult");
    
    const childInput = document.getElementById("aantal_kinderen");
    const plusChildButton = document.getElementById("plusChild");
    const minusChildButton = document.getElementById("minusChild");

    plusAdultButton.addEventListener("click", (event) => {
        let currentValue = parseInt(adultInput.value, 10);
        if (currentValue < 25) { // Controleer of de waarde kleiner is dan de max-waarde
            adultInput.value = currentValue + 1;
        }
    });
    
    minusAdultButton.addEventListener("click", (event) => {
        let currentValue = parseInt(adultInput.value, 10);
        if (currentValue > 0) { // Controleer of de waarde groter is dan de min-waarde
            adultInput.value = currentValue - 1;
        }
    });

    plusChildButton.addEventListener("click", () => {
        let currentValue = parseInt(childInput.value, 10);
        if (currentValue < 25) { // Check if the value is less than the max value
            childInput.value = currentValue + 1;
        }
    });

    minusChildButton.addEventListener("click", () => {
        let currentValue = parseInt(childInput.value, 10);
        if (currentValue > 0) { // Check if the value is greater than the min value
            childInput.value = currentValue - 1;
        }
    });
});
