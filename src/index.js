import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/theme.css";
import "./chartSetup";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
/* ======================================================
   Mouse Reactive Leaf Particles 🍃
====================================================== */
if (window.matchMedia("(hover: hover)").matches) {
  let lastTime = 0;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 60) return; // throttle
    lastTime = now;

    const leaf = document.createElement("span");
    leaf.className = "leaf";
    leaf.textContent = "🍃";
    leaf.style.left = e.clientX + "px";
    leaf.style.top = e.clientY + "px";

    document.body.appendChild(leaf);

    setTimeout(() => {
      leaf.remove();
    }, 1200);
  });
}
