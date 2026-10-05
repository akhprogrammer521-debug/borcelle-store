import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsCheckLg } from "react-icons/bs";
import { CategoriesService } from "../../services/CategoriesService";
import { useTranslation } from "react-i18next";

function SuccessModal({ show, onClose, onContinue, value }) {
  const { t } = useTranslation();
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
        <p>{value}</p>
      </Modal.Body>

      <Modal.Footer className="success-modal-footer">
        <Button className="success-modal-button" onClick={onContinue}>
          {t("common.continue")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;

export const AddressModal = ({ show,
  onClose,
  onSave,
  isSaving,
  initialData,
}) => {
  const { t } = useTranslation();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    city: initialData?.city || "",
    neighborhood: initialData?.neighborhood || "",
    street: initialData?.street || "",
    building: initialData?.building || "",
    zip_code: initialData?.zip_code || "",
    lat: initialData?.lat || "",
    lng: initialData?.lng || "",
    is_default:
      initialData?.is_default === true ||
      initialData?.is_default === 1 ||
      initialData?.is_default === "1",
  }));


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    onSave(formData);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="address-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? t("modal.editAddress") : t("modal.addAddress")}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="address-fields">
            <Form.Group controlId="name">
              <Form.Label>{t("common.name")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("modal.enterYourName")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourName")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>{t("common.phone")}</Form.Label>
              <Form.Control
                required
                type="text"
                inputMode="numeric"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxx"
                pattern="09[0-9]{8}"
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.phoneNumberMustStartWith09And")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>{t("modal.city")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder={t("modal.enterYourCity")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourCity")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="neighborhood">
              <Form.Label>{t("modal.neighborhood")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder={t("modal.enterYourNeighborhood")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourNeighborhood")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="street">
              <Form.Label>{t("modal.street")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder={t("modal.enterYourStreet")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourStreet")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="building">
              <Form.Label>{t("modal.building")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="building"
                value={formData.building}
                onChange={handleChange}
                placeholder={t("modal.enterYourBuilding")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourBuilding")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="zipCode">
              <Form.Label>{t("modal.zipCode")}</Form.Label>
              <Form.Control
                required
                type="text"
                inputMode="numeric"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                placeholder="12345"
                pattern="[0-9]{5}"
                maxLength={5}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.zipCodeMustContainExactly5Digits")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lat">
              <Form.Label>{t("modal.latitude")}</Form.Label>
              <Form.Control
                required
                type="text"
                inputMode="decimal"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder={t("modal.example335138")}
                pattern="-?(?:90(?:\.0+)?|[1-8]?[0-9](?:\.[0-9]+)?)"
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.latitudeMustBeANumberBetween90")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lng">
              <Form.Label>{t("modal.longitude")}</Form.Label>
              <Form.Control
                required
                type="text"
                inputMode="decimal"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                placeholder={t("modal.example362765")}
                pattern="-?(?:180(?:\.0+)?|1[0-7][0-9](?:\.[0-9]+)?|[1-9]?[0-9](?:\.[0-9]+)?)"
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.longitudeMustBeANumberBetween180")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
              label={t("modal.setAsDefaultAddress")}
              className="align-self-end"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {t("common.close")}
          </Button>

          <Button variant="primary" className="btn-cus" type="submit" disabled={isSaving}>
            {isSaving
              ? t("common.saving")
              : initialData
                ? t("common.saveChanges")
                : t("modal.saveAddress")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const CancelOrderModal = ({
  show,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    onConfirm(comment.trim());
  };

  const handleClose = () => {
    setComment("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.cancelOrder")}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="cancelComment">
            <Form.Label>
              {t("validation.pleaseEnterTheReasonForCancellingThis")}
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("modal.writeYourReasonHere")}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isDeleting}
          >
            {t("common.close")}
          </Button>

          <Button
            variant="danger"
            type="submit"
            disabled={isDeleting || !comment.trim()}
          >
            {isDeleting ? t("modal.cancelling") : t("modal.cancelOrder")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const OrderDetailsModal = ({ show, onClose, order }) => {
  const { t } = useTranslation();
  if (!order) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{t("orders.orderNumber", { id: order.id })}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          <p className="mb-0">
            <strong>{t("modal.total")}</strong> {order.total} AED
          </p>

          <p className="mb-0">
            <strong>{t("modal.paymentType")}</strong> {order.payment_type}
          </p>

          <p className="mb-0">
            <strong>{t("modal.status")}</strong> {order.status || t("modal.pending")}
          </p>

          <p className="mb-0">
            <strong>{t("modal.createdAt")}</strong> {order.created_at}
          </p>

          {order.note && (
            <p className="mb-0">
              <strong>{t("modal.note")}</strong> {order.note}
            </p>
          )}

          {Array.isArray(order.items) && order.items.length > 0 && (
            <>
              <hr />
              <strong>{t("modal.products")}</strong>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <span>{item.product?.name}</span>
                  <span>
                    {item.quantity} × {item.price} AED
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t("common.close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const ProductModal = ({ show,
  onClose,
  onSave,
  isSaving,
  initialData,
}) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(() => ({
  name: initialData?.name || "",
  description: initialData?.description || "",
  price: initialData?.price || "",
  category_id: initialData?.category_id || initialData?.category?.id || "",
  image: null,
}));

  useEffect(() => {
    CategoriesService.GetAllCatsApi()
      .then((data) => {
        console.log(data);
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [setCategories]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files?.[0] || null
          : type === "checkbox"
            ? checked
            : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    onSave(formData);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="product-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? t("modal.editProduct") : t("modal.addProduct")}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="product-fields">
            <Form.Group controlId="name">
              <Form.Label>{t("common.name")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("modal.enterYourName")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourName")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>{t("common.description")}</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("modal.description")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterYourDescription")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>{t("common.price")}</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={t("modal.enterPrice")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterPrice")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="categoryId">
              <Form.Label>{t("common.category")}</Form.Label>
              <Form.Select
                aria-label={t("modal.defaultSelectExample")}
                value={formData.category_id}
                onChange={handleChange}
                required
                name="category_id"
              >
                {t("modal.openThisSelectMenu")}
                {
                  categories.map((cats) => (
                    <option key={cats.id} value={cats.id}>{cats.name}</option>
                  ))
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterIdOfCategory")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>{t("common.image")}</Form.Label>
              <Form.Control
                required={!initialData}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                placeholder={t("modal.enterImageOfProduct")}
              />
              <Form.Control.Feedback type="invalid">
                {t("validation.pleaseEnterImageOfProduct")}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {t("common.close")}
          </Button>

          <Button variant="primary" className="btn-cus" type="submit" disabled={isSaving}>
            {isSaving
              ? t("common.saving")
              : initialData
                ? t("common.saveChanges")
                : t("modal.saveProduct")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
