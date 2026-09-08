import { useSyncExternalStore } from "react";

/** True only after client mount — prevents theme/hydration mismatch. */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
