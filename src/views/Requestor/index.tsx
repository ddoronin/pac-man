import * as React from "react";
import { useRx } from "src/useRx";
import { some, none } from "monas";
import AppContext from "src/context/AppContext";
import styles from "./styles.module.scss";

const print = (o: any) => JSON.stringify(o, null, "  ");

export default function Requestor() {
  const appState = React.useContext(AppContext);
  const [since, setSince] = React.useState("0");
  const [page, setPage] = React.useState("5");
  const [resp, error] = useRx(appState.http$, none);
  const sinceTextInput = React.createRef<HTMLInputElement>();
  const pageTextInput = React.createRef<HTMLInputElement>();
  const submit = () => {
    const newSince = some(sinceTextInput.current as HTMLInputElement)
      .map(_ => _.value)
      .getOrElse(since);
    setSince(newSince);
    const newPage = some(pageTextInput.current as HTMLInputElement)
      .map(_ => _.value)
      .getOrElse(page);
    setPage(newPage);
    appState.setRequest(
      some({
        uri: `https://api.github.com/users?since=${newSince}&per_page=${newPage}`,
        headers: {
          Authorization: "bearer 0ff46177ef2fb3444d3bf398105e0f0216bda109"
        }
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
          <h4>Request</h4>
          <div>
            Since:{" "}
            <input
              ref={sinceTextInput}
              type="number"
              min="0"
              placeholder="since"
              value={since}
              onChange={submit}
            />
          </div>
          <div>
            Page:{" "}
            <input
              ref={pageTextInput}
              type="number"
              min="1"
              placeholder="page"
              value={page}
              onChange={submit}
            />
          </div>
          <button onClick={submit}>Submit</button>
          <h4>Response</h4>
          <pre>
            {some(error)
              .map(_ => (
                <div key="error" className={styles.error}>
                  {print(_)}
                </div>
              ))
              .getOrElse(
                <div className={styles.success}>
                  {resp.map(print).getOrElse("Nothing")}
                </div>
              )}
          </pre>
        </div>
      </section>
    </article>
  );
}
