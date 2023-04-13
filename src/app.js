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


function displayForcast() {
    let forcastElement = document.querySelector("#forcast");

    let days = ["tue", "wed", "thur", "fri", "sat", "sun"];
    let forcastHTML = `<div class="row">`;
    
    days.forEach(function (day) {
    forcastHTML = forcastHTML + `
    <div class="col-2">
    <div class="Weather-forcast-date">${day}</div>
     <img src="http://openweathermap.org/img/wn/03n@2x.png" 
     alt=""
     width="45"
     />
    <div class="Weather-forcast-temperature">
     <span class="weather-forcast-max">24&#176</span> <span class="weather-forcast-min">9&#176</span>
    </div>
    </div>
    `;
});
    forcastHTML = forcastHTML + `</div>`;
    forcastElement.innerHTML = forcastHTML;
}


function showTemperature(response) {
    console.log(response);
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
displayForcast();