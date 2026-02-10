import { Line } from "react-chartjs-2";
import { useMemo } from "react";

/* ===============================
   Vertical marker plugin (2025)
================================ */
const projectionMarker = {
  id: "projectionMarker",
  afterDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    const xScale = scales.x;

    if (!xScale) return;

    const index = xScale.getLabels().indexOf(2025);
    if (index === -1) return;

    const x = xScale.getPixelForValue(index);

    ctx.save();
    ctx.strokeStyle = "rgba(0,0,0,0.4)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Projection starts →", x + 6, chartArea.top + 14);

    ctx.restore();
  },
};

const Trends = ({ trends }) => {

  const chartData = useMemo(() => {
    if (!Array.isArray(trends) || trends.length === 0) return null;

    const yearsPast = trends.map(t => t.year);
    const tempPast = trends.map(t => t.temp);
    const aqiPast = trends.map(t => t.aqi);

    const lastYear = yearsPast[yearsPast.length - 1];
    const lastTemp = tempPast[tempPast.length - 1];
    const lastAqi = aqiPast[aqiPast.length - 1];

    const yearsFuture = [];
    const tempFuture = [];
    const aqiFuture = [];

    for (let y = lastYear + 1; y <= 2050; y++) {
      yearsFuture.push(y);
      tempFuture.push(Number((lastTemp + (y - lastYear) * 0.06).toFixed(2)));
      aqiFuture.push(Math.round(lastAqi + (y - lastYear) * 1.5));
    }

    return {
      labels: [...yearsPast, ...yearsFuture],
      datasets: [
        {
          label: "🌡 Temperature (Historical)",
          data: [...tempPast, ...Array(yearsFuture.length).fill(null)],
          borderColor: "#2d6a4f",
          backgroundColor: "rgba(45,106,79,0.12)",
          borderWidth: 2,
          tension: 0.35,
        },
        {
          label: "🌡 Temperature (Projected)",
          data: [
            ...Array(tempPast.length - 1).fill(null),
            lastTemp,
            ...tempFuture,
          ],
          borderColor: "#40916c",
          borderDash: [6, 6],
          borderWidth: 2,
          tension: 0.35,
        },
        {
          label: "💨 AQI (Historical)",
          data: [...aqiPast, ...Array(yearsFuture.length).fill(null)],
          borderColor: "#d62828",
          backgroundColor: "rgba(214,40,40,0.12)",
          borderWidth: 2,
          tension: 0.35,
        },
        {
          label: "💨 AQI (Projected)",
          data: [
            ...Array(aqiPast.length - 1).fill(null),
            lastAqi,
            ...aqiFuture,
          ],
          borderColor: "#ef476f",
          borderDash: [6, 6],
          borderWidth: 2,
          tension: 0.35,
        },
      ],
    };
  }, [trends]);

  if (!chartData) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.raw === null ? "" : `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year (2000–2050)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Environmental Value",
        },
      },
    },
  };

  return (
    <section className="results-card">
      <h2>📈 Environmental Trends & Projection</h2>

      <div style={{ height: "420px" }}>
        <Line
          data={chartData}
          options={options}
          plugins={[projectionMarker]}
        />
      </div>

      <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
        Solid lines show observed data (2000–2025).  
        Dashed lines show projected trends (2026–2050).
      </p>
    </section>
  );
};

export default Trends;
