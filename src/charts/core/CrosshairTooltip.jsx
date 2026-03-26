import { useEffect, useRef } from "react";
import { formatDateTime } from "../../utils/dateTime";

export default function CrosshairTooltip({ chart, series }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!chart || !series || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;

    const crosshairHandler = (param) => {
      if (!param || !param.point || param.point.x < 0 || param.point.y < 0) {
        tooltip.style.display = "none";
        return;
      }

      const price = param.seriesData?.get(series);
      if (!price) {
        tooltip.style.display = "none";
        return;
      }

      // Fast DOM manipulation bina React re-render ke!
      tooltip.style.display = "block";
      tooltip.style.left = param.point.x + 10 + "px";
      tooltip.style.top = param.point.y + 10 + "px";

      // 🚀 THE FIX: Check if it's Line/Area (has 'value') or Candlestick (has 'open')
      if (price.value !== undefined) {
        // Line or Area Chart Tooltip
        tooltip.innerHTML = `
          <div class="font-semibold text-teal-400 mb-1">${formatDateTime(price.time * 1000, "hh:mm:a,PPP")}</div>
          <div class="flex justify-between gap-4"><span>Price:</span> <span>${price.value.toFixed(2)}</span></div>
        `;
      } else {
        // Candlestick Tooltip
        tooltip.innerHTML = `
          <div class="font-semibold text-teal-400 mb-1">${formatDateTime(price.time * 1000, "hh:mm:a,PPP")}</div>
          <div class="flex justify-between gap-4"><span>O:</span> <span>${price.open.toFixed(2)}</span></div>
          <div class="flex justify-between gap-4"><span>H:</span> <span>${price.high.toFixed(2)}</span></div>
          <div class="flex justify-between gap-4"><span>L:</span> <span>${price.low.toFixed(2)}</span></div>
          <div class="flex justify-between gap-4"><span>C:</span> <span>${price.close.toFixed(2)}</span></div>
        `;
      }
    };

    chart.subscribeCrosshairMove(crosshairHandler);

    return () => {
      chart.unsubscribeCrosshairMove(crosshairHandler);
    };
  }, [chart, series]);

  return (
    <div
      ref={tooltipRef}
      style={{ display: "none" }}
      className="absolute bg-slate-900/95 text-slate-200 text-xs p-2 rounded border border-slate-700 shadow-xl pointer-events-none z-10 min-w-30"
    />
  );
}
