import { ajax } from "rxjs/ajax";
import { switchMap, map, merge, catchError } from "rxjs/operators";
import { BehaviorSubject, of } from "rxjs";
import { Option, some, none } from "monas";
import { IRequest } from "src/models/request-composer";

export const overHttp = switchMap((_: Option<IRequest>) =>
  _.map(req =>
    new BehaviorSubject({ isLoading: true, req: _, resp: none }).pipe(
      merge(
        ajax({ url: req.uri, headers: req.headers }).pipe(
          map(response => ({
            isLoading: false,
            req: _,
            resp: some(response)
          })),
          catchError((error: any) => {
            return of({
              isLoading: false,
              req: _,
              resp: some(error)
            });
          })
        )
      )
    )
  ).getOrElse(new BehaviorSubject({ isLoading: false, req: _, resp: none }))
);
