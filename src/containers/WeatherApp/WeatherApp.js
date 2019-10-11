import React, { Component } from "react";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import SearchBar from "./SearchBar/SearchBar";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ResultsContainer from "./ResultsContainer/ResultsContainer";
import Spinner from "../../components/UI/Spinner/Spinner";

//ToDo Delete
import HistoryData from "./HistoryData/HistoryData";

class WeatherApp extends Component {
  state = {
    selectedCity: null,
    selectedStation: {
      name: null,
      id: null
    },
    weatherCurrent: null,
    weatherFiveDays: null,
    weatherTenDays: null,
    showResults: false,
    loading: false
  };

  onSearchHandler = selection => {
    // Use Ajax to get the current weather of the location plus the five and ten day forecast
    console.log(selection);
    this.setState({ selectedCity: selection, loading: true });

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
        this.setState({ weatherCurrent: response.data });
        // After the previous query is done, ask for the five day forecast
        axios
          .get(
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
              selection.lat +
              "&lon=" +
              selection.lon +
              "&appid=3084b8c99da8af75a8e7853b3cd9a5f7"
          )
          .then(response => {
            console.log(response);

            // After the previous query is done, ask for the ten day forecast
            axios({
              method: "GET",
              url:
                "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
              headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key":
                  "a9103aeb44mshf6d272c98b4b8bbp18f0c8jsn898845d5ecca"
              },
              params: {
                lat: selection.lat,
                lon: selection.lon,
                cnt: "10"
              }
            })
              .then(response => {
                console.log(response);

                this.setState({
                  weatherTenDays: response.data
                });

                // After the previous query is done, ask for the station number for these cordinates from another API
                axios
                  .get(
                    "https://api.meteostat.net/v1/stations/nearby?lat=" +
                      selection.lat +
                      "&lon=" +
                      selection.lon +
                      "&limit=1&key=Rbe0qZS1"
                    // selection.lat +
                    // "lon=103.83" +
                    // selection.lon +
                    // "&limit=5&key=Rbe0qZS1"
                  )
                  .then(response => {
                    console.log(response);
                    let selectedStation;
                    // Check if the ID exists
                    if (response.data.data.length !== 0) {
                      console.log("if");
                      selectedStation = {
                        name: response.data.data[0].name,
                        id: response.data.data[0].id
                      };
                      this.setState({
                        showResults: true,
                        loading: false,
                        selectedStation: selectedStation
                      });
                    } else {
                      this.setState({
                        showResults: true,
                        loading: false,
                        selectedStation: null
                      });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    this.setState({ loading: false });
                  });
              })
              .catch(error => {
                console.log(error);
                this.setState({ loading: false });
              });

            this.setState({
              weatherFiveDays: response.data
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({ loading: false });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let results = null;
    if (this.state.showResults && !this.state.loading) {
      results = (
        <ResultsContainer
          selectedStation={this.state.selectedStation}
          city={this.state.selectedCity.name}
          current={this.state.weatherCurrent}
          data5={this.state.weatherFiveDays}
          data10={this.state.weatherTenDays}
        ></ResultsContainer>
      );
    }
    let showSpinner = null;
    if (this.state.loading) {
      showSpinner = <Spinner />;
    }
    return (
      <Aux>
        <SearchBar search={this.onSearchHandler} />
        {showSpinner}
        {results}
      </Aux>
    );
  }
}

export default withErrorHandler(WeatherApp, axios);
