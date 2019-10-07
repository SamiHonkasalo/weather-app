import React from "react";

import styles from "./CurrentWeather.module.css";

const currentWeather = props => {
  // Convert sunrise and sunset times to readable time
  const convertTime = time => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(time * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    // Will display time in HH:MM:SS format
    let formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };

  const sunrise = convertTime(props.sunrise);
  const sunset = convertTime(props.sunset);

  return (
    <div className={styles.CurrentWeather}>
      <h1>Current weather of {props.searchLocation}</h1>
      <p>Closest station name {props.location}</p>
      <h2>
        Cloudiness: {props.cloudDesc} ({props.clouds})%
      </h2>
      <h2>Wind speed: {props.wind.toFixed(1)} m/s</h2>
      <h2>
        Temperature: {(parseInt(props.temperature) - 273.15).toFixed(1)} °C /{" "}
        {((parseInt(props.temperature) * 9) / 5 - 459.67).toFixed(1)} °F
      </h2>
      <h2>Humidity: </h2> <p>{props.humidity} %</p>
      <h2>Pressure: {props.pressure} hpa</h2>
      <h2>Sunrise at: {sunrise}</h2>
      <h2>Sunset at: {sunset}</h2>
    </div>
  );
};

export default currentWeather;
