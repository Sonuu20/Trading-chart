export const transformToCandles = (data = []) => {
  const candles = data
    .map((item) => ({
      time: Math.floor(new Date(item.DateTime).getTime() / 1000),
      baseOpen: item.IndexOpen,
      baseHigh: item.IndexHigh,
      baseLow: item.IndexLow,
      baseClose: item.indexValue,
    }))
    .sort((a, b) => a.time - b.time);

  const uniqueCandles = [];
  const seen = new Set();

  let prevClose = null;

  for (const candle of candles) {
    if (!seen.has(candle.time)) {
      seen.add(candle.time);

      // Initialize first candle
      if (prevClose === null) {
        prevClose = candle.baseClose;
      }

      // Create realistic variation
      const change = (Math.random() - 0.5) * 100;

      const open = prevClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 50;
      const low = Math.min(open, close) - Math.random() * 50;

      prevClose = close;

      uniqueCandles.push({
        time: candle.time,
        open,
        high,
        low,
        close,
      });
    }
  }

  return uniqueCandles;
};
