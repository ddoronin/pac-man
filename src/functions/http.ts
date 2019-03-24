import { ajax } from "rxjs/ajax";
import { switchMap, map, merge } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Option, some, none } from "monas";
import { IRequest } from "src/models/request-composer";

export const overHttp = switchMap((_: Option<IRequest>) =>
  _.map(req =>
    new BehaviorSubject({ isLoading: true, req: _, resp: none }).pipe(
      merge(
        ajax.getJSON(req.uri, req.headers).pipe(
          map(response => ({
            isLoading: false,
            req: _,
            resp: some(response)
          }))
        )
      )
    )
  ).getOrElse(new BehaviorSubject({ isLoading: false, req: _, resp: none }))
);
