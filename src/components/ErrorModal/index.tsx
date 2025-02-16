import { ErrorModalProps } from "../../types";
import "./styles.css";

export default function ErrorModal({ error, onClose }: ErrorModalProps) {
  if (!error) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Error</h2>
        <p className="modal-text">{error}</p>
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
