import React from "react";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {
  return (
    <div className="nav">
      <Link className="link" to="/who">
        who
      </Link>
      <Link className="link" to="/days">
        days
      </Link>
    </div>
  );
};

export default Nav;
