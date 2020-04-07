import React from "react";

import "./App.scss";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Who from "./components/who/Who";
import Days from "./components/days/Days";
import Gallery from "./components/gallery/Gallery";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Nav /> */}
      {/* <Who /> */}
      {/* <Days /> */}
      <Gallery />
    </div>
  );
}

export default App;
