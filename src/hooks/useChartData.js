// hooks/useChartData.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBinanceKlines } from "@/services/broadastIndex.service";
import { adaptBinanceKlines } from "@/charts/data/adapters/binance.adapter";

export function useChartData({ symbol = "BTCUSDT", interval = "1m" }) {
  return useInfiniteQuery({
    queryKey: ["chartData", symbol, interval],
    queryFn: async ({ pageParam }) => {
      // pageParam ko endTime ki tarah use karenge
      const raw = await getBinanceKlines({
        symbol,
        interval,
        endTime: pageParam,
      });
      return adaptBinanceKlines(raw);
    },
    initialPageParam: undefined,
    // Next page ka parameter (endTime) nikalne ka logic
    getNextPageParam: (firstPage) => {
      if (!firstPage || firstPage.length <= 1) return undefined;

      // firstPage ka sabse pehla item (sabse purani candle) ka time lo
      // Note: Binance API usually ms mein time leti hai, agar adapter ne time ko seconds mein kiya hai, toh * 1000 karna padega.
      return firstPage[0].time * 1000;
    },
    select: (data) => {
      // Kyunki TanStack naye pages array ke end mein daalta hai,
      // par hum backward time me ja rahe hain, toh reverse() karke flat() karna zaroori hai.
      const flattenedData = [...data.pages].reverse().flat();
      return flattenedData;
    },
  });
}
