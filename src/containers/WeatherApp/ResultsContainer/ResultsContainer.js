import React, { Component } from "react";

import styles from "./ResultsContainer.module.css";
import Tabs from "../../../components/UI/Tabs/Tabs";
import CurrentWeather from "../../../components/Weather/CurrentWeather";
import WeatherChart from "../WeatherChart/WeatherChart";
import HistoryData from "../HistoryData/HistoryData";

class ResultsContainer extends Component {
  state = {
    selectedView: 0,
    loading: false
  };

  // Handler to pass the clicked tab to the main container
  tabChangedHandler = tabNumber => {
    const selectedView = parseInt(tabNumber);
    this.setState({ selectedView: selectedView });
  };
  render() {
    // Selected view 0 = current/5days, 1 = 10 day forecast, 2 = Historical data
    let results = null;
    if (this.state.selectedView === 0) {
      results = (
        <div className={styles.ResultsContainer}>
          <h1> {"Current weather in " + this.props.city} </h1>{" "}
          <CurrentWeather
            country={this.props.current.sys.country}
            clouds={this.props.current.clouds.all}
            wind={this.props.current.wind.speed}
            weatherDesc={this.props.current.weather[0].description}
            location={this.props.current.name}
            temperature={this.props.current.main.temp}
            humidity={this.props.current.main.humidity}
            pressure={this.props.current.main.pressure}
            sunset={this.props.current.sys.sunset}
            sunrise={this.props.current.sys.sunrise}
            timezone={this.props.current.timezone}
          />{" "}
          <WeatherChart data={this.props.data5} type={0} />{" "}
        </div>
      );
    }
    if (this.state.selectedView === 1) {
      results = (
        <div className={styles.ResultsContainer}>
          <h1> {"Ten day forecast for " + this.props.city} </h1>{" "}
          <WeatherChart data={this.props.data10} type={1} />{" "}
        </div>
      );
    }
    if (this.state.selectedView === 2) {
      results = (
        <div className={styles.ResultsContainer}>
          <h1> {"Historical weather for " + this.props.city} </h1>{" "}
          <HistoryData />
        </div>
      );
    }

    return (
      <div className={styles.Wrapper}>
        <Tabs
          className={styles.Tabs}
          clicked={n => this.tabChangedHandler(n)}
        />{" "}
        {results}{" "}
      </div>
    );
  }
}

export default ResultsContainer;
