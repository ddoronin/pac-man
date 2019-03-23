import { IRequest } from "src/models/request-composer";
import { scan } from "rxjs/operators";
import { Option } from "monas";

export interface IHistoricRequest extends IRequest {
  time: number;
}

/** Transforms an Option<IRequest> to IHistoricRequest and appends to collection. */
export const overHistory = scan(
  (acc: IHistoricRequest[], x: Option<IRequest>) =>
    x
      .fold(() => [], (req: IRequest) => [{ ...req, time: Date.now() }])
      .concat(acc),
  []
);
