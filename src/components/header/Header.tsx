import * as React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./Header.scss";

const CustomTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    fontFamily: "Astloch",
    boxShadow: "0 6px 4px -7px black",
    fontSize: 24,
  },
}))(Tooltip);

const Header = () => {
  const startTime = "2020-08-12";
  let diffDays = moment("2020-08-29").diff(startTime, "days");

  return (
    <div className="header-container">
      <Link to="/">
        <h1 className="title">Isolation at The Stables</h1>
      </Link>
      <div className="time-wrapper">
        <div className="wrapper">
          <CustomTooltip
            title="Of Second Lock-Down"
            placement="top-start"
            arrow
          >
            <div className="lockdown-2-container time-container">
              <h3>{`${diffDays} days`}</h3>
              <h3>10 hours</h3>
              <h3>15 minutes</h3>
              <h3>and 32 seconds</h3>
            </div>
          </CustomTooltip>
        </div>
        <div className="wrapper">
          <CustomTooltip title="Of Lock-Down" placement="top-start" arrow>
            <div className="lockdown-container time-container">
              <h3>32 days</h3>
              <h3>13 hours</h3>
              <h3>0 minutes</h3>
              <h3>and 13 seconds</h3>
            </div>
          </CustomTooltip>
        </div>
        <div className="wrapper">
          <CustomTooltip
            title="Of Social Distancing"
            placement="top-start"
            arrow
          >
            <div className="social-container time-container">
              <h3>17 days</h3>
              <h3>13 hours</h3>
              <h3>42 minutes</h3>
              <h3>and 29 seconds</h3>
            </div>
          </CustomTooltip>
        </div>
      </div>
      <img
        className="misty"
        src="https://res.cloudinary.com/isolationstables/image/upload/v1587075325/Isolation/misty/Misty-glitter_vehvmg.jpg"
        alt="Image of a horse laten"
      />
    </div>
  );
};

export default Header;
