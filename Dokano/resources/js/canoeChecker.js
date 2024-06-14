document.addEventListener("DOMContentLoaded", () => {
    // DOM elements initialization
    const bookingDateInput = document.getElementById("datePicker");
    const bookingTimeInput = document.getElementById("tijd");
    const checkAvailabilityButton = document.getElementById("checkAvailability");
    const nextButton = document.getElementById("next1");
    const canoeAvailabilitySection = document.getElementById("canoeAvailability");
    const aantalKanosInput = document.getElementById("aantal_kanos");
    const categories = document.querySelectorAll('.radio-formule-wrapper input[name="formule"]');
    const canoes = document.querySelectorAll('.radio-formule-wrapper input[name="type_kano"]');
    const error = document.getElementById("errorCanoe");

    let availableCanoes = {};

    // Fetch available canoes for the selected date and time
    const fetchAvailableCanoes = async (date, time) => {
        try {
            const response = await fetch(`/api/check_availability?date=${date}&time=${time}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const textData = await response.text();
            const data = JSON.parse(textData);
            return data;
        } catch (error) {
            console.error("Error fetching available canoes:", error);
            return null;
        }
    };

    // Update the canoe availability based on the selected date and time
    const updateCanoeAvailability = async () => {
        const selectedDate = bookingDateInput.value;
        const selectedTime = bookingTimeInput.value;

        if (!selectedDate || !selectedTime) {
            canoeAvailabilitySection.innerHTML =
                '<p class="font-bold text-l">Gelive een datum en tijd te selecteren</p>';
            return;
        }

        const availability = await fetchAvailableCanoes(selectedDate, selectedTime);
        if (availability !== null) {
            if (availability.error) {
                canoeAvailabilitySection.innerHTML = `<p>Error: ${availability.error}</p>`;
            } else {
                availableCanoes = availability; // Store the availability globally
                let availabilityHtml = "";

                // Update availability information and visibility of canoes
                for (const [canoeType, remainingCanoes] of Object.entries(availability)) {
                    availabilityHtml += `
                    <p class="canoe-info text-standards-grey mt-2 mb-2">
                        <span class="canoe-type">${canoeType}: </span> 
                        <span class="font-bold text-l">${remainingCanoes}</span>
                    </p>
                    <hr>`;
                    const canoeElement = document.querySelector(
                        `[data-canoe-type="${canoeType}"]:not(.hidden)`
                    );
                    if (canoeElement) {
                        if (remainingCanoes === 0) {
                            canoeElement.classList.add("none");
                        } else {
                            canoeElement.classList.remove("none");
                        }
                    }
                }

                canoeAvailabilitySection.innerHTML = availabilityHtml;
            }
        } else {
            canoeAvailabilitySection.innerHTML =
                "<p>Error fetching available canoes. Please try again.</p>";
        }
    };

    // Check canoe availability before proceeding to the next form step
    const checkCanoeAvailabilityBeforeNext = () => {
        const requestedCanoes = parseInt(aantalKanosInput.value, 10);
        const selectedCanoeType = document.querySelector('input[name="type_kano"]:checked');

        if (selectedCanoeType) {
            const canoeType = selectedCanoeType.value;
            const available = availableCanoes[canoeType] || 0;
            if (requestedCanoes > available) {
                error.innerHTML = "Teveel kanos voor geselecteerde type kano";
                return false; // Prevent form submission or moving to next step
            }
        } else {
            error.innerHTML = "Gelieve een aantal kano's in te voeren.";
            return false; // Prevent form submission or moving to next step
        }
        return true;
    };

    // Event listener for the "Check Availability" button
    checkAvailabilityButton.addEventListener("click", updateCanoeAvailability);

    // Event listener for the "Next" button
    nextButton.addEventListener("click", (event) => {
        if (!checkCanoeAvailabilityBeforeNext()) {
            event.preventDefault(); // Prevent moving to the next step if validation fails
            event.stopPropagation(); // Stop the event from propagating further
        }
    });

    categories.forEach((category) => {
        category.addEventListener("click", () => {
            const selectedCategory = category.value.toLowerCase();

            // Hide all canoes initially
            canoes.forEach((canoe) => {
                canoe.closest("div").classList.add("hidden");
            });

            // Show only the canoes related to the selected formula
            document.querySelectorAll(`[data-categories]`).forEach((canoe) => {
                const canoeCategories = canoe.getAttribute("data-categories").toLowerCase();
                if (canoeCategories.includes(selectedCategory)) {
                    canoe.closest("div").classList.remove("hidden");
                }
            });
        });
    });
});
