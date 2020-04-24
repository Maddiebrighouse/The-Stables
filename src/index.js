import React from "react";
import ReactDOM from "react-dom";
import { Provider, Client, defaultExchanges } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

import "./index.scss";
import App from "./App";

const client = new Client({
  url: "http://localhost:3000",
  exchanges: [dedupExchange, cache, fetchExchange],
});

ReactDOM.render(
  <Provider value={client}>
    <App />, document.getElementById("app")
  </Provider>
);
