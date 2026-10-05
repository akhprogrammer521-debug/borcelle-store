import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";

function StaticExample() {
  const { t } = useTranslation();
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.modalTitle")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t("modal.modalBodyTextGoesHere")}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">{t("common.close")}</Button>
          <Button variant="primary">{t("modal.saveChanges")}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default StaticExample;