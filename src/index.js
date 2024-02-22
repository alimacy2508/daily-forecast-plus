function newCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = cityElement.value;
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", newCity);
