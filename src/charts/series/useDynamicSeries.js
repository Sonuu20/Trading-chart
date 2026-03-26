import { useEffect, useRef } from "react";
import { CandlestickSeries, LineSeries, AreaSeries } from "lightweight-charts";
import { getCleanAndFormattedData } from "@/charts/utils/chartDataUtils";

export function useDynamicSeries(chartRef, chartType, data, onChartInit) {
  const seriesRef = useRef(null);

  // Sirf tab chalega jab Chart Type badlega
  useEffect(() => {
    if (!chartRef.current) return;

    //remove previous series
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
    }

    // create new one
    let newSeries;
    if (chartType === "line") {
      newSeries = chartRef.current.addSeries(LineSeries, {
        color: "#38bdf8",
        lineWidth: 2,
      });
    } else if (chartType === "area") {
      newSeries = chartRef.current.addSeries(AreaSeries, {
        lineColor: "#38bdf8",
        topColor: "rgba(56, 189, 248, 0.4)",
        bottomColor: "rgba(56, 189, 248, 0)",
      });
    } else {
      newSeries = chartRef.current.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
    }

    seriesRef.current = newSeries;

    // notifying the parent
    if (onChartInit) {
      onChartInit(chartRef.current, newSeries);
    }

    // Naye type ke hisaab se data set karo
    if (data && data.length > 0) {
      try {
        newSeries.setData(getCleanAndFormattedData(data, chartType));
      } catch (e) {
        console.error("Error setting data:", e);
      }
    }

    return () => {
      if (chartRef.current && newSeries) {
        try {
          chartRef.current.removeSeries(newSeries);
        } catch (error) {
          // Silent catch: Agar chart pehle hi destroy ho chuka hai, toh error ignore karo
        }
      }
      seriesRef.current = null;
    };
  }, [chartType]); // do not add data in dependency

  return seriesRef;
}
