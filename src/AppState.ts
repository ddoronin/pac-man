import RequestComposer from "src/models/request-composer";
import { overHistory } from "src/functions/history";
import { overHttp } from "src/functions/http";

class AppState {
  public composer: RequestComposer;

  constructor() {
    this.composer = new RequestComposer();
  }

  public get http$() {
    return this.composer.request$.pipe(overHttp);
  }

  public get history$() {
    return this.composer.request$.pipe(overHistory);
  }
}

export default AppState;
