const API = "9ef12bc802f7a425a0a46bc5e5d5ffc8";

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
            </div>  
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="66">
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
             </div>
        </div>`
        }
    })

  

    forecastHTML = forecastHTML + `</div>`

    forecastElement.innerHTML = forecastHTML;
} 

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
    const days = ["Sunday", "Monday", "Tuesday ", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[dateElement.getDay()]} ${hours}:${minutes}`;
};

function getForecast(coordinates) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
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
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
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


