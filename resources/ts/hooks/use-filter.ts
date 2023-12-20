import { router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import { useCallback, useEffect } from "react";

export function useFilter({
  route,
  values,
  only,
  wait = 300,
}: {
  route: any;
  values: any;
  only: Array<string>;
  wait?: number;
}) {
  const reload = useCallback(
    debounce((query) => {
      router.get(route, pickBy(query), {
        only: only,
        preserveState: true,
        preserveScroll: true,
      });
    }, wait),
    []
  );

  useEffect(() => reload(values), [values, reload]);

  return { values };
}
