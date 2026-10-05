import { Col, Container, Row } from "react-bootstrap";
import FooterLists from "./FooterLists";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
    return (
        <footer className="mt-5">
           <FooterLists />
            <div className="copy-custom-bg text-secondary p-3">
                <Container >
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col>
                            <p className="mb-0">{t("footer.2026Ecommerce")}</p>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center gap-3">
                            <p>{t(i18n.resolvedLanguage === "ar" ? "nav.arabic" : "nav.english")}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
