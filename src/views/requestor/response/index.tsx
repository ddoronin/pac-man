import * as React from "react";
import { IResponse } from "src/state/AppState";
import { Option, some } from "monas";
import styles from "./styles.module.scss";

const print = (o: any) => JSON.stringify(o, null, "  ");

export interface IResposeProps {
  response: IResponse;
  error: Option<{}>;
}

export default function Response(props: IResposeProps) {
  const { response, error } = props;
  return (
    <>
      <h4>Response</h4>
      {response.isLoading ? (
        "Loading..."
      ) : (
        <pre>
          {some(error)
            .map(err => (
              <div key="error" className={styles.error}>
                {print(err)}
              </div>
            ))
            .getOrElse(
              <div className={styles.success}>
                {response.resp.map(_ => print(_)).getOrElse("Nothing")}
              </div>
            )}
        </pre>
      )}
    </>
  );
}
