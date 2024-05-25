document.addEventListener('DOMContentLoaded', () => {
  const formulaRadios = document.querySelectorAll('input[name="formule"]');
  const timeSelect = document.getElementById('tijd');

  const fetchAvailableTimes = async (formula) => {
      try {
          const response = await fetch(`/api/get_available_times?formula=${formula}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const times = await response.json();
          return times;
      } catch (error) {
          console.error('Error fetching available times:', error);
          return null;
      }
  };

  const updateAvailableTimes = async (formula) => {
      const times = await fetchAvailableTimes(formula);
      if (times !== null) {
          timeSelect.innerHTML = '<option disabled selected>Select a time</option>';
          times.forEach(time => {
              const option = document.createElement('option');
              option.value = time;
              option.textContent = time;
              timeSelect.appendChild(option);
          });
      }
  };

  formulaRadios.forEach(radio => {
      radio.addEventListener('change', () => {
          const formula = radio.value;
          updateAvailableTimes(formula);
      });
  });
});
