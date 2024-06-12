document.addEventListener("DOMContentLoaded", () => {

    const adultInput = document.getElementById("aantal_volwassenen");
    const plusAdultButton = document.getElementById("plusAdult");
    const minusAdultButton = document.getElementById("minusAdult");
    
    const childInput = document.getElementById("aantal_kinderen");
    const plusChildButton = document.getElementById("plusChild");
    const minusChildButton = document.getElementById("minusChild");

    const canoeInput = document.getElementById("aantal_kanos");
    const plusCanoeButton = document.getElementById("plusCanoe");
    const minusCanoeButton = document.getElementById("minusCanoe");

    plusAdultButton.addEventListener("click", (event) => {
        let currentValue = parseInt(adultInput.value, 10);
        if (currentValue < 25) { 
            adultInput.value = currentValue + 1;
        }
    });
    
    minusAdultButton.addEventListener("click", (event) => {
        let currentValue = parseInt(adultInput.value, 10);
        if (currentValue > 0) {
            adultInput.value = currentValue - 1;
        }
    });

    plusChildButton.addEventListener("click", () => {
        let currentValue = parseInt(childInput.value, 10);
        if (currentValue < 25) {
            childInput.value = currentValue + 1;
        }
    });

    minusChildButton.addEventListener("click", () => {
        let currentValue = parseInt(childInput.value, 10);
        if (currentValue > 0) {
            childInput.value = currentValue - 1;
        }
    });

    plusCanoeButton.addEventListener("click", function() {
        const currentValue = parseInt(canoeInput.value);
        canoeInput.value = currentValue + 1;
    });

    minusCanoeButton.addEventListener("click", function() {
        const currentValue = parseInt(canoeInput.value);
        if (currentValue > 0) {
            canoeInput.value = currentValue - 1;
        }
    });
});
