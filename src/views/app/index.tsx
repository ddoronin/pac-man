import * as React from "react";
import "src/styles/theme.scss";
import History from "../history";
import Requestor from "../requestor";
import styles from "./styles.module.scss";

class App extends React.Component {
  public render() {
    return (
      <article className={styles.app}>
        <section className={styles.layout}>
          <div className={styles.history}>
            <History />
          </div>
          <div className={styles.requestor}>
            <Requestor />
          </div>
        </section>
      </article>
    );
  }
}

export default App;
