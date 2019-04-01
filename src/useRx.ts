import { useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * Reactive Hook that returns a tuple of resolved value and error.
 * @param { Observable<T> } observable$
 * @param { T } defaultValue
 */
export function useRx<T>(
  observable$: Observable<T>,
  defaultValue: T | (() => T)
): [T, any?] {
  const [x, setX] = useState(defaultValue);
  const [error, setError] = useState();

  let subscription: Subscription;
  useEffect(() => {
    if (!subscription) {
      subscription = observable$.subscribe(setX, setError);
    }
    return () => subscription.unsubscribe();
  }, [observable$]);

  return [x, error];
}

/**
 * Reactive Hook that returns a tuple of resolved value and error.
 * @param { Observable<T> } observable$
 * @param { T } defaultValue
 */
export function useRxTap<T>(
  observable$: Observable<T>,
  next?: (x: T) => void,
  error?: (e: any) => void,
  complete?: () => void
): void {
  let subscription: Subscription;
  useEffect(() => {
    if (!subscription) {
      subscription = observable$.pipe(tap(next, error, complete)).subscribe();
    }
    return () => subscription.unsubscribe();
  }, [observable$]);
}
