import * as React from 'react';
import { BehaviorSubject } from 'rxjs';
import { some, none, Option } from 'monas';
import { scan } from 'rxjs/operators';
import { computed } from 'src/decorators/computed';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';

export interface IRequest {
    uri: string;
    headers: { [key: string]: string };
    time: number;
}

export default class RequestComposer {
    private request$ = new BehaviorSubject<Option<IRequest>>(none);

    constructor() {
        this.submit = this.submit.bind(this);
        this.restore = this.restore.bind(this);
    }

    @computed get request(): Observable<Option<IRequest>> {
        return this.request$.asObservable();
    }

    @computed get history() {
        return this.request$.pipe(
            scan((acc: IRequest[], r: Option<IRequest>) => {
                if (r.isDefined) {
                    return [r.get(), ...acc];
                }
                return acc;
            }, [])
        );
    }

    @computed get history5() {
        return this.request$.pipe(
            scan((acc: IRequest[], r: Option<IRequest>) => {
                if (r.isDefined()) {
                    const res = [r.get(), ...acc];
                    res.length = Math.min(5, res.length);
                    return res;
                }
                return acc;
            }, [])
        );
    }

    public submit(req: IRequest): Observable<{}> {
        this.request$.next(some(req));
        return ajax({
            url: req.uri,
            headers: req.headers,
            method: 'GET'
        });
    }

    public restore(req: IRequest) {
        this.request$.next(some(req));
    }
}

export const RequestComposerContext = React.createContext<RequestComposer>(new RequestComposer());
