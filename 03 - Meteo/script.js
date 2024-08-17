const htmlElement = document.documentElement;
const suggestion = document.querySelector(".suggestion");
const weatherIcon = document.querySelector(".weather-icon");
const weatherLocation = document.querySelector(".weather-location");
const weatherTemperature = document.querySelector(".weather-temperature");

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError() {
  weatherLocation.innerText = "";
  weatherIcon.alt = "Geolocation disattivata";
  weatherIcon.src = "images/geolocation_disabled.png";
  suggestion.innerText = "Non hai abilitato la localizzazione";

  htmlElement.className = "";
}

function onSuccess() {
  weatherLocation.innerText = "";
  weatherIcon.alt = "Geolocation disattivata";
  weatherIcon.src = "images/geolocation_disabled.png";
  suggestion.innerText = "Non hai abilitato la localizzazione";

  htmlElement.className = "";
}
