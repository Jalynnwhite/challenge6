const weatherKey = '9fa0dffad8b45b70ab89726af11bed91';
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast`;

const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const currentWeatherDiv = document.getElementById('currentWeather');
    const forecastDiv = document.getElementById('forecast');

    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const cityName = cityInput.value.trim();
      if (cityName !== '') {
        // Perform the weather API request
        getWeatherData(cityName);
      }
    });

    async function getWeatherData(cityName) {
      try {
        const response = await fetch(`${weatherURL}?q=${cityName}&appid=${weatherKey}`);
        const data = await response.json();

        console.log('Weather Data:', data); 
        
        
        displayCurrentWeather(data);
        displayForecast(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    function displayCurrentWeather(data) {
        const cityName = data.city.name;
        const minTemp = data.list[0].main.temp_min;
        const maxTemp = data.list[0].main.temp_max;

      // Implement logic to display current weather data
      currentWeatherDiv.innerHTML = `<h2>${cityName}</h2> <p>Min Temperature: ${minTemp} K</p>
      <p>Max Temperature: ${maxTemp} K</p>`;
    }

    function displayForecast(data) {
        const forecastEntry = data.list;

        forecastDiv.innerHTML = '';

        forecastEntry.forEach(entry => {
            
            const date = entry.dt_txt;
            const temperature = entry.main.temp;
            const humidity = entry.main.humidity;
            const windSpeed = entry.wind.speed;
        
            // Create HTML elements for the forecast entry
            const forecastEntryDiv = document.createElement('div');
            forecastEntryDiv.classList.add('forecast-entry');
            forecastEntryDiv.innerHTML = `
              <p>Date: ${date}</p>
              <p>Temperature: ${temperature} K</p>
              <p>Humidity: ${humidity}%</p>
              <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        
            // Append the forecast entry to the forecastDiv
            forecastDiv.appendChild(forecastEntryDiv);
          });
         
     
            }