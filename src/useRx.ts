import { useEffect, useState } from "react";
import { Observable, NextObserver, Subscription } from "rxjs";

export function useRxEffect<T>(
  observable$: Observable<T>,
  observer: NextObserver<T>
): void {
  let subscription: Subscription;
  useEffect(() => {
    if (!subscription) {
      subscription = observable$.subscribe(observer);
    }
    return () => subscription.unsubscribe();
  }, [observable$]);
}

export function useRxState<T>(
  observable$: Observable<T>,
  defaultValue: T | (() => T)
): [T, null | any, boolean] {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  useRxEffect(observable$, {
    next(nextValue: T) {
      setError(null);
      setValue(nextValue);
    },
    error(e: any) {
      setError(e);
    },
    complete() {
      setIsComplete(true);
    }
  });
  return [value, error, isComplete];
}
