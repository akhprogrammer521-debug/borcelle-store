import { Card, Button } from "react-bootstrap";
import { FaCcMastercard, FaCcVisa, FaCcPaypal, FaApplePay } from "react-icons/fa";

const OrderSummary = () => {
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

        <Button className="w-100 fw-bold py-2 mb-3 btn-success">
          Checkout
        </Button>

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