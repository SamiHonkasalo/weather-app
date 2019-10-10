import React, { Component } from "react";

import DatePicker from "react-datepicker";

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
    selectedView: null,
    startDate: new Date(),
    endDate: new Date(),
    startYear: null,
    endYear: null
  };

  startDateChangedHandler = date => {
    let endDate = new Date(this.state.endDate);
    // If end date is too far from start, also change end date
    const diffTime = endDate - date;
    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 3) {
      endDate = this.addDays(new Date(date), 3);
    }
    // If start is later than end, set end as start
    if (diffDays < 0 || diffDays === -0) {
      endDate = date;
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

  addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  addYears = (date, years) => {
    console.log(date.getFullYear() + 5);
    // ToDo: get the year limit working
    date.setDate(date.getFullYear() + years);
    console.log(date);
    return date;
  };

  render() {
    return (
      <Aux>
        <h3>What would you like to see?</h3>
        <ul>
          <li>Monthly summaries for X years (max 5 years)</li>
          <li>Data regarding a specific date for X years (max 5 years)</li>
        </ul>
        <p>Please choose below</p>
        <select>
          <option>Monthly Summary</option>
          <option>Specific Date</option>
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
        <p>Select which years you would like to see (max 5):</p>
        <span>From: </span>
        <select name="startYear">
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
          <option value="1998">1998</option>
          <option value="1997">1997</option>
          <option value="1996">1996</option>
          <option value="1995">1995</option>
          <option value="1994">1994</option>
          <option value="1993">1993</option>
          <option value="1992">1992</option>
          <option value="1991">1991</option>
          <option value="1990">1990</option>
        </select>
        <span> To: </span>
        <select name="endYear">
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
          <option value="1998">1998</option>
          <option value="1997">1997</option>
          <option value="1996">1996</option>
          <option value="1995">1995</option>
          <option value="1994">1994</option>
          <option value="1993">1993</option>
          <option value="1992">1992</option>
          <option value="1991">1991</option>
          <option value="1990">1990</option>
        </select>
        <br></br>
        <p>Month/Year Range (max 4 days):</p>
        <span>From: </span>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.startDateChangedHandler}
          placeholderText="Select a start date"
          dateFormat="dd/MMMM"
          showMonthYearPicker
        />
        <span> To </span>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.endDateChangedHandler}
          placeholderText="Select an end date"
          dateFormat="dd/MMMM"
          minDate={this.state.startDate}
          maxDate={this.addYears(new Date(this.state.startDate), 5)}
          showMonthYearPicker
        />
      </Aux>
    );
  }
}

export default withErrorHandler(HistoryData, axios);
