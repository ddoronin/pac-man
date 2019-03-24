import * as React from "react";
import "./styles/theme.scss";
import History from "./views/History";
import Requestor from "./views/Requestor";
import styles from "./App.module.scss";
import { AppStateContext, appState } from "src/state/AppState";

class App extends React.Component {
  public render() {
    return (
      <AppStateContext.Provider value={appState}>
        <article className={styles.app}>
          <header>
            <h1>Pac-Man::He's back!</h1>
          </header>
          <section className={styles.layout}>
            <div className={styles.history}>
              <History />
            </div>
            <div className={styles.requestor}>
              <Requestor />
            </div>
          </section>
        </article>
      </AppStateContext.Provider>
    );
  }
}

export default App;
