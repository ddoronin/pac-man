import * as React from "react";
import { useRx } from "src/useRx";
import { some, none } from "monas";
import { AppStateContext } from "src/state/AppState";
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

  const submit = () => {
    appState.setRequest(
      uri === ""
        ? none
        : some({
            uri,
            headers: {
              Authorization: "bearer 0ff46177ef2fb3444d3bf398105e0f0216bda109"
            },
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
          <button onClick={submit}>Submit</button>
          <Response response={http} error={httpError} />
        </div>
      </section>
    </article>
  );
}
