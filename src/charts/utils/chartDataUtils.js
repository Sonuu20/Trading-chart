//for formating, removing duplicates & sorting
const getCleanAndFormattedData = (rawData, chartType) => {
  if (!rawData || rawData.length === 0) return [];
  const uniqueDataMap = new Map();
  rawData.forEach((item) => {
    uniqueDataMap.set(item.time, item);
  });
  const sortedData = Array.from(uniqueDataMap.values()).sort(
    (a, b) => a.time - b.time,
  );

  if (chartType === "line" || chartType === "area") {
    return sortedData.map((d) => ({ time: d.time, value: d.close }));
  }

  return sortedData; // For Candlesticks
};

// Live tick formatter
const formatLiveTick = (liveTick, chartType) => {
  if (!liveTick) return null;
  if (chartType === "line" || chartType === "area") {
    return { time: liveTick.time, value: liveTick.close };
  }
  return liveTick;
};

export { getCleanAndFormattedData, formatLiveTick };
