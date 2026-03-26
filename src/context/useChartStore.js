import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChartStore = create(
  persist(
    (set) => ({
      // State Variables
      symbol: "BTCUSDT",
      interval: "1m",
      chartType: "candlestick",

      // Setter Functions
      setSymbol: (symbol) => set({ symbol }),
      setInterval: (interval) => set({ interval }),
      setChartType: (chartType) => set({ chartType }),
    }),
    {
      name: "pro-chart-storage", 
      // partialize: (state) => ({ symbol: state.symbol }), // Agar kuch specific save karna ho (optional)
    },
  ),
);
