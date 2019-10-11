import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
import styles from "./WeatherChart.module.css";
import { tsImportEqualsDeclaration } from "@babel/types";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class WeatherChart extends Component {
  state = {
    temperatureData: [],
    tempMin: [],
    tempMax: [],
    rainData: [],
    snowData: [],
    options: {},
    weatherIcons: []
  };

  constructor(props) {
    super(props);
    // Create a reference to the chart
    this.chart = React.createRef();
    this.container = React.createRef();

    // Check the props to determine if this is used as a 10day or 5day chart or historical chart
    // 5 day specific options
    if (this.props.type === 0) {
      this.state.options.xInterval = 12;
      this.state.options.xIntervalType = "hour";
      this.state.options.xValueFormatString = "DD-MMM HH:mm";
      this.state.options.title = "Time";
      this.state.options.titleText = "5 day weather";
    }
    // 10 day specific options
    if (this.props.type === 1) {
      this.state.options.xInterval = 24;
      this.state.options.xIntervalType = "hour";
      this.state.options.xValueFormatString = "DD-MMM";
      this.state.options.title = "Day";
      this.state.options.tenday = true;
      this.state.options.titleText = "10 day weather";
    }

    // Go through the input data and render it to the graph
    const data = this.props.data;

    // First the temperatures + the dates
    // Consts for the data
    const temperatureData = [];
    const temperatureMin = [];
    const temperatureMax = [];
    const rainData = [];
    const snowData = [];

    // Have to use a case structure, because the data is in a different format for different forecasts
    switch (this.props.type) {
      // 5 day (hourly 3h)
      case 0:
        // For-loop to cycle through the elements
        data.list.forEach(el => {
          temperatureData.push({
            // Convert the unix time format to readable
            x: new Date(el.dt * 1000),
            y: parseFloat((el.main.temp - 273.15).toFixed(1)),
            desc: el.weather[0].description,
            icon: el.weather[0].icon
          });

          // Check if rain or snow
          let rainAmount = 0;
          let snowAmount = 0;

          if (typeof el.rain !== "undefined") {
            if (typeof el.rain["3h"] !== "undefined") {
              rainAmount = el.rain["3h"];
            } else {
              rainAmount = el.rain;
            }
          }
          if (typeof el.snow !== "undefined") {
            if (typeof el.snow["3h"] !== "undefined") {
              snowAmount = el.snow["3h"];
            } else {
              snowAmount = el.snow;
            }
          }

          // Rain amount
          rainData.push({
            x: new Date(el.dt * 1000),
            y: rainAmount
          });

          // Snow amount
          snowData.push({
            x: new Date(el.dt * 1000),
            y: snowAmount
          });
        });

        break;

      // 10 day (daily)
      case 1:
        // For-loop to cycle through the elements
        data.list.forEach(el => {
          // Change the time to be at 0:00
          let date = new Date(el.dt * 1000);
          date.setHours(3);
          temperatureMin.push({
            // Convert the unix time format to readable
            x: date,
            y: parseFloat((el.temp.min - 273.15).toFixed(1)),
            desc: el.weather[0].description,
            icon: el.weather[0].icon
          });

          temperatureMax.push({
            // Convert the unix time format to readable
            x: date,
            y: parseFloat((el.temp.max - 273.15).toFixed(1))
          });

          // Check if rain or snow
          let rainAmount = 0;
          let snowAmount = 0;

          if (typeof el.rain !== "undefined") {
            if (typeof el.rain["3h"] !== "undefined") {
              rainAmount = el.rain["3h"];
            } else {
              rainAmount = el.rain;
            }
          }
          if (typeof el.snow !== "undefined") {
            if (typeof el.snow["3h"] !== "undefined") {
              snowAmount = el.snow["3h"];
            } else {
              snowAmount = el.snow;
            }
          }

          // Rain amount
          rainData.push({
            x: date,
            y: rainAmount
          });

          // Snow amount
          snowData.push({
            x: date,
            y: snowAmount
          });
        });

        break;

      default:
        break;
    }
    this.state.temperatureData = temperatureData;
    this.state.temperatureMin = temperatureMin;
    this.state.temperatureMax = temperatureMax;
    this.state.rainData = rainData;
    this.state.snowData = snowData;
  }

  positionImage = (chart, image, index) => {
    var imageCenter = chart.axisX[0].convertValueToPixel(
      chart.data[0].dataPoints[index].x
    );
    var imageTop = chart.axisY[0].convertValueToPixel(
      chart.axisY[0].maximum
    );
    console.log(image)
    console.log(imageCenter)
    console.log(imageTop)

    // image.width("40px").css({
    //   left: imageCenter - 20 + "px",
    //   position: "absolute",
    //   top: imageTop + "px"
    // });
  };

  addImages=(chart) => {
    let images = [];
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
      var dpsName = chart.data[0].dataPoints[i].icon;
      if (dpsName === "10d") {
        images.push(
          "<img src=https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/cloudy.png/>"
        );
      } else {
        images.push(
          "<img src=https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/cloudy.png/>"
        );
      }
      // } else if (dpsName == "rainy") {
      //   images.push(
      //     $("<img>").attr(
      //       "src",
      //       "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/rainy.png"
      //     )
      //   );
      // } else if (dpsName == "sunny") {
      //   images.push(
      //     $("<img>").attr(
      //       "src",
      //       "https://canvasjs.com/wp-content/uploads/images/gallery/gallery-overview/sunny.png"
      //     )
      //   );
      // }

      // images[i]
      //   .attr("class", dpsName)
      //   .appendTo($("#chartContainer>.canvasjs-chart-container"));
      this.positionImage(chart,images[i], i);
      return images;
    };
  }

