document.addEventListener('DOMContentLoaded', () => {
    const bookingDateInput = document.getElementById('datePicker');
    const bookingTimeInput = document.getElementById('tijd'); // Add time input element
    const checkAvailabilityButton = document.getElementById('checkAvailability');
    const canoeAvailabilitySection = document.getElementById('canoeAvailability');

    const fetchAvailableCanoes = async (date, time) => {
        try {
            console.log(`Fetching available canoes for date: ${date} and time: ${time}`);
            const response = await fetch(`/api/check_availability?date=${date}&time=${time}`);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const textData = await response.text(); // Fetch as text first
            console.log('Raw response text:', textData);
            const data = JSON.parse(textData); // Then parse it to JSON
            return data;
        } catch (error) {
            console.error('Error fetching available canoes:', error);
            return null;
        }
    };

    const updateCanoeAvailability = async () => {
        const selectedDate = bookingDateInput.value;
        const selectedTime = bookingTimeInput.value; // Get the selected time
        if (!selectedDate || !selectedTime) {
            canoeAvailabilitySection.innerHTML = '<p>Please select both a date and a time.</p>';
            return;
        }

        const availability = await fetchAvailableCanoes(selectedDate, selectedTime);
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
