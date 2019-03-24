import RequestComposer from "src/models/request-composer";
import { overHistory } from "src/functions/history";
import { overHttp } from "src/functions/http";
import { Observable } from "rxjs";
import { Option } from "monas";

class AppState {
  public composer = new RequestComposer();
  public http$: Observable<Option<{}>> = this.composer.request$.pipe(overHttp);
  public history$ = this.composer.request$.pipe(overHistory);
}

export default AppState;
