import { Subject } from "rxjs";
import { Option } from "monas";
import { tap } from "rxjs/operators";

export interface IRequest {
  uri: string;
  headers: { [key: string]: string };
  time: number;
}

export default class RequestComposer {
  public request$: Subject<Option<IRequest>>;

  constructor() {
    this.request$ = new Subject<Option<IRequest>>();
    this.request$
      .pipe(
        tap(req => {
          // tslint:disable-next-line:no-console
          console.log("debug", req);
        })
      )
      .subscribe();
  }

  public set(req: Option<IRequest>) {
    this.request$.next(req);
  }
}
