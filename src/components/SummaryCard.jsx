export default function SummaryCard({ environment, score }) {
  if (!environment) return null;

  return (
    <section className="results-card">
      <h2>📋 Environmental Report Summary</h2>

      <p>
        Based on the visual stress patterns observed in plant leaves,
        the environmental health score is <b>{score}%</b>.
      </p>

      <p>
        Current temperature is <b>{environment.weather.temperature}°C</b> and
        air quality index (AQI) is <b>{environment.aqi.aqi}</b>.
      </p>

      <p>
        These biological indicators suggest a
        <b> {environment.future.risk_level} risk </b>
        environmental trajectory if current trends continue.
      </p>

      <blockquote>
        “Nature speaks through its leaves — we must listen before it’s too late.”
      </blockquote>
    </section>
  );
}
