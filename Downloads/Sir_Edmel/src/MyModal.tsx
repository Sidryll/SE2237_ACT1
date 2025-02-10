interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function MyModal({ open, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div>
        <h2>this is a modal</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div>
        This is for scalability.
      </div>
    </div>
  );
}
