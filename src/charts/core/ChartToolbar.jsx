import { useChartStore } from "@/context/useChartStore";

const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "DOGEUSDT"];
const intervals = [
  { label: "1m", value: "1m" },
  { label: "5m", value: "5m" },
  { label: "15m", value: "15m" },
  { label: "1H", value: "1h" },
  { label: "1D", value: "1d" },
];

const chartTypes = [
  { label: "Candles", value: "candlestick" },
  { label: "Line", value: "line" },
  { label: "Area", value: "area" },
];

export default function ChartToolbar() {
  const { symbol, setSymbol, interval, setInterval, chartType, setChartType } =
    useChartStore();

  return (
    <div className="flex gap-4 p-3 bg-slate-900 border border-slate-800 rounded-t-lg items-center border-b-0">
      {/* Symbol Selector (Dropdown) */}
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="bg-slate-800 text-white px-3 py-1.5 rounded outline-none border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors"
      >
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="ml-auto flex bg-slate-800 rounded p-0.5 border border-slate-700">
        {chartTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setChartType(type.value)}
            className={`px-3 py-1 text-sm rounded transition-all duration-200 ${
              chartType === type.value
                ? "bg-slate-600 text-teal-400 font-semibold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Interval Buttons */}
      <div className="flex bg-slate-800 rounded p-0.5 border border-slate-700">
        {intervals.map((int) => (
          <button
            key={int.value}
            onClick={() => setInterval(int.value)}
            className={`px-3 py-1 text-sm rounded transition-all duration-200 ${
              interval === int.value
                ? "bg-slate-600 text-teal-400 font-semibold shadow"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {int.label}
          </button>
        ))}
      </div>
    </div>
  );
}
