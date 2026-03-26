import { broadcastIndex } from "@/services/broadastIndex.service";
import { useQuery } from "@tanstack/react-query";

export function useBoradcastIndex() {
  const { data, isLoading } = useQuery({
    queryKey: ["dms.charts.getChartsData"],
    queryFn: broadcastIndex,
  });
  return { data, isLoading };
}
