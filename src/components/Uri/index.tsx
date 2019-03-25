import * as React from "react";
import { Observable, BehaviorSubject } from "rxjs";
import { useRx } from "src/useRx";
import { switchMap } from "rxjs/operators";
import styles from "./styles.module.scss";

export interface IUriProps {
  defaultUri: string;
  uri: Observable<string>;
  onChange: (uri: string) => void;
}

export default function Uri(props: IUriProps) {
  const textInput = React.createRef<HTMLInputElement>();
  const onChange = () => {
    if (textInput.current) {
      props.onChange(textInput.current.value);
    }
  };
  const [val] = useRx(
    props.uri.pipe(switchMap((uri: string) => new BehaviorSubject(uri))),
    props.defaultUri
  );
  return (
    <input
      className={styles.uri}
      ref={textInput}
      type="text"
      value={val}
      onChange={onChange}
    />
  );
}
