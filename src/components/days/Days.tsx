import React from "react";
import { Link } from "react-router-dom";

import "./Days.scss";

const days = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
];

const Days = () => {
  return (
    <div className="days-container">
      {days.map((day) => {
        return (
          <Link key={day} to={`days/${day}`} className="day-square">
            {day}
          </Link>
        );
      })}
    </div>
  );
};

export default Days;
