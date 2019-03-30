import * as React from "react";
import styles from "./styles.module.scss";

type keyVal = string[];

export interface IHeadersProps {
  headers: keyVal[];
  onChange: (headers: {}) => void;
}

function isLastEmpty(arr: keyVal[]): boolean {
  if (arr.length > 1) {
    const [key] = arr[arr.length - 1];
    return key === "";
  }
  return false;
}

export default function Headers(props: IHeadersProps) {
  const headers = [...props.headers];
  if (!isLastEmpty(headers)) {
    headers.push(["", ""]);
  }
  // Remove one of the headers.
  const removeHeader = (i: number) => () => {
    const _ = [...headers];
    _.splice(i);
    props.onChange(_);
  };

  // Updates one of the headers.
  const change = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const _ = [...headers];
    _[i] = [_[i][0], e.currentTarget.value];
    props.onChange(_);
  };

  const changeKey = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const _ = [...headers];
    _[i] = [e.currentTarget.value, _[i][1]];
    props.onChange(_);
  };

  return (
    <ul className={styles.headers}>
      {headers.map(([name, val], i) => (
        <li className={styles.header} key={i}>
          <input
            className={styles.label}
            type="text"
            value={name}
            onChange={changeKey(i)}
          />
          <input
            className={styles.val}
            type="text"
            value={val}
            onChange={change(i)}
          />
          <button onClick={removeHeader(i)}>X</button>
        </li>
      ))}
    </ul>
  );
}
