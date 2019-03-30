import * as React from "react";
import RequestComposer from "src/models/request-composer";
import {
  overHistory,
  IHistoricRequest,
  overHistoryLatest5
} from "src/functions/history";
import { overHttp } from "src/functions/http";
import { Observable } from "rxjs";
import { Option } from "monas";
import { IRequest } from "src/models/request-composer";
import { computed } from "src/decorators/computed";
import { filter, map } from "rxjs/operators";

export interface IResponse {
  isLoading: boolean;
  req: Option<IRequest>;
  resp: Option<{}>;
}

export default class AppState {
  constructor(private composer = new RequestComposer()) {}

  @computed get history$(): Observable<IHistoricRequest[]> {
    return this.composer.request$.pipe(overHistory);
  }

  @computed get last5$(): Observable<IRequest[]> {
    return this.composer.request$.pipe(
      filter((_: Option<IRequest>) => _.isDefined()),
      map((_: Option<IRequest>) => _.getOrElse({} as IRequest)),
      overHistoryLatest5
    );
  }

  @computed get http$(): Observable<IResponse> {
    return this.composer.request$.pipe(overHttp);
  }

  @computed get request(): Observable<Option<IRequest>> {
    return this.composer.request$;
  }

  public setRequest(request: Option<IRequest>) {
    this.composer.set(request);
  }
}

export const AppStateContext = React.createContext<AppState>(new AppState());
