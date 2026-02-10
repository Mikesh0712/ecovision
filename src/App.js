import { useState } from "react";

/* Components */
import ImageGrid from "./components/ImageGrid";
import Analyzer from "./components/Analyzer";
import SeverityMeter from "./components/SeverityMeter";
import AnalysisReport from "./components/AnalysisReport";
import Explanation from "./components/Explanation";
import ConfidenceInterval from "./components/ConfidenceInterval";
import Trends from "./components/Trends";
import WeatherWidget from "./components/WeatherWidget";
import ActionPlan from "./components/ActionPlan";
import ModelMetrics from "./components/ModelMetrics";


/* Styles */
import "./styles/theme.css";

export default function App() {
  /* ---------- Global State ---------- */
  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const [environment, setEnvironment] = useState(null);

  /* ---------- Image Quality Banner ---------- */
  const hasLowQuality = images.some(
    (img) => img.quality?.dark || img.quality?.blurry
  );

  /* ---------- Severity Logic (BIOLOGICAL DOMINANCE) ---------- */
  const stressedCount = results.filter(
    (r) => r.label === "Stressed"
  ).length;

  const healthyCount = results.filter(
    (r) => r.label === "Healthy"
  ).length;

  let severity = "Moderate";

  if (stressedCount === 0 && healthyCount > 0) {
    severity = "Low";
  } else if (stressedCount > healthyCount) {
    severity = "High";
  } else if (healthyCount > stressedCount) {
    severity = "Low";
  }

  return (
    <div className="app-container">
      {/* ---------- HERO ---------- */}
      <header className="hero">
        <h1>🌿 EcoVision</h1>
        <p>
          Environmental intelligence using plant-based biological
          sensors
        </p>
      </header>

      {/* ---------- QUALITY WARNING ---------- */}
      {hasLowQuality && (
        <div className="quality-banner">
          ⚠️ Low-quality images detected. Accuracy may be reduced.
          Please ensure good lighting and focus.
        </div>
      )}

      {/* ---------- IMAGE SELECTION ---------- */}
      <section className="section">
        <h2>📸 Select Plant Images (1–6)</h2>
        <ImageGrid images={images} setImages={setImages} />
      </section>

      {/* ---------- ANALYZER ---------- */}
      <Analyzer
        images={images}
        setImages={setImages}
        setResults={setResults}
        setScore={setScore}
        setEnvironment={setEnvironment}
      />

      {/* ---------- RESULTS ---------- */}
      {results.length > 0 && (
        <>
          <SeverityMeter score={score} />

          <AnalysisReport
            results={results}
            score={score}
            modelMetrics={<ModelMetrics results={results} />}
          />

          {/* 🌱 ACTION PLAN (CORRECT SEVERITY) */}
          <ActionPlan
            severity={severity}
            results={results}
          />

          <Explanation
            results={results}
            score={score}
            images={images}
          />

          <ConfidenceInterval results={results} />
        </>
      )}

      {/* ---------- TRENDS & FORECAST ---------- */}
      {environment && (
        <Trends
          trends={environment.trends}
          future={environment.future}
        />
      )}

      {/* ---------- FOOTER ---------- */}
      <footer className="footer">
        <p>
          🌍 “The Earth does not belong to us — we belong to the
          Earth.”
        </p>
      </footer>

      {/* ---------- WEATHER WIDGET ---------- */}
      <WeatherWidget />
    </div>
  );
}
