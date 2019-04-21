import { useEffect, useState, useMemo } from 'react';
import { Observable, NextObserver, Subject, of } from 'rxjs';
import { switchMap, take, startWith, map, catchError } from 'rxjs/operators';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';

export function useRxEffect<S>(observable$: Observable<S>, observer: NextObserver<S>): void {
    useEffect(() => {
        const subscription = observable$.subscribe(observer);
        return () => subscription.unsubscribe();
    }, [observable$]);
}

function isFunction<V>(value: V | (() => V)): value is () => V {
    return typeof value === 'function';
}

function initiateState<V>(subject$: Subject<V>, value: V | (() => V)) {
    const initialValue = isFunction(value) ? value() : value;
    // TODO: if subject is behavior subject and current value is the same
    subject$.next(initialValue);
    return initialValue;
}

export function useRxState<S>(subject$: Subject<S>, defaultValue: S | (() => S)): [S, (result: S) => void] {
    const [value, setValue] = useState(() => initiateState(subject$, defaultValue));

    useRxEffect(subject$, {
        next(val: S) {
            setValue(val);
        }
    });

    return [value, subject$.next];
}

export function useRxResult<S>(observable$: Observable<S>): S | void {
    const [value, setValue] = useState<S>();

    useRxEffect(observable$, {
        next(val: S) {
            setValue(val);
        }
    });

    return value;
}

export function useRxAction<S>(subject$: Subject<S>): (action: S) => void {
    return subject$.next.bind(subject$);
}

export function useRxAjax(
    req$: Subject<AjaxRequest>,
    next?: (res: AjaxResponse) => void
): [AjaxResponse | null, (req: AjaxRequest) => void] {
    const res$ = useMemo(
        () =>
            req$.pipe(
                switchMap(req => ajax(req)),
                take(1)
            ),
        [req$]
    );
    const [res, setRes] = useState<AjaxResponse | null>(null);
    useRxEffect(res$, {
        next(response) {
            if (next) {
                next(response);
            }
            setRes(response);
        }
    });
    return [res, req$.next.bind(req$)];
}

export enum STATUS {
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

export interface IHttp<Req, Res> {
    status: STATUS;
    req: Req;
    res?: Res;
    error?: any;
}

type setReq<Req> = (req: Req) => void;

export function useRxHttp<Req, Res>(
    api: (req: Req) => Observable<Res>,
    next?: (res: IHttp<Req, Res>) => void
): [IHttp<Req, Res> | void, setReq<Req>] {
    const [req$] = useState(() => new Subject<Req>());
    const res$ = useMemo(
        () =>
            req$.pipe(
                switchMap(req =>
                    api(req).pipe(
                        map(httpResponse => ({ req, status: STATUS.SUCCEEDED, res: httpResponse })),
                        startWith({ req, status: STATUS.PENDING }),
                        take(2),
                        catchError(error => of({ req, status: STATUS.FAILED, error }))
                    )
                )
            ),
        [req$]
    );
    const [res, setRes] = useState<IHttp<Req, Res>>();
    useRxEffect(res$, {
        next(response) {
            if (response) {
                if (next) {
                    next(response);
                }
                setRes(response);
            }
        }
    });
    return [res, req$.next.bind(req$)];
}
