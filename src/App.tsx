import React from "react";
import { Route, Switch } from "react-router-dom";

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
      <Nav />
      <Switch>
        <Route path="/who" component={Who} />
        <Route exact path="/days" component={Days} />
        <Route path="/days/:day" component={Gallery} />
        <Route exact path="/" component={Gallery} />
      </Switch>
    </div>
  );
}

export default App;
