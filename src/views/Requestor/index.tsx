import * as React from "react";
import RequestComposer from "src/models/request-composer";
import { useRx } from "src/useRx";
import { Option, option, some, none } from "monas";
import { Observable } from "rxjs";

export interface IRequestorProps {
  composer: RequestComposer;
  http$: Observable<Option<{}>>;
}

export default function Requestor(props: IRequestorProps) {
  const [since, setSince] = React.useState("0");
  const [page, setPage] = React.useState("5");
  const resp = useRx(props.http$, none);
  const sinceTextInput = React.createRef<HTMLInputElement>();
  const pageTextInput = React.createRef<HTMLInputElement>();
  const submit = () => {
    const newSince = option(sinceTextInput.current as HTMLInputElement)
      .map(_ => _.value)
      .getOrElse(since);
    setSince(newSince);
    const newPage = option(pageTextInput.current as HTMLInputElement)
      .map(_ => _.value)
      .getOrElse(page);
    setPage(newPage);
    props.composer.set(
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
            {resp.map(o => JSON.stringify(o, null, "  ")).getOrElse("Nothing")}
          </pre>
        </div>
      </section>
    </article>
  );
}
