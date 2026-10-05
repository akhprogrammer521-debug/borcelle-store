import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsCheckLg } from "react-icons/bs";
import { CategoriesApi } from "../../services/CategoriesApi";

function SuccessModal({ show, onClose, onContinue, value }) {
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
          Continue
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
          {initialData ? "Edit Address" : "Add Address"}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="address-fields">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
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
                Phone number must start with 09 and contain exactly 10 digits.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="neighborhood">
              <Form.Label>Neighborhood</Form.Label>
              <Form.Control
                required
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Enter your neighborhood"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your neighborhood.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                required
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter your street"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your street.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="building">
              <Form.Label>Building</Form.Label>
              <Form.Control
                required
                type="text"
                name="building"
                value={formData.building}
                onChange={handleChange}
                placeholder="Enter your building"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your building.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="zipCode">
              <Form.Label>Zip code</Form.Label>
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
                Zip code must contain exactly 5 digits.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lat">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                required
                type="text"
                inputMode="decimal"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder="Example: 33.5138"
                pattern="-?(?:90(?:\.0+)?|[1-8]?[0-9](?:\.[0-9]+)?)"
              />
              <Form.Control.Feedback type="invalid">
                Latitude must be a number between -90 and 90.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lng">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                required
                type="text"
                inputMode="decimal"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                placeholder="Example: 36.2765"
                pattern="-?(?:180(?:\.0+)?|1[0-7][0-9](?:\.[0-9]+)?|[1-9]?[0-9](?:\.[0-9]+)?)"
              />
              <Form.Control.Feedback type="invalid">
                Longitude must be a number between -180 and 180.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
              label="Set as default address"
              className="align-self-end"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

          <Button variant="primary" className="btn-cus" type="submit" disabled={isSaving}>
            {isSaving
              ? "Saving..."
              : initialData
                ? "Save Changes"
                : "Save Address"}
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
        <Modal.Title>Cancel Order</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="cancelComment">
            <Form.Label>
              Please enter the reason for cancelling this order
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your reason here..."
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Close
          </Button>

          <Button
            variant="danger"
            type="submit"
            disabled={isDeleting || !comment.trim()}
          >
            {isDeleting ? "Cancelling..." : "Cancel Order"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const OrderDetailsModal = ({ show, onClose, order }) => {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order #{order.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          <p className="mb-0">
            <strong>Total:</strong> {order.total} AED
          </p>

          <p className="mb-0">
            <strong>Payment type:</strong> {order.payment_type}
          </p>

          <p className="mb-0">
            <strong>Status:</strong> {order.status || "Pending"}
          </p>

          <p className="mb-0">
            <strong>Created at:</strong> {order.created_at}
          </p>

          {order.note && (
            <p className="mb-0">
              <strong>Note:</strong> {order.note}
            </p>
          )}

          {Array.isArray(order.items) && order.items.length > 0 && (
            <>
              <hr />
              <strong>Products:</strong>

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
          Close
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
    CategoriesApi.GetAllCatsService()
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
          {initialData ? "Edit Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="product-fields">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="description..."
              />
              <Form.Control.Feedback type="invalid">
                Please enter your description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
              <Form.Control.Feedback type="invalid">
                Please enter price.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="categoryId">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.category_id}
                onChange={handleChange}
                required
                name="category_id"
              >
                Open this select menu
                {
                  categories.map((cats) => (
                    <option key={cats.id} value={cats.id}>{cats.name}</option>
                  ))
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please enter id of category.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required={!initialData}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                placeholder="Enter image of product"
              />
              <Form.Control.Feedback type="invalid">
                Please enter image of product.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

          <Button variant="primary" className="btn-cus" type="submit" disabled={isSaving}>
            {isSaving
              ? "Saving..."
              : initialData
                ? "Save Changes"
                : "Save Product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}