import { useState } from "react";

/* ---------- IMAGE QUALITY ANALYSIS ---------- */
const analyzeImageQuality = (imgEl) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = imgEl.width;
  canvas.height = imgEl.height;
  ctx.drawImage(imgEl, 0, 0);

  const data = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  ).data;

  let brightnessSum = 0;
  let laplacianSum = 0;

  for (let i = 0; i < data.length - 4; i += 4) {
    const gray =
      (data[i] + data[i + 1] + data[i + 2]) / 3;
    const grayNext =
      (data[i + 4] + data[i + 5] + data[i + 6]) / 3;

    brightnessSum += gray;
    laplacianSum += Math.abs(gray - grayNext);
  }

  const avgBrightness =
    brightnessSum / (data.length / 4);
  const blurScore =
    laplacianSum / (data.length / 4);

  return {
    dark: avgBrightness < 70,
    blurry: blurScore < 120,
    qualityScore: Math.max(
      0.4,
      Math.min(1, blurScore / 300)
    ),
  };
};

/* ---------- COMPONENT ---------- */
export default function ImageGrid({ images, setImages }) {
  const [undoStack, setUndoStack] = useState([]);

  const upload = (file, index) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const quality = analyzeImageQuality(img);

      const newImage = {
        id: Date.now(),
        file,
        preview: img.src,
        quality,
      };

      const updated = [...images];
      updated[index] = newImage;
      setImages(updated.filter(Boolean));
    };
  };

  const removeImage = (index) => {
    setUndoStack((u) => [...u, images[index]]);
    setImages(images.filter((_, i) => i !== index));
  };

  const undoRemove = () => {
    const last = undoStack.pop();
    if (last) {
      setImages((imgs) => [...imgs, last]);
      setUndoStack([...undoStack]);
    }
  };

  return (
    <>
      <div className="image-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="image-box"
            draggable={!!images[i]}
            onDragStart={(e) =>
              e.dataTransfer.setData("from", i)
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const from = Number(
                e.dataTransfer.getData("from")
              );
              if (from === i) return;

              const reordered = [...images];
              const moved = reordered.splice(from, 1)[0];
              reordered.splice(i, 0, moved);
              setImages(reordered);
            }}
          >
            {images[i] ? (
              <>
                <img src={images[i].preview} alt="" />

                <button
                  className="delete-btn"
                  onClick={() => removeImage(i)}
                >
                  ✕
                </button>

                {images[i].quality.dark && (
                  <span className="warn-badge">🌑 Dark</span>
                )}
                {images[i].quality.blurry && (
                  <span className="warn-badge warn-blur">
                    💨 Blurry
                  </span>
                )}
              </>
            ) : (
              <label className="upload-placeholder">
                +
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    upload(e.target.files[0], i)
                  }
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {undoStack.length > 0 && (
        <button
  className="change-btn"
  onClick={undoRemove}
  style={{
    background: "linear-gradient(135deg, #f93458, #ff8fab)",
    color: "#ffffff",
    borderRadius: "999px",        // fully rounded / 50%
    border: "none",
    padding: "12px 20px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(255,77,109,0.35)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow =
      "0 10px 24px rgba(255,77,109,0.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 6px 18px rgba(255,77,109,0.35)";
  }}
>
  ↩ Undo last removal
</button>

      )}
    </>
  );
}
