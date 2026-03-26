# 📊 Charting Application (Frontend)

A high-performance charting frontend built using **React + Vite**, designed for real-time financial data visualization.

This project uses **Binance APIs (REST + WebSocket)** to fetch and stream live market data, enabling dynamic and interactive chart updates.

---

## 🚀 Tech Stack

- ⚛️ React
- ⚡ Vite
- 📉 lightweight-charts (by TradingView)
- 🌐 Binance REST API
- 🔌 Binance WebSocket Streams

---

## 📡 Data Sources

### 1. Binance REST API
Used for:
- Fetching historical candle (OHLC) data
- Initial chart rendering

### 2. Binance WebSocket API
Used for:
- Real-time price updates
- Live candlestick updates
- Streaming market data without polling

---

## ✨ Features

- 📊 Candlestick chart rendering
- 🔄 Real-time updates via WebSocket
- 🎯 Crosshair tooltip support
- ⚡ Fast performance using lightweight-charts
- 🔁 Seamless switching between historical + live data

---

Sahi pakde bhai — formatting thoda toot gaya tha 😄
Main ise **proper GitHub README markdown format** me clean karke de raha hoon 👇 (copy-paste ready)

---

```md
## 📁 Project Structure

```

src/
│
├── components/
│   ├── ChartContainer.jsx
│   ├── crosshairTooltip.js
│
├── api/
│   ├── apiRoutes.js
│   ├── chartService.js
│
├── hooks/
│   ├── useChartData.js
│
└── utils/
├── formatters.js

````

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <project-folder>
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

---

## 🔌 WebSocket Example (Binance)

Example stream used:

```bash
wss://stream.binance.com:9443/ws/btcusdt@kline_1m
```

---

## 📈 Future Improvements

* 🧠 Indicators (EMA, RSI, MACD)
* 📊 Multiple timeframes
* 💾 Save chart layouts
* 🧩 Drawing tools (trendlines, fib, etc.)
* 🧭 Trading panel integration

---

## 🧪 ESLint Configuration

For production apps, consider:

* Using TypeScript
* Enabling type-aware lint rules via `typescript-eslint`

---

## 📌 Notes

* This project does **not** use TradingView's licensed charting library
* Instead, it uses **lightweight-charts**, which is free and performant

---

## 🤝 Contribution

Feel free to fork and improve the project.

---

## 📜 License

MIT License

````
