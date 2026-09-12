import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const CartHeaderActions = () => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <Button variant="primary" className="d-flex align-items-center gap-2 fw-semibold px-3 btn-cus">
        <FaArrowLeft /> Back to shop
      </Button>
      <Button variant="outline-primary" className="fw-semibold px-3 btn-cus-secondary border">
        Remove all
      </Button>
    </div>
  );
};

export default CartHeaderActions;