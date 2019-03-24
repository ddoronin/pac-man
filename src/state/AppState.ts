import * as React from "react";
import RequestComposer from "src/models/request-composer";
import { overHistory, IHistoricRequest } from "src/functions/history";
import { overHttp } from "src/functions/http";
import { Observable } from "rxjs";
import { Option } from "monas";
import { IRequest } from "src/models/request-composer";
import { lazy } from "src/decorators/lazy";

class AppState {
  public composer = new RequestComposer();

  @lazy get history$(): Observable<IHistoricRequest[]> {
    return this.composer.request$.pipe(overHistory);
  }

  @lazy get http$(): Observable<Option<{}>> {
    return this.composer.request$.pipe(overHttp);
  }

  public setRequest(request: Option<IRequest>) {
    this.composer.set(request);
  }
}

export const appState = new AppState();
export const AppStateContext = React.createContext<AppState>(appState);
export default AppState;
