import { Col, Container, Row, Form, Button } from "react-bootstrap";

const SubscribeSection = () => {
  return (
    <div className="sub-bg body-bg py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className="d-flex flex-column align-items-center text-center px-2">
              <h5 className="fw-bold mb-2 text-dark">
                Subscribe on our newsletter
              </h5>
              <p className="text-secondary small mb-4">
                Get daily news on upcoming offers from many suppliers all over the world
              </p>
              
              <Form 
                onSubmit={(e) => e.preventDefault()} 
                className="d-flex flex-column flex-sm-row gap-2 w-100 justify-content-center"
              >
                <div className="position-relative grow">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border bg-white px-3 py-2 text-dark"
                  />
                </div>
                <Button className="px-4 py-2 btn-cus">Subscribe</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SubscribeSection;