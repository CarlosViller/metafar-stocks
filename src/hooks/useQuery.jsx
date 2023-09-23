import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Get query params from URL
 */
export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
