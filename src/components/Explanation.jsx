export default function Explanation({ results, score, images }) {
  if (!results || results.length === 0) return null;

  const stressedCount = results.filter(
    (r) => r.label === "Stressed"
  ).length;

  const lowQualityCount = images.filter(
    (img) => img.quality?.dark || img.quality?.blurry
  ).length;

  let severityText =
    score >= 70
      ? "largely healthy environmental conditions"
      : score >= 40
      ? "moderate environmental stress"
      : "severe environmental degradation";

  return (
    <section className="results-card">
      <h2>🧠 Model Explanation</h2>

      <p>
        The system analyzed <b>{results.length}</b> plant
        samples. Out of these, <b>{stressedCount}</b> showed
        visible stress indicators such as discoloration,
        wilting, or texture irregularities.
      </p>

      <p>
        Based on the aggregated visual stress signals, the
        model estimates <b>{severityText}</b>, resulting in an
        overall environmental health score of <b>{score}%</b>.
      </p>

      {lowQualityCount > 0 && (
        <p>
          ⚠️ <b>{lowQualityCount}</b> image(s) were detected as
          low quality (dark or blurry). These images were
          automatically weighted lower to reduce bias and
          improve reliability.
        </p>
      )}

      <p>
        🌱 <i>
          Plants act as biological sensors. Persistent stress
          patterns often correlate with long-term exposure to
          heat, pollution, or water imbalance.
        </i>
      </p>
    </section>
  );
}
