import * as React from "react";
import "src/styles/theme.scss";
import History from "../history";
import Requestor from "../requestor";
import styles from "./styles.module.scss";
import AppState, { AppStateContext } from "src/state/AppState";

class App extends React.Component {
  public render() {
    return (
      <article className={styles.app}>
        <section className={styles.layout}>
          <div className={styles.requestor}>
            <Requestor />
          </div>
          <div className={styles.requestor}>
            <AppStateContext.Provider value={new AppState()}>
              <Requestor />
              <History />
            </AppStateContext.Provider>
          </div>
          <div className={styles.history}>
            <History />
          </div>
        </section>
      </article>
    );
  }
}

export default App;
