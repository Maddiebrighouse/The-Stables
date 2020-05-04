import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider, createClient, fetchExchange, dedupExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

import "./index.scss";
import Home from "./App";

const url = `${location.href}graphql`;
const client = createClient({
  url: url,
  exchanges: [dedupExchange, fetchExchange],
});

export const App = () => (
  <BrowserRouter>
    <Provider value={client}>
      <Home />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("app"));
