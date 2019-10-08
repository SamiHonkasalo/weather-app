import React from "react";

import styles from "./CurrentWeather.module.css";
import WeatherLine from "./WeatherLine";

const currentWeather = props => {
  // Convert sunrise and sunset times to readable time from unix time
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

  // Conver the cloud amount to a string
  console.log(props.clouds);
  //const cloudInt = props.clouds.parseInt();
  let cloudStr = "";
  if (props.clouds >= 0 && props.clouds <= 5) {
    cloudStr = "Clear";
  }
  if (props.clouds > 5 && props.clouds <= 25) {
    cloudStr = "Few";
  }
  if (props.clouds > 25 && props.clouds <= 50) {
    cloudStr = "Scattered";
  }
  if (props.clouds > 50 && props.clouds <= 87) {
    cloudStr = "Broken";
  }
  if (props.clouds > 87 && props.clouds <= 100) {
    cloudStr = "Overcast";
  }

  // Get current time and compare to sunset/sunrise and display the difference
  const curTime = new Date();
  console.log(curTime);

  // Times are users local time
  const sunrise = convertTime(props.sunrise);
  const sunset = convertTime(props.sunset);

  // Convert previous times to the locations time
  // First get target location timezone offset
  const targetOffset = props.timezone;
  // Then compare it to user timezone and then calculate the difference
  const localTime = new Date().getTimezoneOffset() * -1;
  // Convert time to seconds
  const targetOffsetS = targetOffset - localTime * 60;
  // Calculate the difference for the prop
  const sunsetLocal = convertTime(props.sunset + targetOffsetS);
  // Calculate the difference for the prop
  const sunriseLocal = convertTime(props.sunrise + targetOffsetS);

  // Use the custom WeatherLine component for each line
  return (
    <div className={styles.CurrentWeather}>
      <WeatherLine label="Closest station name" text={props.location} />
      <WeatherLine label="Weather description:" text={props.weatherDesc} />
      <WeatherLine
        label="Cloudiness:"
        text={" " + cloudStr + " (" + props.clouds + "%)"}
      />
      <WeatherLine label="Wind speed:" text={props.wind.toFixed(1) + " m/s"} />
      <WeatherLine
        label="Temperature:"
        text={
          (parseInt(props.temperature) - 273.15).toFixed(1) +
          " °C / " +
          ((parseInt(props.temperature) * 9) / 5 - 459.67).toFixed(1) +
          " °F"
        }
      />
      <WeatherLine label="Humidity:" text={props.humidity + " %"} />
      <WeatherLine label="Pressure:" text={props.pressure + " hpa"} />
      <WeatherLine
        label="Sunrise at:"
        text={sunrise + " (at " + sunriseLocal + " local time)"}
      />
      <WeatherLine
        label="Sunset at:"
        text={sunset + " (at " + sunsetLocal + " local time)"}
      />
    </div>
  );
};

export default currentWeather;
