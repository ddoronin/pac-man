import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

const rootEl = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App />, rootEl);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
