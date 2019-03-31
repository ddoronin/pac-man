import * as React from "react";
import { useRx } from "src/useRx";
import { AppStateContext } from "src/state/AppState";
import { some } from "monas";
import styles from "./styles.module.scss";
import { IRequest } from "src/models/request-composer";

export default function History() {
  const appState = React.useContext(AppStateContext);
  const [requests] = useRx(appState.last5$, []);

  const restore = (req: IRequest) => () => {
    appState.setRequest(some(req));
  };
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
              <button onClick={restore(req)}>Restore</button>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
