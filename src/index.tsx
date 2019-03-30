import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./views/app";

const rootEl = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App />, rootEl);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept("./views/app", () => {
    const NextApp = require("./views/app").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
