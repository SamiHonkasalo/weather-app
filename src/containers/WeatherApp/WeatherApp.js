import React, { Component } from "react";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import SearchBar from "./SearchBar/SearchBar";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import CurrentWeather from "../../components/Weather/CurrentWeather";

class WeatherApp extends Component {
  state = {
    selectedCity: null,
    weatherData: null,
    showResults: false
  };

  onSearchHandler = selection => {
    // Use Ajax to get the current weather of the location
    console.log(selection);
    this.setState({ selectedCity: selection });

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          selection.lat +
          "&lon=" +
          selection.lon +
          "&appid=3084b8c99da8af75a8e7853b3cd9a5f7"
      )
      .then(response => {
        console.log(response);
        this.setState({ weatherData: response.data, showResults: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let results = null;
    if (this.state.showResults) {
      results = (
        <CurrentWeather
          searchLocation={this.state.selectedCity.name}
          country={this.state.weatherData.sys.country}
          clouds={this.state.weatherData.clouds.all}
          wind={this.state.weatherData.wind.speed}
          cloudDesc={this.state.weatherData.weather[0].description}
          location={this.state.weatherData.name}
          temperature={this.state.weatherData.main.temp}
          humidity={this.state.weatherData.main.humidity}
          pressure={this.state.weatherData.main.pressure}
          sunset={this.state.weatherData.sys.sunset}
          sunrise={this.state.weatherData.sys.sunrise}
        />
      );
    }
    return (
      <Aux>
        <SearchBar search={this.onSearchHandler} />
        {results}
      </Aux>
    );
  }
}

export default withErrorHandler(WeatherApp, axios);
