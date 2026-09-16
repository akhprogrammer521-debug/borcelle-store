import { useState } from "react";
import { Card } from "react-bootstrap";
import { FaCcMastercard, FaCcVisa, FaCcPaypal, FaApplePay } from "react-icons/fa";
import LoadingButton from "../../../Components/ui/LoadingButton";
import { OrderSummarySkeleton } from "../../../Components/ui/Skeleton";

const OrderSummary = ({ isLoading = false, onCheckout }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading order summary">
        <OrderSummarySkeleton />
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!onCheckout) return;

    setIsCheckingOut(true);
    try {
      await onCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Card className="border shadow-sm p-2">
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Subtotal:</span>
          <span className="fw-semibold">$1403.97</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Discount:</span>
          <span className="text-danger fw-semibold">- $60.00</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Tax:</span>
          <span className="text-success fw-semibold">+ $14.00</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <span className="fw-bold">Total:</span>
          <span className="fs-5 fw-bold text-dark">$1357.97</span>
        </div>

        <LoadingButton
          className="w-100 fw-bold py-2 mb-3 btn-success"
          onClick={handleCheckout}
          isLoading={isCheckingOut}
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
