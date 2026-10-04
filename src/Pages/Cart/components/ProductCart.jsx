import { Button } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";

const ProductCart = ({ item, onQuantityChange, onRemoveItem }) => {

  return (
    <div className="pb-3">
      <div className="d-none d-md-flex justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-start gap-3">
          <div className="border rounded-2 p-2 shrink-0">
            <img
              src={item.product.image}
              alt={item.product.name}
              width={60}
              height={60}
              className="object-fit-contain"
            />
          </div>

          <div className="d-flex flex-column">
            <h6 className="mb-1 fw-semibold"></h6>
            <p className="text-secondary small mb-1">
              Size: {item.product.category}, Color: {item.product.color}
            </p>
            <p className="text-secondary small mb-2">Seller: </p>
          </div>
        </div>
        <div className="cart-item-actions">
          <p className="fw-bold mb-2">${(item.product.price * item.quantity).toFixed(2)}</p>
          <div className="cart-qty-selector">
            <button className="cart-qty-btn" onClick={() => onQuantityChange(item, -1)} disabled={item.quantity <= 1}>-</button>
            <span className="cart-qty-value">{item.quantity}</span>
            <button className="cart-qty-btn" onClick={() => onQuantityChange(item, 1)}>+</button>
          </div>
          <button className="cart-delete-icon-btn" onClick={() => { onRemoveItem(item.id); console.log(item); }}>
            <BsTrashFill size={18} />
          </button>
        </div>
      </div>

      <div className="d-md-none">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div className="d-flex gap-3">
            <div
              className="border rounded-2 p-2 shrink-0"
              style={{ width: "65px", height: "65px" }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-100 h-100 object-fit-contain"
              />
            </div>

            <div>
              <h6 className="mb-1 fw-normal fs-6 text-dark"></h6>
              <p className="text-muted small mb-0">
                Size: {item.product.category}, Color: {item.product.color}
              </p>
              <p className="text-muted small mb-0">Seller: </p>
            </div>
          </div>

          <Button
            type="button"
            variant="link"
            className="text-muted p-0 border-0 shrink-0"
          >
            <FaEllipsisV aria-hidden="true" />
          </Button>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex gap-2">
            <div className="cart-qty-selector">
              <button className="cart-qty-btn" onClick={() => onQuantityChange(item, -1)} disabled={item.quantity <= 1}>-</button>
              <span className="cart-qty-value">{item.quantity}</span>
              <button className="cart-qty-btn" onClick={() => onQuantityChange(item, 1)}>+</button>
            </div>
            <button className="cart-delete-icon-btn" onClick={() => { onRemoveItem(item.id); console.log(item); }}>
              <BsTrashFill size={18} />
            </button>
          </div>
          <span className="fw-bold fs-6">${item.product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
