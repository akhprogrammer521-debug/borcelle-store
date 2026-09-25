import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsCheckLg } from "react-icons/bs";

function SuccessModal({ show, onClose, onContinue }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      contentClassName="success-modal"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className="success-modal-header"
      />

      <div className="success-badge">
        <BsCheckLg />
      </div>

      <Modal.Body className="success-modal-body">
        <p>
          You have successfully verify for your <br />
          account
        </p>
      </Modal.Body>

      <Modal.Footer className="success-modal-footer">
        <Button
          className="success-modal-button"
          onClick={onContinue}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;