// App.jsx
import { useState } from "react";
import Chart from "./charts/Charts";
import { useChartData } from "./hooks/useChartData";
import ChartToolbar from "./charts/core/ChartToolbar";
import { useChartStore } from "./context/useChartStore";

export default function App() {
  const symbol = useChartStore((state) => state.symbol);
  const interval = useChartStore((state) => state.interval);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useChartData({
    symbol,
    interval,
  });

  return (
    <div className="p-8 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-200 mb-6">
          Pro Trading Terminal 🚀
        </h1>

        {/* 3. Render Toolbar */}
        <ChartToolbar />

        {/* 4. Render Chart or Loader */}
        {!isLoading && data ? (
          <Chart
            apiData={data}
            fetchMore={fetchNextPage}
            isFetchingMore={isFetchingNextPage}
          />
        ) : (
          <div className="w-full h-125 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-b-lg text-slate-400">
            Loading {symbol} data...
          </div>
        )}
      </div>
    </div>
  );
}
