import React from "react";

const siteInfo = props => {
  return (
    <div>
      <h1>Weather App Information</h1>
      <h3>Application made by Sami Honkasalo</h3>
      <p>
        This application was built during a course about Web Programming. The
        site was made with React. The "navigation" on the single page
        application was done with React-router. The city search was done with
        the{" "}
        <a href="https://rapidapi.com/dev132/api/city-geo-location-lookup">
          City-Geo-Location Lookup API
        </a>
        . The weather results are taken from the{" "}
        <a href="https://openweathermap.org/">Open Weather Map API</a>. The
        graphs for the results are done using{" "}
        <a href="https://canvasjs.com/">CanvasJS</a>. The weather icons on the
        current weather "card" are from{" "}
        <a href="https://www.flaticon.com/home">Flaticon</a> from the following
        authors:
      </p>
      <ul>
        <li>
          <a href="https://www.flaticon.com/authors/swifticons">Swifticons</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/vitaly-gorbachev">
            Vitaly Gorbachev
          </a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/pixel-perfect">
            Pixel Perfect
          </a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/nikita-golubev">
            Nikita Golubev
          </a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/pause08">Pause08</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/smashicons">Smashicons</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/good-ware">Good Ware</a>
        </li>
      </ul>
    </div>
  );
};

export default siteInfo;
