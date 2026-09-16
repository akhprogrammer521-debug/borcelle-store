import { Button } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

const QuantityControl = ({ id, model, quantity, onQuantityChange }) => {
  return (
    <div
      className="d-inline-flex align-items-center border rounded overflow-hidden"
      role="group"
      aria-label={`Quantity for ${model}`}
    >
      <Button
        type="button"
        variant="light"
        size="sm"
        className="px-2 border-0 rounded-0"
        onClick={() => onQuantityChange(id, -1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </Button>

      <span className="px-3 small fw-semibold" aria-live="polite">
        {quantity}
      </span>

      <Button
        type="button"
        variant="light"
        size="sm"
        className="px-2 border-0 rounded-0"
        onClick={() => onQuantityChange(id, 1)}
        aria-label="Increase quantity"
      >
        +
      </Button>
    </div>
  );
};

const ProductCart = ({ item, onQuantityChange }) => {
  const { id, image, model, size, color, seller, price, quantity } = item;

  return (
    <div className="pb-3">
      {/* Desktop View */}
      <div className="d-none d-md-flex justify-content-between align-items-start gap-3">
        <div className="d-flex align-items-start gap-3">
          <div className="border rounded-2 p-2 shrink-0">
            <img
              src={image}
              alt={model}
              width={60}
              height={60}
              className="object-fit-contain"
            />
          </div>

          <div className="d-flex flex-column">
            <h6 className="mb-1 fw-semibold">{model}</h6>
            <p className="text-secondary small mb-1">
              Size: {size}, Color: {color}
            </p>
            <p className="text-secondary small mb-2">Seller: {seller}</p>

            <div className="d-flex gap-2">
              <Button type="button" variant="outline-danger" size="sm" className="border">
                Remove
              </Button>
              <Button type="button" size="sm" className="btn-cus-secondary border">
                Save for later
              </Button>
            </div>
          </div>
        </div>

        <div className="text-end shrink-0">
          <p className="fw-bold mb-2">${price}</p>
          <QuantityControl
            id={id}
            model={model}
            quantity={quantity}
            onQuantityChange={onQuantityChange}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="d-md-none">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div className="d-flex gap-3">
            <div
              className="border rounded-2 p-2 shrink-0"
              style={{ width: "65px", height: "65px" }}
            >
              <img
                src={image}
                alt={model}
                className="w-100 h-100 object-fit-contain"
              />
            </div>

            <div>
              <h6 className="mb-1 fw-normal fs-6 text-dark">{model}</h6>
              <p className="text-muted small mb-0">
                Size: {size}, Color: {color}
              </p>
              <p className="text-muted small mb-0">Seller: {seller}</p>
            </div>
          </div>

          <Button
            type="button"
            variant="link"
            className="text-muted p-0 border-0 shrink-0"
            aria-label={`More options for ${model}`}
          >
            <FaEllipsisV aria-hidden="true" />
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <QuantityControl
            id={id}
            model={model}
            quantity={quantity}
            onQuantityChange={onQuantityChange}
          />
          <span className="fw-bold fs-6">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
