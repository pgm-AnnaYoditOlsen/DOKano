const URL_API_FORECAST =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ghent?unitGroup=metric&key=9TJLWLCGFWK4AY4VSMB9KAC2Z&contentType=json";

const $weather = document.querySelector("#weather");


// Fetch weather forecast data
fetch(URL_API_FORECAST)
  .then((response) => response.json())
  .then((data) => {
    console.log("Raw data from API:", data); // Log the raw data for inspection
    $weather.innerHTML = getHTMLWeatherForecast(data);
  })
  .catch((error) => {
    console.error("Error fetching weather forecast data:", error);
  });

function getDayOfWeek(localtime) {
  const daysOfWeek = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  const months = [
    "jan",
    "feb",
    "mrt",
    "apr",
    "mei",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ];
  const date = new Date(localtime);
  const dayIndex = date.getDay();
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return {
    dayOfWeek: daysOfWeek[dayIndex],
    dayOfMonth: dayOfMonth,
    month: month,
  };
}

// Generate HTML for weather forecast
function getHTMLWeatherForecast(w) {
  const forecastDays = w.days.slice(0, 7); // Only take the next 7 days

  if (!forecastDays || !Array.isArray(forecastDays)) {
    console.error("Error: Forecast data is missing or in the wrong format.");
    return ""; // Return an empty string or handle the error in an appropriate way
  }

  return forecastDays
    .map((forecastDay) => {
      const { dayOfWeek, dayOfMonth, month } = getDayOfWeek(forecastDay.datetime);
      const isWeekend = dayOfWeek === "Za" || dayOfWeek === "Zo";

      return `
        <div class="weather-ghent ${isWeekend ? 'weekend' : ''}">
          <h2 class="day text-3xl">${dayOfWeek}</h2>
          <div class="text-2xl flex date">
            <p>${dayOfMonth}</p>
            <p>${month}</p>
          </div>
          <div class="weather-icon">
          <img src="assets/img/weather/${forecastDay.icon}.svg" alt="sunny/rain/night">
          </div>  
          <div>
            <span class="text-4xl">${forecastDay.tempmax}C°</span>
          </div>
        </div>`;
    })
    .join("");
}
