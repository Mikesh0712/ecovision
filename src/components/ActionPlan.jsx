import { useEffect, useState } from "react";

export default function ActionPlan({ severity, results }) {
  if (!severity || !results?.length) return null;

  const stressedCount = results.filter(r => r.label === "Stressed").length;
  const total = results.length;

  const plans = {
    Low: {
      emoji: "🟢",
      color: "#2d6a4f",
      title: "Low Priority",
      actions: [
        "Continue sustainable practices",
        "Increase green cover locally",
        "Promote environmental awareness"
      ]
    },
    Moderate: {
      emoji: "🟡",
      color: "#f4d35e",
      title: "Moderate Priority",
      actions: [
        "Reduce fossil fuel usage",
        "Adopt rainwater harvesting",
        "Encourage public transport"
      ]
    },
    High: {
      emoji: "🔴",
      color: "#d62828",
      title: "High Priority",
      actions: [
        "Urgent pollution control measures",
        "Large-scale afforestation",
        "Policy-level environmental intervention needed"
      ]
    }
  };

  const plan = plans[severity];

  /* 🔥 Animate on severity change */
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(t);
  }, [severity]);

  return (
    <section
      className={`action-card ${animate ? "pulse" : ""}`}
      style={{ borderLeft: `6px solid ${plan.color}` }}
    >
      <h2 style={{ color: plan.color }}>
        {plan.emoji} Recommended Actions ({plan.title})
      </h2>

      <p className="action-reason">
        {stressedCount} out of {total} images show stress indicators
      </p>

      <ul>
        {plan.actions.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </section>
  );
}
