import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
import styles from "./WeatherChart.module.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class WeatherChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      responsive: true,
      backgroundColor: "#fff",
      defaultFontFamily: "Arial",
      //theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Temperature for the next five days",
        fontFamily: "Open sans, sans-serif"
      },
      axisY: {
        title: "Temperature",
        includeZero: false,
        suffix: "°C"
      },
      axisX: {
        title: "Time",
        prefix: ""
      },
      data: [
        {
          type: "line",
          toolTipContent: "{x}: {y}°C",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 }
          ]
        }
      ]
    };

    return (
      <div className={styles.ChartContainer}>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default WeatherChart;
