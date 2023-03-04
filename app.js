// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// App consts and vars

const KELVIN = 273
const key = "0940a285fc5f090065f98e0146bfac29";

// check if browser support
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display= "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude  = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display= "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        }).then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        }).then(function(){
            displayWeather();
        });
}

// Display Weather to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    console.log(iconElement.innerHTML);
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}. ${weather.country}`
}

// C to F conversion

function celsiusToFahrenheit(temperature){
    return (temperature*9/5) +32;
};

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined)
        return;
    if(weather.temperature.unit === "celsius") {
        let fahrenheit = Math.floor(celsiusToFahrenheit(weather.temperature.value));
        weather.temperature.unit = "fahrenheit";
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});