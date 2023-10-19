// import React, { useState } from "react";
// import "./Styles.css";

// import search_icon from "../image/search.png";
// import clear_icon from "../image/clear.png";
// import cloud_icon from "../image/cloud.png";
// import drizzle_icon from "../image/drizzle.png";
// import rain_icon from "../image/rain.png";
// import snow_icon from "../image/snow.png";

// import wind_icon from "../image/wind.png";
// import humidity_icon from "../image/humidity.png";

// const WeatherApp = () => {
//   let api_key = "f12fcd40479349d940c24f7ea4d7cad7";

//   const [wicon, setWicon] = useState(cloud_icon);

//   const search = async () => {
//     const element = document.getElementsByClassName("cityinput");
//     if (element[0].value === "") {
//       return 0;
//     }

//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

//     let response = await fetch(url);
//     let data = await response.json();
//     const humidity = document.getElementsByClassName("humidity-percent");
//     const wind = document.getElementsByClassName("wind-rate");
//     const temprature = document.getElementsByClassName("weather-temp");
//     const location = document.getElementsByClassName("weather-location");

//     humidity[0].innerHTML = data.main.humidity + "%";
//     wind[0].innerHTML = data.wind.speed + "km/h";
//     temprature[0].innerHTML = data.main.temp + "°c";
//     location[0].innerHTML = data.name;

//     if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
//       setWicon(clear_icon);
//     } else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
//       setWicon(cloud_icon);
//     } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
//       setWicon(drizzle_icon);
//     } else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
//       setWicon(rain_icon);
//     } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
//       setWicon(snow_icon);
//     } else {
//       setWicon(clear_icon);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="top-bar">
//         <input type="text" className="cityinput" placeholder="Search" />
//         <div
//           className="search-icon"
//           onClick={() => {
//             search();
//           }}
//         >
//           <img src={search_icon} alt="Search" />
//         </div>
//       </div>

//       <div className="weather-image">
//         <img src={cloud_icon} alt="Cloud" />
//       </div>
//       <div className="weather-temp">24°c</div>
//       <div className="weather-location">london</div>
//       <div className="data-container">
//         <div className="element">
//           <img src={humidity_icon} alt="" className="icon" />
//           <div className="data">
//             <div className="humidity-percent">64%</div>
//             <div className="text">Humidity</div>
//           </div>
//         </div>

//         <div className="element">
//           <img src={wind_icon} alt="" className="icon" />
//           <div className="data">
//             <div className="wind-rate">18 km/h</div>
//             <div className="text">Wind Speed</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherApp;





import React, { useState } from "react";
import "./Styles.css";

import search_icon from "../image/search.png";
import clear_icon from "../image/clear.png";
import cloud_icon from "../image/cloud.png";
import drizzle_icon from "../image/drizzle.png";
import rain_icon from "../image/rain.png";
import snow_icon from "../image/snow.png";
import wind_icon from "../image/wind.png";
import humidity_icon from "../image/humidity.png";

const WeatherApp = () => {
  const api_key = "f12fcd40479349d940c24f7ea4d7cad7";

  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: "N/A",
    windSpeed: "N/A",
    temperature: "N/A",
    location: "N/A",
  });

  const search = async () => {
    const cityInput = document.querySelector(".cityinput");
    if (!cityInput.value) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      const newWeatherData = {
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
        temperature: `${data.main.temp}°C`,
        location: data.name,
      };

      setWeatherData(newWeatherData);

      // Set weather icon based on weather condition
      const weatherCode = data.weather[0].icon;
      setWeatherIcon(getWeatherIcon(weatherCode));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
      case "01n":
        return clear_icon;
      case "02d":
      case "02n":
        return cloud_icon;
      case "03d":
      case "03n":
        return drizzle_icon;
      case "10d":
      case "10n":
        return rain_icon;
      case "13d":
      case "13n":
        return snow_icon;
      default:
        return cloud_icon;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityinput" placeholder="Search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      <div className="weather-image">
        <img src={weatherIcon} alt="Weather" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="Wind Speed" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
