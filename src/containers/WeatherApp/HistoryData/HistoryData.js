import React, { Component } from "react";

import DatePicker from "react-datepicker";
import Button from "../../../components/UI/Button/Button";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import styles from "./HistoryData.module.css";

class HistoryData extends Component {
  state = {
    selectedStation: {
      name: null,
      id: null
    },
    selectedView: 0,
    startDate: new Date(),
    endDate: new Date(),
    searchEnabled: false
  };

  constructor(props) {
    super(props);
    this.select = React.createRef();
    this.state.selectedStation = this.props.station;
  }

  componentDidMount() {
    //console.log(this.select)
  }

  selectedViewChangedHandler = () => {
    this.setState({ selectedView: parseInt(this.select.current.value) });
  };

  startDateChangedHandler = date => {
    // Init the end date
    let endDate = new Date(this.state.endDate);
    // If end date is too far from start, also change end date
    const diffTime = endDate - date;
    // If dayselection, limit to 3 day difference
    if (this.state.selectedView === 1) {
      // Convert to days
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 3) {
        endDate = this.addDays(new Date(date), 3);
      }
      // If start is later than end, set end as start
      if (diffDays < 0 || diffDays === -0) {
        endDate = date;
      }
    } else {
      // Convert to years
      const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
      if (diffYears > 4) {
        endDate = this.addYears(new Date(date), 4);
      }
      // If start is later than end, set end as start
      if (diffYears < 0 || diffYears === -0) {
        endDate = date;
      }
    }

    this.setState({
      startDate: date,
      endDate: endDate
    });
  };

  endDateChangedHandler = date => {
    this.setState({
      endDate: date
    });
  };

  onSearchHandler = () => {
    // Parse start and end dates
    const startY = this.state.startDate.getFullYear();
    const startM = this.state.startDate.getMonth()+1;
    const startDate = startY + "-" + startM;

    const endY = this.state.endDate.getFullYear();
    const endM = this.state.endDate.getMonth()+1;
    const endDate = endY + "-" + endM;
    axios
      .get(
        "https://api.meteostat.net/v1/history/monthly?station="+ this.state.selectedStation.id +"&start="+startDate+"&end="+endDate+"&key=Rbe0qZS1"
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  addYears = (date, years) => {
    // ToDo: get the year limit working
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const newDate = new Date(y + years, m, d);
    return newDate;
  };

  render() {
    return (
      <Aux>
        <h3>What would you like to see?</h3>
        <ul>
          <li>Monthly summaries for X years (max 5 years)</li>
          <li>Data regarding a specific date for the last 5 years</li>
        </ul>
        <p>Please choose below</p>
        <select ref={this.select} onChange={this.selectedViewChangedHandler}>
          <option value="0">Monthly Summary</option>
          <option value="1">Specific Date</option>
        </select>
        <br></br>
        <p>Date Range (max 4 days):</p>
        <span>From: </span>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.startDateChangedHandler}
          placeholderText="Select a start date"
          dateFormat="dd/MMMM"
        />
        <span> To </span>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.endDateChangedHandler}
          placeholderText="Select an end date"
          dateFormat="dd/MMMM"
          minDate={this.state.startDate}
          maxDate={this.addDays(new Date(this.state.startDate), 3)}
          showDisabledMonthNavigation
        />
        <br></br>
        <p>Month/Year Range (max 5 years):</p>
        <span>From: </span>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.startDateChangedHandler}
          placeholderText="Select a start date"
          dateFormat="MMMM/yyyy"
          showMonthYearPicker
        />
        <span> To </span>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.endDateChangedHandler}
          placeholderText="Select an end date"
          dateFormat="MMMM/yyyy"
          minDate={this.state.startDate}
          maxDate={this.addYears(new Date(this.state.startDate), 4)}
          showMonthYearPicker
        />
        <Button
          btnType="Success"
          clicked={this.onSearchHandler}
        >
          SEARCH
        </Button>
      </Aux>
    );
  }
}

export default withErrorHandler(HistoryData, axios);
