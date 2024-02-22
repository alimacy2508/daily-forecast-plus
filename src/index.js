function newCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-form-input");

  let apiKey = "bbco0f50t952db4519a3613cfbc4bfb3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newTemperatureCity);
}

function newTemperatureCity(response) {
  let currentTemperature = document.querySelector(".weather-temperature");
  let replacementTemperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = replacementTemperature;

  let city = document.querySelector("#city");
  let newCity = response.data.city;
  city.innerHTML = newCity;
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", newCity);
