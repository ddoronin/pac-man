import { useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

/**
 * Reactive Hook that returns a tuple of resolved value and error.
 * @param { Observable<T> } observable$
 * @param { T } defaultValue
 */
export function useRx<T>(
  observable$: Observable<T>,
  defaultValue: T
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
