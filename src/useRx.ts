import { useEffect, useState } from "react";
import { Observable, Subscription } from "rxjs";

export function useRx<T>(observable$: Observable<T>, defaultValue: T): T {
  const [x, setX] = useState(defaultValue);

  let subscription: Subscription;
  useEffect(() => {
    if (!subscription) {
      subscription = observable$.subscribe(setX);
    }
    return () => subscription.unsubscribe();
  }, [observable$]);

  return x;
}
