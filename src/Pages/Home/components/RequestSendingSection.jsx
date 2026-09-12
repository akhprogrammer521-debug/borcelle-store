import { Container, Row, Col, Form, Button } from "react-bootstrap";

const RequestSendingSection = () => {
    return (
        <Container className="p-0 p-md-3 my-2">
            <div className="image-bg rounded-3 overflow-hidden">
                <div className="blur-color p-3 p-md-4 w-100">
                    <div className="d-block d-md-none text-white py-5">
                        <h5 className="fw-bold mb-2">
                            An easy way to send <br /> requests to all suppliers
                        </h5>
                        <div className="">
                            <Button value={"Send inquiry"} className="mt-2" />
                        </div>
                    </div>
                    <div className="d-none d-md-block">
                        <Row className="align-items-center">
                            <Col md={6} lg={7} className="text-white pe-lg-5">
                                <h3 className="fw-bold mb-3">
                                    An easy way to send requests to all suppliers
                                </h3>
                                <p className="mb-0 opacity-75">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                                </p>
                            </Col>
                            <Col md={6} lg={5}>
                                <div className="sending-card rounded-3 border p-4 bg-white text-dark shadow-sm">
                                    <Form>
                                        <h5 className="fw-bold mb-3 text-dark">Send quote to suppliers</h5>
                                        <Form.Group className="mb-3" controlId="requestItem">
                                            <Form.Control
                                                type="text"
                                                placeholder="What item you need?"
                                                className="p-2"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="requestDetails">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Type more details"
                                                className="p-2"
                                            />
                                        </Form.Group>
                                        <Row className="g-2 mb-3">
                                            <Col xs={7}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Quantity"
                                                    className="p-2"
                                                />
                                            </Col>
                                            <Col xs={5}>
                                                <Form.Select defaultValue="Pcs" className="p-2">
                                                    <option value="Pcs">Pcs</option>
                                                    <option value="Kg">Kg</option>
                                                    <option value="Liters">Liters</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <div className="">
                                            <Button className="btn-cus">Send inquiry</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </Container>
    );
};

export default RequestSendingSection;