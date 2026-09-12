import { Row, Col } from "react-bootstrap";
import { FaLock, FaCommentDots, FaTruck } from "react-icons/fa";

const TrustBadges = () => {
  return (
    <Row className="g-3 my-4">
      <Col md={4} className="d-flex align-items-center gap-3">
        <div className="bg-secondary bg-opacity-10 rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
          <FaLock className="text-secondary fs-5" />
        </div>
        <div>
          <h6 className="mb-0 fw-semibold">Secure payment</h6>
          <small className="text-muted">Have you ever finally just</small>
        </div>
      </Col>
      <Col md={4} className="d-flex align-items-center gap-3">
        <div className="bg-secondary bg-opacity-10 rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
          <FaCommentDots className="text-secondary fs-5" />
        </div>
        <div>
          <h6 className="mb-0 fw-semibold">Customer support</h6>
          <small className="text-muted">Have you ever finally just</small>
        </div>
      </Col>
      <Col md={4} className="d-flex align-items-center gap-3">
        <div className="bg-secondary bg-opacity-10 rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
          <FaTruck className="text-secondary fs-5" />
        </div>
        <div>
          <h6 className="mb-0 fw-semibold">Free delivery</h6>
          <small className="text-muted">Have you ever finally just</small>
        </div>
      </Col>
    </Row>
  );
};

export default TrustBadges;