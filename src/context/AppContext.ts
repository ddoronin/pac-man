import * as React from "react";
import AppState from "src/state/AppState";

export const appState = new AppState();
export default React.createContext<AppState>(appState);
