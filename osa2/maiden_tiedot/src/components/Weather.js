import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get(
        `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&q=${country.capital}&units=metric`
      )
      .then((response) => {
        setWeather([response.data]);
      });
  }, []);

  if (weather.length > 0) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather[0].main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`}
          alt="Weather icon"
        ></img>
        <p>wind: {weather[0].wind.speed} m/s</p>
      </div>
    );
  }
};

export default Weather;
