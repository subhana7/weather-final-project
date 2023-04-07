let apiKey = "2ff29bed3181c3526c35cc5408037f85";
let city = "new york";
let units = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);