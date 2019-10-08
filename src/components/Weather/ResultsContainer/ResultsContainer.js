import React from "react";

import styles from "./ResultsContainer.module.css";
import Tabs from "../../UI/Tabs/Tabs";

const ResultsContainer = props => {
  return (
    <div className={styles.Wrapper}>
      <Tabs className={styles.Tabs} />
      <div className={styles.ResultsContainer}>
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
};

export default ResultsContainer;
