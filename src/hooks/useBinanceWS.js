import { useState, useEffect } from "react";

export function useBinanceWS(symbol = "btcusdt", interval = "1m") {
  const [latestTick, setLatestTick] = useState(null);

  useEffect(() => {
    const normalizedSymbol = symbol.toLowerCase(); // ✅ convert to lowercase

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${normalizedSymbol}@kline_${interval}`,
    );

    ws.onopen = () => {
      console.log(`🟢 Connected to Binance WS: ${normalizedSymbol}`);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const kline = message.k;

      const tick = {
        time: kline.t / 1000,
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      };

      setLatestTick(tick);
    };

    ws.onerror = (error) => {
      console.error("🔴 WebSocket Error:", error);
    };

    return () => {
      console.log("🔴 Closing WS connection");
      ws.close();
    };
  }, [symbol, interval]);

  return latestTick;
}
