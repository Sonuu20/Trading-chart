import { useState } from "react";
import LightweightCanvas from "./LightweightCanvas";
import CrosshairTooltip from "./CrosshairTooltip";

export default function ChartContainer({
  data,
  liveTick,
  fetchMore,
  isFetchingNextPage,
}) {
  // Chart ka instance state me save karenge taaki tooltip ko pass kar sakein
  const [chartContext, setChartContext] = useState({
    chart: null,
    series: null,
  });

  const handleChartInit = (chart, series) => {
    setChartContext({ chart, series });
  };

  return (
    // Relative wrapper for overlays
    <div className="relative w-full h-140 bg-slate-900 border border-slate-800 rounded-b-lg overflow-hidden">
      <LightweightCanvas
        data={data}
        onChartInit={handleChartInit}
        liveTick={liveTick}
        fetchMore={fetchMore}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Interactive Layer: The Tooltip (Jab chart ready ho tabhi render ho) */}
      {chartContext.chart && chartContext.series && (
        <CrosshairTooltip
          chart={chartContext.chart}
          series={chartContext.series}
        />
      )}
    </div>
  );
}
