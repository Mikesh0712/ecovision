// frontend/src/components/services/location.js

export function getLocation() {
  return new Promise((resolve, reject) => {
    // Check browser support
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported by browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);

        // Fallback: return safe default (India center)
        resolve({
          lat: 20.5937,
          lon: 78.9629,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
