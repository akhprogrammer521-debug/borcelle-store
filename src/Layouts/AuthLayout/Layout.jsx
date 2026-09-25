import { Col, Container, Row } from "react-bootstrap";

const Layout = ({ leftContent, rightContent }) => {
    return (
        <Container fluid className="p-0">
            <Row className="g-0 min-vh-100 d-none d-lg-flex">
                <Col lg={6} className="">
                    <div className="auth-left-bg vh-100">
                        <div className="auth-left-overlay min-vh-100 d-flex align-items-center justify-content-center">
                            {leftContent}
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-4 px-xl-5">
                        {rightContent}
                    </div>
                </Col>
            </Row>

            {/* Mobile */}
            <div className="d-lg-none position-relative min-vh-100 mobile-auth-bg">
                <div className="mobile-top-image position-absolute top-0 start-0 w-100" />
                <div className="position-relative z-1 px-2 pt-4 pb-3">
                    <div className="mobile-auth-card mx-auto bg-light rounded-4 shadow overflow-hidden">
                        <div>
                            {leftContent}
                        </div>
                        <div className="px-3 pb-4">
                            {rightContent}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Layout;