import { Card } from "react-bootstrap";
import { FaCcMastercard, FaCcVisa, FaCcPaypal, FaApplePay } from "react-icons/fa";
import LoadingButton from "../../../Components/ui/LoadingButton";
import { OrderSummarySkeleton } from "../../../Components/ui/Skeleton";
import { useNavigate } from "react-router";
import { CartContext } from "../../../Contexts/CartContext";
import { useContext } from "react";

const OrderSummary = ({ isLoading = false }) => {

  const {cart} = useContext(CartContext);
  const navigateTo = useNavigate();

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading order summary">
        <OrderSummarySkeleton />
      </div>
    );
  }

  const handleCheckout = async () => {
    navigateTo("/payment");

  };

  const cartCount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Card className="border shadow-sm p-2">
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Subtotal:</span>
          <span className="fw-semibold">$1403.97</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Discount:</span>
          <span className="text-danger fw-semibold">- $00.00</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Tax:</span>
          <span className="text-success fw-semibold">+ $04.00</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <span className="fw-bold">Total:</span>
          <span className="fs-5 fw-bold text-dark">${cartCount.toFixed(2)}</span>
        </div>

        <LoadingButton
          className="w-100 fw-bold py-2 mb-3 btn-success"
          onClick={handleCheckout}
          loadingLabel="Processing checkout"
        >
          Checkout
        </LoadingButton>

        <div className="d-flex justify-content-center align-items-center gap-3 fs-4 text-muted">
          <FaCcMastercard />
          <FaCcVisa />
          <FaCcPaypal />
          <FaApplePay />
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;
