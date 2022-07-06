const API = "9ef12bc802f7a425a0a46bc5e5d5ffc8";
const date = new Date();
const days = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday", "Friday", "Saturday"]

let h3 = document.querySelector("h3");

const currentMinutes = ("0" + date.getMinutes()).slice(-2);

h3.innerHTML = `${days[date.getDay()]} ${date.getHours()}:${currentMinutes}`

function day(event) {
    event.preventDefault();
    let city_input = document.querySelector("#city_input");
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${city_input.value}`
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric`, {params:{q: city_input.value, appid: API}}).then((response) => {
        let currentTemperature = document.querySelector("#currentTemperature");
        let temperatureNow = Math.round(response.data.main.temp);
        currentTemperature.innerHTML = `${temperatureNow}`
        let city = document.querySelector("#currentCity");
        let showCity = response.data.name;
        let showCountry = response.data.sys.country;
        city.innerHTML = `${showCity}, ${showCountry}`;
        let wind = document.querySelector("#wind");
        let currentWind = response.data.wind.speed;
        wind.innerHTML = `Wind: ${currentWind}km/h`;
        let weather = document.querySelector("#weather");
        let currentWeather= response.data.weather[0].main;
        weather.innerHTML = `${currentWeather}`;
        let humidity = document.querySelector("#humidity");
        let currentHumidity = response.data.main.humidity;
        humidity.innerHTML = `Humidity: ${Math.round(currentHumidity)}%`;
});
}

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", day);

function fahrenheit(event) {
    event.preventDefault();
    let newDegrees = document.querySelector("h6");
    newDegrees.innerHTML = `${(20 * 9/5) + 32}`
}

let clickFahrenheit = document.querySelector(".fahrenheit");
clickFahrenheit.addEventListener("click", fahrenheit);


function celsius(event) {
    event.preventDefault();
    let newDegrees = document.querySelector("h6");
    newDegrees.innerHTML = `${(68 - 32) * 5/9}`
}

let clickCelsius = document.querySelector(".celsius");
clickCelsius.addEventListener("click", celsius);

function coords(position) {
    const URLAPI = "https://api.openweathermap.org/data/2.5/weather";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios.get(URLAPI, {
        params: { units: "metric", lat: lat, lon: lon, appid: API }
      })
      .then((response) => {
        let currentTemperature = document.querySelector("#currentTemperature");
        let temperatureNow = Math.round(response.data.main.temp);
        currentTemperature.innerHTML = `${temperatureNow}`
        let city = document.querySelector("#currentCity");
        let showCity = response.data.name;
        let showCountry = response.data.sys.country;
        city.innerHTML = `${showCity}, ${showCountry}`;
        let wind = document.querySelector("#wind");
        let currentWind = response.data.wind.speed;
        wind.innerHTML = `Wind: ${currentWind}km/h`;
        let weather = document.querySelector("#weather");
        let currentWeather= response.data.weather[0].main;
        weather.innerHTML = `${currentWeather}`;
        let humidity = document.querySelector("#humidity");
        let currentHumidity = response.data.main.humidity;
        humidity.innerHTML = `Humidity: ${Math.round(currentHumidity)}%`;
      })

}

function showCurrentCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(coords);
}
let currentCity = document.querySelector("#current");
currentCity.addEventListener('click', showCurrentCity)


