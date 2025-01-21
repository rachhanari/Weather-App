const apiKey = 'daac0efa9d08bc96f6e1a2940fe796ea';
const city = document.getElementById("city");
const getWeather = document.getElementById("getWether_button");
const weatherInfo = document.getElementsByClassName("weather-info")[0];

getWeather.addEventListener('click', function () {
    const cityName = city.value;

    if (!cityName) {
        weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
        weatherInfo.style.display = "block";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const date = new Date()

            let iconUrl = '';
            if (data.weather[0].main === "Rain") {
                iconUrl = "https://img.icons8.com/color/48/000000/rain.png";
            } else if (data.weather[0].main === 'Snow') {
                iconUrl = "https://img.icons8.com/color/48/000000/snow.png";
            } else if (data.weather[0].main === 'Clear') {
                iconUrl = "https://img.icons8.com/color/48/000000/sun.png";
            } else if (data.weather[0].main === 'Clouds') {
                iconUrl = "https://img.icons8.com/color/48/000000/clouds.png";
            } else if (data.weather[0].main === 'Thunderstorm') {
                iconUrl = "https://img.icons8.com/color/48/000000/storm.png";
            } else {
                iconUrl = "https://img.icons8.com/color/48/000000/partly-cloudy-day.png";
            }

            const weather_Data = `
                <div class="weather-header">
                    <h2 id="city-name">${data.name}</h2>
                    <div class="weather_time">
                        <p>Current Weather</p>
                        <p id="Time_Date">${date.toDateString()}</p>
                    </div>
                </div>
                <div class="weather-details_container">
                    <div class="weather_temp_container">
                        <div class="weather_img">
                            <img id="weather-icon" src="${iconUrl}" alt="Weather Icon">
                            <span id="temperature">${Math.round(data.main.temp)}°C</span>
                        </div>
                        <div class="feels_like">
                            Feels like: <span id="feels_like_temp">${Math.round(data.main.feels_like)}°C</span>
                        </div>
                    </div>
                    <div class="weather_description">
                        <p id="description">${data.weather[0].description}</p>
                    </div>
                    <div class="details">
                        <div class="tamp_details_container">
                            <div class="tamp_details">
                                <span>Humidity:</span>
                                <p id="humidity">${data.main.humidity}%</p>
                            </div>
                            <div class="tamp_details">
                                <span>Pressure:</span>
                                <p id="pressure">${data.main.pressure} hPa</p>
                            </div>
                            <div class="tamp_details">
                                <span>Sea Level:</span>
                                <p id="sea-level">${data.main.sea_level || 'N/A'} hPa</p>
                            </div>
                            <div class="tamp_details">
                                <span>Ground Level:</span>
                                <p id="grnd-level">${data.main.grnd_level || 'N/A'} hPa</p>
                            </div>
                            <div class="tamp_details">
                                <span>Wind Speed:</span>
                                <p id="wind-speed">${data.wind.speed} m/s</p>
                            </div>
                            <div class="tamp_details">
                                <span>Wind Gusts:</span>
                                <p id="wind-gusts">${data.wind.gust || 'N/A'} m/s</p>
                            </div>
                        </div>
                        <div class="tamp_details">
                            <span>Visibility:</span>
                            <p id="visibility">${data.visibility} m</p>
                        </div>
                    </div>
                </div>
            `;
            weatherInfo.innerHTML = weather_Data;
            weatherInfo.style.display = "block";
        })
        .catch(err => {
            weatherInfo.innerHTML = "<p>City not found or other error occurred.</p>";
            weatherInfo.style.display = "block";
        });
});
