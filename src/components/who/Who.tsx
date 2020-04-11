import React from "react";

import "./Who.scss";

const Who = () => {
  return (
    <div className="who-container">
      <div className="exit">
        <a href="/">X</a>
      </div>
      <h1>The Stables is home to 5 flat mates and a giant horse lantern...</h1>
      <p>
        In the current circumstance, people living here at The Stables are...
      </p>
      <p>
        - madeleine
        <br />
        - zach
        <br />
        - ravid
        <br />
        - lowen (now left for wellington)
        <br />
        - michael
        <br />
        - buster (madeleine’s boyfriend)
        <br />- arnie (ravids girlfriend)
      </p>
      <p>
        this site is an art piece which will document the journey which we will
        go on together during the covid-19 pandemic. we started the isloation
        process on 19th of March 2020.
      </p>
    </div>
  );
};

export default Who;
