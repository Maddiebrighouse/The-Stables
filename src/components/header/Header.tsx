import React from "react";
import Moment from "react-moment";
import moment from "moment";

import "./Header.scss";

const Header = () => {
  const startTime = "2020-03-19T08:00:00-12:00";
  // Days
  var now = moment(new Date()); //todays date
  var end = moment("2020-03-19"); // another date
  var duration = moment.duration(now.diff(end));
  var days = Math.floor(duration.asDays());

  // Hours
  var now = moment(moment()); //todays date
  var end = moment("T07:30:53.000"); // another date
  var duration = moment.duration(now.diff(end));
  var hours = Math.floor(duration.asHours());

  console.log(days);
  return (
    <div className="header-container">
      <a href="/">
        <h1 className="title">Isolation at The Stables</h1>
      </a>
      {/* <p>{`${days} days`}</p>
      <p>{`${hours} days`}</p> */}
      <h3>13 days 12 hours 2 minutes 20 seconds</h3>
      <img
        className="misty"
        src="https://res.cloudinary.com/isolationstables/image/upload/v1586579283/Isolation/misty/Misty_vbrqni.jpg"
        alt="Image of a horse laten"
      />
    </div>
  );
};

export default Header;
