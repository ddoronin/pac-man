import * as React from "react";
import { useRx } from "src/useRx";
import { AppStateContext } from "src/state/AppState";
import styles from "./styles.module.scss";

export default function History() {
  const appState = React.useContext(AppStateContext);
  const [requests] = useRx(appState.last5$, []);
  return (
    <article>
      <header>
        <h2>History</h2>
      </header>
      <section>
        <ul className={styles.list}>
          {requests.map(req => (
            <li key={req.time} className={styles.listItem}>
              <h2>{req.uri}</h2>
              <pre>{JSON.stringify(req, null, "  ")}</pre>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
