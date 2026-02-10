import { useState } from "react";
import { fetchEnvironment } from "../services/api";
import { getLocation } from "../services/location";

export default function WeatherWidget() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleWidget = async () => {
    setOpen(!open);

    // Load data only first time opening
    if (!open && !data) {
      try {
        setLoading(true);
        const loc = await getLocation();
        const env = await fetchEnvironment(loc.lat, loc.lon, 80);
        setData(env);
      } catch (err) {
        console.error("Weather widget error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`weather-widget ${open ? "open" : ""}`}>
      <button className="weather-toggle" onClick={toggleWidget}>
        ☀️
      </button>

      {open && (
        <div className="weather-panel">
          {loading && <p>Loading…</p>}

          {!loading && data && (
            <>
              <h4>Current Environment</h4>

              <div className="weather-row">
                🌡 Temp: <b>{data.weather.temperature}°C</b>
              </div>

              <div className="weather-row">
                📍 City: <b>{data.weather.city}</b>
              </div>


              <div className="weather-row">
                💧 Humidity: <b>{data.weather.humidity}%</b>
              </div>

              <div className="weather-row">
                🫁 AQI: <b>{data.aqi.aqi}</b>
              </div>

              <div className="weather-row">
                🌤 Status: <b>{data.weather.status}</b>
              </div>

              <div className="weather-source">
                Source: {data.weather.source}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
