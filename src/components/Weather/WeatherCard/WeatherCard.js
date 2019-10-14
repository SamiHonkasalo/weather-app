import React from "react";

import styles from "./WeatherCard.module.css";
import humidityIcon from "../../../assets/images/004-rain.svg";
import windIcon from "../../../assets/images/wind.svg";

const currentWeather = props => {
  // Function to convert sunrise and sunset times to readable time from unix time
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

  // Get current time and compare to sunset/sunrise and display both also in the target place time

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

  // Convert current weather time
  let currentDate = new Date(props.weatherTime * 1000);
  // Date part from the timestamp
  let weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let weekdayName = weekday[currentDate.getDay()];
  let date = currentDate.getDate();
  // Get month
  let month = [];
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  let monthName = month[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  // Hours part from the timestamp
  let hours = currentDate.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + currentDate.getMinutes();

  // Will display time in DDD DD.MMM/YYYY HH:MM format
  let weatherTime =
    weekdayName +
    " " +
    date +
    ". " +
    monthName +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2);

  // Get the icon matching the weather
  const imgSrc =
    "http://openweathermap.org/img/wn/" + props.weatherIcon + "@2x.png";

  return (
    <div className={styles.WeatherCard}>
      <div className={styles.Title}>
        <h1>{props.city}</h1>
        <h3 className={styles.Station}>{"Station " + props.location}</h3>
        <h3 className={styles.Time}>{weatherTime}</h3>
      </div>

      <div className={styles.Temperature}>
        <h1>{parseInt(props.temperature - 273.15).toFixed(1) + " °C"}</h1>
      </div>

      <div className={styles.Icon}>
        <img src={imgSrc} alt={props.weatherDesc} />
      </div>

      <div className={styles.Description}>
        <h3>{props.weatherDesc}</h3>
      </div>

      <div className={styles.Humidity}>
        <img src={humidityIcon} alt="Humidity" />
        <h3>{props.humidity + " %"}</h3>
      </div>

      <div className={styles.Wind}>
        <img src={windIcon} alt="Wind" />
        <h3>{props.windSpeed + " m/s"}</h3>
      </div>

      <div className={styles.Cloud}>
        <img src="" alt="" />
        <h3>{cloudStr + " (" + props.clouds + " %)"}</h3>
      </div>

      <div className={styles.Rain}>
        <img src="" alt="" />
        <h3>{props.rain + " mm"}</h3>
      </div>

      <div className={styles.Snow}>
        <img src="" alt="" />
        <h3>{props.snow + " mm"}</h3>
      </div>

      <div className={styles.Sunrise}>
        <img src="" alt="" />
        <h3>{sunrise + " (" + sunriseLocal + " local)"}</h3>
      </div>

      <div className={styles.Sunset}>
        <img src="" alt="" />
        <h3>{sunset + " (" + sunsetLocal + " local)"}</h3>
      </div>
    </div>

    //   <WeatherLine label="Closest station:" text={props.location} />
    //   <WeatherLine label={"Current Weather:"} />
    //   <div className={styles.Left}>
    //     <WeatherLine label="Weather description" text={props.weatherDesc} />
    //     <WeatherLine
    //       label="Cloudiness:"
    //       text={" " + cloudStr + " (" + props.clouds + "%)"}
    //     />
    //     <WeatherLine
    //       label="Wind speed:"
    //       text={props.wind.toFixed(1) + " m/s"}
    //     />
    //     <WeatherLine
    //       label="Temperature:"
    //       text={
    //         (parseInt(props.temperature) - 273.15).toFixed(1) +
    //         " °C / " +
    //         ((parseInt(props.temperature) * 9) / 5 - 459.67).toFixed(1) +
    //         " °F"
    //       }
    //     />
    //   </div>
    //   <div className={styles.Right}>
    //     <WeatherLine label="Humidity:" text={props.humidity + " %"} />
    //     <WeatherLine label="Pressure:" text={props.pressure + " hpa"} />
    //     <WeatherLine
    //       label="Sunrise at:"
    //       text={sunrise + " (at " + sunriseLocal + " local time)"}
    //     />
    //     <WeatherLine
    //       label="Sunset at:"
    //       text={sunset + " (at " + sunsetLocal + " local time)"}
    //     />
    //   </div>
    // </div>
  );
};

export default currentWeather;
