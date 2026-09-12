import { Col, Container, Row } from "react-bootstrap";
import FooterLists from "./FooterLists";

const Footer = () => {
    return (
        <footer className="mt-5">
           <FooterLists />
            <div className="copy-custom-bg text-secondary p-3">
                <Container >
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col>
                            <p className="mb-0">&copy; 2026 Ecommerce.</p>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center gap-3">
                            <p>English</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
