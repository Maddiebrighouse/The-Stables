import React from "react";

import "./Filter.scss";

const Filter = () => {
  return (
    <div className="filter-container">
      <div className="order-container">
        <h1>order...</h1>
        <button className="strike">newest to oldest</button>
        <br />
        <button className="strike">oldest to newest</button>
      </div>
      <div className="photo-container">
        <h1>photos of...</h1>
        <button className="strike">madeleine</button>
        <br />
        <button className="strike">zach</button>
        <br />
        <button className="strike">lowen</button>
        <br />
        <button className="strike">michael</button>
        <br />
        <button className="strike">buster</button>
        <br />
        <button className="strike">arnie</button>
      </div>
    </div>
  );
};

export default Filter;
