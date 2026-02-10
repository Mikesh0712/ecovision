export default function ConfirmModal({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Discard current analysis?</h3>
        <p>This will remove all uploaded images and results.</p>

        <div className="modal-actions">
          <button onClick={onCancel} className="change-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="analyze-btn">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
