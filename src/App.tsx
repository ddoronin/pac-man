import * as React from "react";
import "./styles/theme.scss";
import History from "./views/History";
import Requestor from "./views/Requestor";
import styles from "./App.module.scss";
import AppState from "src/AppState";

const app = new AppState();

class App extends React.Component {
  public render() {
    return (
      <article className={styles.app}>
        <header>
          <h1>Pac-Man::He's back!</h1>
        </header>
        <section className={styles.layout}>
          <div className={styles.history}>
            <History history$={app.history$} />
          </div>
          <div className={styles.requestor}>
            <Requestor composer={app.composer} http$={app.http$} />
          </div>
        </section>
      </article>
    );
  }
}

export default App;
