const BASE = "/api";

export const analyzeImages = async (formData) => {
  const r = await fetch(`${BASE}/predict`, { method: "POST", body: formData });
  return r.json();
};

export const fetchEnvironment = async (healthScore) => {
  const r = await fetch(`${BASE}/environment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat: 0, lon: 0, health_score: healthScore })
  });
  return r.json();
};
