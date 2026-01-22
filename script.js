const apiKey = 'YOUR_API_KEY'; // Get from OpenWeatherMap
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    getWeather(city);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}