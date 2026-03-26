// /charts/Charts.jsx
import ChartContainer from "./core/ChartContainer";
import { useBinanceWS } from "../hooks/useBinanceWS";
import { useChartStore } from "@/context/useChartStore";

export default function Chart({ apiData, fetchMore, isFetchingMore }) {
  const symbol = useChartStore((state) => state.symbol);
  const interval = useChartStore((state) => state.interval);
  const liveTick = useBinanceWS(symbol, interval);

  return (
    <ChartContainer
      data={apiData}
      liveTick={liveTick}
      fetchMore={fetchMore}
      isFetchingMore={isFetchingMore}
    />
  );
}
