import React from "react";

import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <div className="navigation">
      <ul>
        <li>Days</li>
        <li>Who</li>
      </ul>
    </div>
  );
};

export default Header;
