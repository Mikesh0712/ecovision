import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { analyzeImages, fetchEnvironment } from "../services/api";

export default function Analyzer({
  images,
  setImages,
  setResults,
  setScore,
  setEnvironment,
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAnalyze = async () => {
    if (!images || images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);
    setProgress(10);

    try {
      const timer = setInterval(() => {
        setProgress((p) => (p < 90 ? p + 10 : p));
      }, 300);

      /* ---------- 1️⃣ ML Prediction ---------- */
      const fd = new FormData();
      images.forEach((img) => fd.append("images", img.file));

      const prediction = await analyzeImages(fd);
      setResults(prediction.results);

      /* ---------- 2️⃣ Quality-weighted score ---------- */
      const weightedScore =
        prediction.results.reduce((sum, r, i) => {
          const qualityWeight =
            images[i]?.quality?.qualityScore ?? 1;
          return sum + r.confidence * qualityWeight;
        }, 0) / prediction.results.length;

      setScore(Math.round(weightedScore));
      setProgress(60);

      /* ---------- 3️⃣ Environment analysis ---------- */
      const env = await fetchEnvironment(
        Math.round(weightedScore)
      );
      setEnvironment(env);

      clearInterval(timer);
      setProgress(100);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 600);
    }
  };

  /* ---------- RESET FLOW ---------- */
  const confirmDiscard = () => {
    setImages([]);
    setResults([]);
    setScore(0);
    setEnvironment(null);
    setShowConfirm(false);
  };

  return (
    <section className="analyzer-section">
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🔍 Analyze Environment"}
        </button>

        {images.length > 0 && !loading && (
          <button
  className="change-btn"
  onClick={() => setShowConfirm(true)}
  style={{
    background: "linear-gradient(135deg, #3a86ff, #4cc9f0)",
    color: "#ffffff",
    borderRadius: "10%",          // fully rounded (pill / 50%)
    border: "none",
    padding: "5px 7px",
    marginTop: "10px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(58,134,255,0.35)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow =
      "0 10px 24px rgba(58,134,255,0.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 6px 18px rgba(58,134,255,0.35)";
  }}
>
  🔄 Change Images
</button>

        )}
      </div>

      {loading && (
        <div className="progress-wrapper">
          <div className="spinner" />
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        open={showConfirm}
        onConfirm={confirmDiscard}
        onCancel={() => setShowConfirm(false)}
      />
    </section>
  );
}
