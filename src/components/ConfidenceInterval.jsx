export default function ConfidenceInterval({ results }) {
  if (!results || results.length === 0) return null;

  const confidences = results.map((r) => r.confidence);

  const mean =
    confidences.reduce((a, b) => a + b, 0) /
    confidences.length;

  const variance =
    confidences.reduce(
      (sum, c) => sum + Math.pow(c - mean, 2),
      0
    ) / confidences.length;

  const std = Math.sqrt(variance);

  const lower = Math.max(0, Math.round(mean - std));
  const upper = Math.min(100, Math.round(mean + std));

  return (
    <section className="results-card">
      <h2>📊 Model Confidence Interval</h2>

      <p>
        Based on variation across multiple biological samples,
        the predicted environmental health lies within:
      </p>

      <div className="confidence-band">
        <span>{lower}%</span>
        <div className="band">
          <div
            className="band-fill"
            style={{
              left: `${lower}%`,
              width: `${upper - lower}%`,
            }}
          />
        </div>
        <span>{upper}%</span>
      </div>

      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
        Narrower intervals indicate higher model certainty.
      </p>
    </section>
  );
}
