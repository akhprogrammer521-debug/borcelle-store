import { Row, Col, Card, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const SavedForLater = ({ items }) => {
  return (
    <div className="my-4">
      {/* Desktop Grid Layout */}
      <Row className="g-3 d-none d-md-flex bg-white border rounded-2 p-2">
        <h5 className="fw-bold mb-3">Saved for later</h5>
        {items.map((item) => (
          <Col key={item.id} md={3}>
            <Card className="ui-card h-100 border-0 p-2">
              <div className="d-flex justify-content-center body-bg rounded-3 p-3">
                <Card.Img variant="top" src={item.image} style={{ height: "140px", width: "auto", objectFit: "contain" }} />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between p-2">
                <div>
                  <Card.Title className="fs-6 fw-bold mb-1">${item.price}</Card.Title>
                  <Card.Text className="text-muted small mb-3">{item.title}</Card.Text>
                </div>
                <Button size="sm" className="d-flex align-items-center justify-content-center gap-2 fw-semibold w-100 btn-cus-secondary border">
                  <FaShoppingCart /> Move to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Mobile Stacked List Layout */}
      <div className="d-flex flex-column gap-2 d-md-none">
        {items.map((item) => (
          <Card key={item.id} className="ui-card border-0 shadow-sm p-2">
            <div className="d-flex align-items-center gap-3">
              <div style={{ width: "70px", height: "70px" }} className="shrink-0">
                <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: "contain" }} />
              </div>
              <div className="grow">
                <h6 className="mb-1 text-secondary small fw-normal">{item.title}</h6>
                <p className="fw-bold mb-2">${item.price}</p>
                <div className="d-flex gap-2">
                  <Button size="sm" className="px-2 py-1 text-danger small btn-cus-secondary">
                    Move to cart
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="px-2 py-1 text-danger small">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;
