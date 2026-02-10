export default function SeverityMeter({ score }) {
  // score ranges from -100 to +100
  const percentage = Math.min(Math.abs(score), 100);

  let color = "#f4d35e"; // yellow (neutral)
  if (score > 15) color = "#2d6a4f";       // green
  if (score < -15) color = "#d62828";      // red

  return (
    <div className="section">
      <h2>🌿 Environmental Stress Balance</h2>

      <div className="meter-container">
        <div className="meter-track">
          <div
            className="meter-fill"
            style={{
              width: `${percentage}%`,
              background: color,
              transform: score >= 0
                ? "translateX(0)"
                : "translateX(-100%)",
            }}
          />
          <div className="meter-center-line" />
        </div>

        <p className="meter-label">
          {score > 0 && "Healthy-dominant environment"}
          {score < 0 && "Stress-dominant environment"}
          {score === 0 && "Mixed environmental signals"}
          {" "}({score > 0 ? "+" : ""}{score}%)
        </p>
      </div>
    </div>
  );
}
