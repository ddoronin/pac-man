import { BehaviorSubject } from "rxjs";
import { Option, none } from "monas";

export interface IRequest {
  uri: string;
  headers: { [key: string]: string };
  time: number;
}

export default class RequestComposer {
  public request$: BehaviorSubject<Option<IRequest>>;

  constructor() {
    this.request$ = new BehaviorSubject<Option<IRequest>>(none);
  }

  public set(req: Option<IRequest>) {
    this.request$.next(req);
  }
}
