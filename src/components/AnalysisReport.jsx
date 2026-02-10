export default function AnalysisReport({ results, score }) {
  if (!results || results.length === 0) return null;

  const explain = (label, conf) => {
    if (label === "Stressed") {
      return conf > 80
        ? "Strong visual stress patterns detected (discoloration, wilting, damage)"
        : "Moderate stress indicators present in leaf structure";
    }
    if (label === "Healthy") {
      return "Leaf texture, color, and edges fall within healthy biological range";
    }
    return "Prediction uncertain due to mixed visual signals";
  };

  const severityText =
    score >= 40
      ? "Overall environment appears biologically healthy"
      : score <= -40
      ? "Overall environment shows significant stress indicators"
      : "Mixed environmental signals detected";

  return (
    <section className="results-card">
      <h2>🧪 Leaf Health Analysis</h2>

      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <b>Image {i + 1}</b>: {r.label} ({r.confidence}%)
            <br />
            <span style={{ opacity: 0.85, fontSize: "0.9rem" }}>
              → {explain(r.label, r.confidence)}
            </span>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "12px" }}>
        <b>Environmental Interpretation:</b> {severityText}
      </p>
    </section>
  );
}
