import React from "react";
import { Link } from "react-router-dom";
import "./Who.scss";

const Who = () => {
  return (
    <div className="who-container">
      <div className="exit">
        <Link to={"/"}>X</Link>
      </div>
      <h1 className="who-header">
        The Stables is home to 5 flat mates and a giant horse lantern...
      </h1>
      <p>
        In the current circumstance, people living here at The Stables are...
      </p>
      <p>
        - Madeleine
        <br />
        - Zach
        <br />
        - Ravid
        <br />
        - Loewn
        <br />
        - Michael
        <br />
        - Buster (now living at his own flat)
        <br />- Arnie (Ravid's girlfriend)
      </p>
      <p>
        This site is an art piece which will document the journey which we will
        go on together during the covid-19 pandemic. we started the isloation
        process on 19th of March 2020.
      </p>
      <div className="note">
        <p>
          Note: <br /> 17 April
          <br /> We have already noticed a major fact about documenting this
          journey through COVID-19, that it is easy to document the good times.
          But its much harder to photograph the difficult times. The moments
          when we are all down or doing nothing but hiding in our rooms all day,
          this is much hard to capture. So take these images with a gain of
          salt, that these are the good times. And that we are all struggling in
          our own ways. Stay safe everyone and love each other and your self.
        </p>
      </div>
    </div>
  );
};

export default Who;
