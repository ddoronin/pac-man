import * as React from "react";
import { useRx } from "src/useRx";
import { Observable } from "rxjs";
import { IHistoricRequest } from "src/functions/history";

export interface IHistoryProps {
  history$: Observable<IHistoricRequest[]>;
}

export default function History(props: IHistoryProps) {
  const requests = useRx(props.history$, []);
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
