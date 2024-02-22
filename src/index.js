function newCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");

  let cityCapital = cityElement.value.charAt(0).toUpperCase();
  let newCity = cityCapital + cityElement.value.slice(1);
  city.innerHTML = newCity;

  let apiKey = "bbco0f50t952db4519a3613cfbc4bfb3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newTemperature);
}

function newTemperature(response) {
  let currentTemperature = document.querySelector(".weather-temperature");
  let replacementTemperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = replacementTemperature;
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", newCity);
