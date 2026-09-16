import { Col, Container, Row } from "react-bootstrap";

const Layout = ({ leftContent, rightContent }) => {
    return (
        <Container fluid className="p-0 bg-vh">
            <Row className="g-0 d-none d-lg-flex">
                <Col lg={6} className="">
                    <div className="auth-left-bg vh-100">
                        <div className="auth-left-overlay h-100 d-flex flex-column p-5">
                            {leftContent}
                        </div>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="bg-white px-4 px-xl-5">
                        {rightContent}
                    </div>
                </Col>
            </Row>

            {/* Mobile */}
            <div className="d-lg-none position-relative  mobile-auth-bg">
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
