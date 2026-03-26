import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useChartStore } from "@/context/useChartStore";
import {
  getCleanAndFormattedData,
  formatLiveTick,
} from "@/charts/utils/chartDataUtils";
import { useDynamicSeries } from "@/charts/series/useDynamicSeries";

export default function LightweightCanvas({
  data,
  onChartInit,
  liveTick,
  fetchMore,
}) {
  const chartType = useChartStore((state) => state.chartType);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const isFetchingRef = useRef(false);
  const fetchMoreRef = useRef(fetchMore);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        textColor: "#d1d5db",
        background: { type: "solid", color: "#0f172a" },
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "#1f2937" },
        horzLines: { color: "#1f2937" },
      },
      crosshair: { mode: 1 },
    });
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver((entries) => {
      chart.applyOptions({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, []);

  const currentSeriesRef = useDynamicSeries(
    chartRef,
    chartType,
    data,
    onChartInit,
  );

  // Infinite Scroll Hook Logic
  useEffect(() => {
    fetchMoreRef.current = fetchMore;
  }, [fetchMore]);

  useEffect(() => {
    if (!chartRef.current) return;
    const timeScale = chartRef.current.timeScale();

    const handleScroll = () => {
      const logicalRange = timeScale.getVisibleLogicalRange();
      if (!logicalRange) return;

      if (logicalRange.from < 20 && !isFetchingRef.current) {
        isFetchingRef.current = true;
        if (fetchMoreRef.current) {
          fetchMoreRef.current().finally(() => {
            setTimeout(() => {
              isFetchingRef.current = false;
            }, 100);
          });
        } else {
          isFetchingRef.current = false;
        }
      }
    };

    timeScale.subscribeVisibleLogicalRangeChange(handleScroll);
    return () => timeScale.unsubscribeVisibleLogicalRangeChange(handleScroll);
  }, []);

  //  Data Set Logic (Jab naya data fetch ho)
  useEffect(() => {
    if (!data || data.length === 0 || !currentSeriesRef.current) return;
    try {
      currentSeriesRef.current.setData(
        getCleanAndFormattedData(data, chartType),
      );
    } catch (error) {
      console.error("Data setting error:", error);
    }
  }, [data, chartType]);

  // ws live connection
  useEffect(() => {
    if (!liveTick || !currentSeriesRef.current) return;
    currentSeriesRef.current.update(formatLiveTick(liveTick, chartType));
  }, [liveTick, chartType]);

  return <div ref={chartContainerRef} className="absolute inset-0 z-0" />;
}