componentDidMount() {
    // Logging the chart data etc
    //console.log(this.chart.current.chart);

    const icons = this.addImages(this.chart.current.chart);
    this.setState({weatherIcons:icons})
    

    // $( window ).resize(function() {
    // 	var cloudyCounter = 0, rainyCounter = 0, sunnyCounter = 0;
    // 	var imageCenter = 0;
    // 	for(var i=0;i<chart.data[0].dataPoints.length;i++) {
    // 		imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
    // 		if(chart.data[0].dataPoints[i].name == "cloudy") {
    // 			$(".cloudy").eq(cloudyCounter++).css({ "left": imageCenter});
    // 		} else if(chart.data[0].dataPoints[i].name == "rainy") {
    // 			$(".rainy").eq(rainyCounter++).css({ "left": imageCenter});
    // 		} else if(chart.data[0].dataPoints[i].name == "sunny") {
    // 			$(".sunny").eq(sunnyCounter++).css({ "left": imageCenter});
    // 		}
    // 	}
    // });
  }

  render() {
    const options = {
      animationEnabled: true,
      animationDuration: 1000,
      exportEnabled: false,
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: "#fff",
      fontFamily: "Open sans, sans-serif",
      title: {
        text: this.state.options.titleText,
        fontFamily: "Open sans, sans-serif"
      },
      axisY: {
        title: "Temperature",
        includeZero: false,
        suffix: "°C"
      },
      axisY2: {
        title: "Rain/Snow",
        includeZero: false,
        suffix: "mm"
      },
      axisX: {
        title: this.state.options.title,
        interval: this.state.options.xInterval,
        intervalType: this.state.options.xIntervalType,
        valueFormatString: this.state.options.xValueFormatString,
        labelAngle: -45,
        labelFontSize: 12
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "line",
          name: "Temperature",
          showInLegend: true,
          toolTipContent:
            "{x}: <br> <span style='\"'color: {color};'\"'>{name}</span>: {y}°C",
          xValueFormatString: this.state.options.xValueFormatString,
          lineColor: "#b31483",
          color: "#b31483",
          markerColor: "#b31483",
          dataPoints: [...this.state.temperatureData]
        },
        {
          type: "line",
          name: "Temperature Max",
          visible: this.state.options.tenday,
          showInLegend: this.state.options.tenday,
          toolTipContent:
            "{x}: <br> <span style='\"'color: {color};'\"'>{name}</span>: {y}°C",
          xValueFormatString: this.state.options.xValueFormatString,
          lineColor: "#eb0000",
          color: "#eb0000",
          markerColor: "#eb0000",
          dataPoints: [...this.state.temperatureMax]
        },
        {
          type: "line",
          name: "Temperature Min",
          visible: this.state.options.tenday,
          showInLegend: this.state.options.tenday,
          toolTipContent:
            "<span style='\"'color: {color};'\"'>{name}</span>: {y}°C",
          xValueFormatString: this.state.options.xValueFormatString,
          lineColor: "#ffeb0a",
          color: "#ffeb0a",
          markerColor: "#ffeb0a",
          dataPoints: [...this.state.temperatureMin]
        },
        {
          type: "column",
          name: "Rain",
          axisYType: "secondary",
          showInLegend: true,
          toolTipContent:
            "<span style='\"'color: {color};'\"'>{name}</span>: {y}mm",
          color: "#003a52",
          fillOpacity: "0.7",
          dataPoints: [...this.state.rainData]
        },
        {
          type: "column",
          name: "Snow",
          axisYType: "secondary",
          showInLegend: true,
          toolTipContent:
            "<span style='\"'color: {color};'\"'>{name}</span>: {y}mm",
          color: "#00a6eb",
          fillOpacity: "0.5",
          dataPoints: [...this.state.snowData]
        }
      ]
    };
    return (
      <div ref={this.container} className={styles.ChartContainer}>
        {this.state.weatherIcons}
        <CanvasJSChart options={options} ref={this.chart} />
      </div>
    );
  }
}

export default WeatherChart;
