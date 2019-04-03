import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./views";

const rootEl = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App />, rootEl);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept("./views", () => {
    const NextApp = require("./views").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
