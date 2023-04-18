function FormatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0{hours}` ;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
    
    return days[day];
}


function displayForcast(response) {
    let forecast = response.data.daily;
    let forcastElement = document.querySelector("#forcast");

    let forcastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forcastHTML = forcastHTML + `
    <div class="col-2">
    <div class="Weather-forcast-date">${formatDay(forecastDay.dt)}</div>
     <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
     alt=""
     width="45"
     />
    <div class="Weather-forcast-temperature">
    <span class="weather-forcast-max">${Math.round(forecastDay.temp.max)}&#176</span> <span class="weather-forcast-min">${Math.round(forecastDay.temp.min)}&#176</span>
    </div>
    </div>
    `;
    }
});
    forcastHTML = forcastHTML + `</div>`;
    forcastElement.innerHTML = forcastHTML;
}

function getforecast(coordinates) {
    console.log(coordinates);
    apiKey = "2ff29bed3181c3526c35cc5408037f85";
    apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForcast);
}


function showTemperature(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let tempElement = document.querySelector("#temp");
     celsiusTemperature = response.data.main.temp;
    tempElement.innerHTML = Math.round(celsiusTemperature);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = FormatDate(response.data.dt*1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getforecast(response.data.coord);
}

function search(city) {
let apiKey = "2ff29bed3181c3526c35cc5408037f85";
let units = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
}

function currentSearch(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#input-city");
    search(cityElement.value);
}

function displayFahenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheiLink.classList.add("active");
    let tempElement = document.querySelector("#temp");
    let fahrenheiTemperature = (celsiusTemperature * 9)/5 + 32;
    tempElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    fahrenheiLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = Math.round(celsiusTemperature);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", currentSearch);

let celsiusTemperature = null;

let fahrenheiLink = document.querySelector("#fahrenheit-link");
fahrenheiLink.addEventListener("click", displayFahenheitTemperature);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("toronto");