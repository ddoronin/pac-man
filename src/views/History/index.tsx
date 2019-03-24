import * as React from "react";
import { useRx } from "src/useRx";
import AppContext from "src/context/AppContext";

export default function History() {
  const appState = React.useContext(AppContext);
  const requests = useRx(appState.history$, []);
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
