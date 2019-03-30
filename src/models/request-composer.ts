import { Subject } from "rxjs";
import { Option } from "monas";

export interface IRequest {
  uri: string;
  headers: { [key: string]: string };
  time: number;
}

export default class RequestComposer {
  public request$: Subject<Option<IRequest>>;

  constructor() {
    this.request$ = new Subject<Option<IRequest>>();
  }

  public set(req: Option<IRequest>) {
    this.request$.next(req);
  }
}
