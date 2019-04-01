import * as React from "react";
import { useRx, useRxTap } from "src/useRx";
import { some, none } from "monas";
import { AppStateContext } from "src/state/AppState";
import Headers from "./headers";
import Response from "./response";

export default function Requestor() {
  const appState = React.useContext(AppStateContext);
  const [http, httpError] = useRx(appState.http$, {
    isLoading: false,
    req: none,
    resp: none
  });

  const [uri, setUri] = React.useState("https://api.github.com/users");
  const change = (setState: (s: any) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(e.currentTarget.value);
  };

  const [headers, setHeaders] = React.useState([
    ["Authorization", "bearer 0ff46177ef2fb3444d3bf398105e0f0216bda109"]
  ]);

  useRxTap(appState.request, reqOpt => {
    reqOpt.foreach(req => {
      setUri(req.uri);
      setHeaders(Object.keys(req.headers).map(key => [key, req.headers[key]]));
    });
  });

  const submit = () => {
    appState.setRequest(
      uri === ""
        ? none
        : some({
            uri,
            headers: headers.reduce((acc, [key, val]) => {
              if (key !== "") {
                acc[key] = val;
              }
              return acc;
            }, {}),
            time: Date.now()
          })
    );
  };

  return (
    <article>
      <header>
        <h2>Requestor</h2>
      </header>
      <section>
        <div>
          <p>Request</p>
          <div>
            <label>Uri: </label>
            <input type="text" value={uri} onChange={change(setUri)} />
          </div>
          <div>
            <label>Headers: </label>
            <Headers headers={headers} onChange={setHeaders} />
          </div>
          <button onClick={submit}>Submit</button>
          <Response response={http} error={httpError} />
        </div>
      </section>
    </article>
  );
}
