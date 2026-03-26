import { fetchFromDB } from "@/lib/fetch";

async function broadcastIndex() {
  return await fetchFromDB("dms.charts.getChartsData");
}

const getBinanceKlines = async ({
  symbol = "BTCUSDT",
  interval = "1m",
  limit = 300,
  endTime,
}) => {
  return await fetchFromDB("dms.kLinkes.klines", {
    query: { symbol, interval, limit, endTime },
  });
};

export { broadcastIndex, getBinanceKlines };
