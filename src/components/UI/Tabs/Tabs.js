import React, { Component } from "react";

import styles from "./Tabs.module.css";

class Tabs extends Component {
  state = {
    activeTab: null
  };
  constructor(props) {
    super(props);

    this.selector = React.createRef();
    this.t1 = React.createRef();
    this.t2 = React.createRef();
    this.t3 = React.createRef();
  }

  componentDidMount() {
    // Set Tab1 as the active one initially if nothing found on localstorage
    // let activeTab = null;
    // if (localStorage.getItem("activeTab") !== null) {
    //   activeTab = parseInt(localStorage.getItem("activeTab"));
    // } else {
    //   activeTab = this.t1.current;
    //   localStorage.setItem("activeTab", activeTab.name);
    // }
    let activeTab = this.t1.current;
    let activeWidth = activeTab.offsetWidth;

    // Set the selector initial position
    this.selector.current.style.left = activeTab.offsetLeft + "px";
    this.selector.current.style.width = activeWidth + "px";
    this.setState({ activeTab: activeTab });
  }

  tabClickedHandler = e => {
    // First prevent default behaviour
    e.preventDefault();
    // Set the selected item as the active item after removing the previous
    const prevTab = this.state.activeTab;
    const activeTab = e.target;
    prevTab.className = "";
    const activeClass = [styles.Active];
    activeTab.className = activeClass;
    this.setState({ activeTab: activeTab });

    // Move the selector
    let activeWidth = activeTab.offsetWidth;
    this.selector.current.style.left = activeTab.offsetLeft + "px";
    this.selector.current.style.width = activeWidth + "px";

    // Let the Parent know, which tab is selected
    this.props.clicked(activeTab.name);
    // Set the active tab on the localstorage
    localStorage.setItem("activeTab", activeTab.name);
  };

  render() {
    return (
      <nav className={styles.Tabs}>
        <div className={styles.Selector} ref={this.selector}></div>
        <a
          href="/"
          onClick={e => this.tabClickedHandler(e)}
          className={styles.Active}
          ref={this.t1}
          name="0"
        >
          Current Weather/5 Day
        </a>
        <a
          href="/"
          onClick={e => this.tabClickedHandler(e)}
          className={null}
          ref={this.t2}
          name="1"
        >
          10 Day Forecast
        </a>
        <a
          href="/"
          onClick={e => this.tabClickedHandler(e)}
          className={null}
          ref={this.t3}
          name="2"
        >
          History
        </a>
      </nav>
    );
  }
}

export default Tabs;
