import * as React from "react";
import { useRx } from "src/useRx";
import { AppStateContext } from "src/state/AppState";

export default function History() {
  const appState = React.useContext(AppStateContext);
  const [requests] = useRx(appState.last5$, []);
  return (
    <article>
      <header>
        <h2>History</h2>
      </header>
      <section>
        <ul>
          {requests.map(req => (
            <li key={req.time}>
              <small>{JSON.stringify(req, null, "  ")}</small>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
