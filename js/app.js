const API = "9ef12bc802f7a425a0a46bc5e5d5ffc8";

function formatDate(timestamp) {
    let dateElement = new Date(timestamp);
    let hours = dateElement.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    };
    let minutes = dateElement.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    const days = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday", "Friday", "Saturday"]
    return `${days[dateElement.getDay()]} ${hours}:${minutes}`;
}

function displayTempetature(response) {
    let currentTemperature = document.querySelector("#currentTemperature");
    let city = document.querySelector("#currentCity");
    let wind = document.querySelector("#wind");
    let humidity = document.querySelector("#humidity");
    let descriptionElement = document.querySelector("#weather");
    let dateElement = document.querySelector("#time");
    let iconElement = document.querySelector("#image");

    celsiusTemperature = response.data.main.temp;
    
    currentTemperature.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    wind.innerHTML = Math.round(response.data.wind.speed);
    humidity.innerHTML = response.data.main.humidity;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
};

function search(city) {
    let apiKey = "9ef12bc802f7a425a0a46bc5e5d5ffc8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTempetature);
};

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city_input");
    search(cityInputElement.value);
};

let submitButton = document.querySelector("form");
submitButton.addEventListener("submit", handleSubmit);

function fahrenheit(event) {
    event.preventDefault();
    let newDegrees = document.querySelector("#currentTemperature");
    clickCelsius.classList.remove("active");
    clickFahrenheit.classList.add("active");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    newDegrees.innerHTML = Math.round(fahrenheiTemperature);
};

let celsiusTemperature = null;

let clickFahrenheit = document.querySelector(".fahrenheit");
clickFahrenheit.addEventListener("click", fahrenheit);


function celsius(event) {
    event.preventDefault();
    let newDegrees = document.querySelector("#currentTemperature");
    clickCelsius.classList.add("active");
    clickFahrenheit.classList.remove("active");
    newDegrees.innerHTML = Math.round(celsiusTemperature);
}

let clickCelsius = document.querySelector(".celsius");
clickCelsius.addEventListener("click", celsius);

search("New York");

function coords(position) {
    const URLAPI = "https://api.openweathermap.org/data/2.5/weather";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios.get(URLAPI, {
        params: { units: "metric", lat: lat, lon: lon, appid: API }
      })
      .then((response) => {
        let currentTemperature = document.querySelector("#currentTemperature");
        celsiusTemperature = response.data.main.temp;
        currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}`
        let city = document.querySelector("#currentCity");
        let showCity = response.data.name;
        let showCountry = response.data.sys.country;
        city.innerHTML = `${showCity}, ${showCountry}`;
        let wind = document.querySelector("#wind");
        let currentWind = response.data.wind.speed;
        wind.innerHTML = `${currentWind}`;
        let weather = document.querySelector("#weather");
        let currentWeather= response.data.weather[0].main;
        weather.innerHTML = `${currentWeather}`;
        let humidity = document.querySelector("#humidity");
        let currentHumidity = response.data.main.humidity;
        humidity.innerHTML = `${Math.round(currentHumidity)}`;
        let imageIcon = document.querySelector("#image");
        imageIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        let dateElement = document.querySelector("#time");
        dateElement.innerHTML = formatDate(response.data.dt * 1000);
      })

}

function showCurrentCity(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(coords);
}
let currentCity = document.querySelector("#current");
currentCity.addEventListener('click', showCurrentCity)


