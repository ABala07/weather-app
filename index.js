const apikey = "75cb8a7226ac24eb1f57b0b379e31d2a";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form")
.addEventListener('submit', (event) => {
  event.preventDefault();

  const cityValue = cityInputEl.value;
  
  getWeatherData(cityValue);

})


async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    const temperature = Math.round(data.main.temp);
    
    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels Like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,

    ]



    

    weatherDataEl.querySelector(".icon")
    .innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Wheather Icon">`;

    weatherDataEl.querySelector(".temperature")
    .textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description")
    .textContent = `${description}`;

    weatherDataEl.querySelector(".details")
    .innerHTML = details.map((details) => `<div>${details}</div>`).join("");



  } catch (error) {
    
    weatherDataEl.querySelector(".icon")
    .innerHTML = "";
    weatherDataEl.querySelector(".temperature")
    .textContent = "";

    weatherDataEl.querySelector(".description")
    .textContent = "An error is happening. Please try again later!";

    weatherDataEl.querySelector(".details")
    .innerHTML = "";
  }

}