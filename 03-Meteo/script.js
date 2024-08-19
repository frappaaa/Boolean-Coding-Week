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

async function onSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const API_KEY = "1b9a051129a7afcc732aaeb6795235de";
  const units = "metric";
  const lang = "it";

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);

  const iconCode = data.weather[0].icon;
  const description = data.weather[0].description;

  weatherLocation.innerText = data.name;
  weatherIcon.alt = description;
  weatherIcon.src = `images/${iconCode}.png`;
  weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
  suggestion.innerText = getSuggestion(iconCode);

  htmlElement.className = "";
}

function getSuggestion(iconCode) {
  const suggestions = {
    "01d": "Ricordati la crema solare!",
    "01n": "Buonanotte!",
    "02d": "Oggi il sole va e viene...",
    "02n": "Attenti ai lupi mannari...",
    "03d": "Luce perfetta per fare foto!",
    "03n": "Dormi sereno :)",
    "04d": "Che cielo grigio :(",
    "04n": "Non si vede nemmeno la luna!",
    "09d": "Prendi l'ombrello",
    "09n": "Copriti bene!",
    "10d": "Prendi l'ombrello",
    "10n": "Copriti bene!",
    "11d": "Attento ai fulmini!",
    "11n": "I lampi accendono la notte!",
    "13d": "Esci a fare un pupazzo di neve!",
    "13n": "Notte perfetta per stare sotto il piumone!",
    "50d": "Accendi i fendinebbia!",
    "50n": "Guida con prudenza!",
  };

  return suggestions[iconCode];
}
