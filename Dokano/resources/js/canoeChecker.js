document.addEventListener('DOMContentLoaded', () => {
    const bookingDateInput = document.getElementById('datePicker');
    const checkAvailabilityButton = document.getElementById('checkAvailability');
    const canoeAvailabilitySection = document.getElementById('canoeAvailability');

    const fetchAvailableCanoes = async (date) => {
        try {
            console.log(`Fetching available canoes for date: ${date}`);
            const response = await fetch(`/api/check_availability?date=${date}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching available canoes:', error);
            return null;
        }
    };

    const updateCanoeAvailability = async () => {
        const selectedDate = bookingDateInput.value;
        if (!selectedDate) {
            canoeAvailabilitySection.innerHTML = '<p>Please select a date.</p>';
            return;
        }

        const availability = await fetchAvailableCanoes(selectedDate);
        if (availability !== null) {
            if (availability.error) {
                canoeAvailabilitySection.innerHTML = `<p>Error: ${availability.error}</p>`;
            } else {
                let availabilityHtml = '';
                for (const [canoeType, remainingCanoes] of Object.entries(availability)) {
                    availabilityHtml += `<p class="text-standards-grey mb-2">${canoeType}: ${remainingCanoes}</p>`;
                    const canoeElement = document.querySelector(`[data-canoe-type="${canoeType}"]`);
                    if (canoeElement) {
                        if (remainingCanoes === 0) {
                            canoeElement.classList.add('none');
                        } else {
                            canoeElement.classList.remove('none');
                        }
                    }
                }
                canoeAvailabilitySection.innerHTML = availabilityHtml;
            }
        } else {
            canoeAvailabilitySection.innerHTML = '<p>Error fetching available canoes. Please try again.</p>';
        }
    };

    checkAvailabilityButton.addEventListener('click', updateCanoeAvailability);
});
