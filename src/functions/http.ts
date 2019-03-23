import { ajax } from "rxjs/ajax";
import { switchMap, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Option, some, none } from "monas";
import { IRequest } from "src/models/request-composer";

export const overHttp = switchMap((_: Option<IRequest>) =>
  _.map(req =>
    ajax.getJSON(req.uri, req.headers).pipe(map(response => some(response)))
  ).getOrElse(new BehaviorSubject(none))
);
