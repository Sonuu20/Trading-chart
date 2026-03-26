export function adaptBinanceKlines(data) {
  if (!Array.isArray(data)) {
    console.error("Invalid data in adapter:", data);
    return [];
  }

  return data.map((candle) => ({
    time: Math.floor(candle[0] / 1000),
    open: +candle[1],
    high: +candle[2],
    low: +candle[3],
    close: +candle[4],
  }));
}
