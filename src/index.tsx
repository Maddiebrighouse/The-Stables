import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider, createClient, fetchExchange, dedupExchange } from "urql";

import "./index.scss";
import Home from "./App";

const url = `${location.href}graphql`;
const client = createClient({
  url: url,
  exchanges: [dedupExchange, fetchExchange],
});

export const App = () => (
  <HashRouter>
    <Provider value={client}>
      <Home />
    </Provider>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById("app"));
