import { Card, Form, InputGroup, Button } from "react-bootstrap";

const CouponCard = () => {
  return (
    <Card className="border shadow-sm mb-3">
      <Card.Body>
        <Form.Label className="text-muted small fw-semibold">Have a coupon?</Form.Label>
        <InputGroup>
          <Form.Control placeholder="Add coupon" size="sm" />
          <Button variant="" size="sm" className="fw-semibold border btn-cus-secondary">
            Apply
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default CouponCard;