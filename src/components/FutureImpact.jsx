export default ({ prediction }) => (
  <div className="card">
    <h3>2050 Projection</h3>
    <p>Temp: {prediction.future_temp_2050}°C</p>
    <p>AQI: {prediction.future_aqi_2050}</p>
    <p>Risk: {prediction.risk_level}</p>
  </div>
);
