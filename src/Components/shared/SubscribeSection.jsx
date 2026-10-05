import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SubscribeSection = () => {
  const { t } = useTranslation();
  return (
    <div className="sub-bg body-bg py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className="d-flex flex-column align-items-center text-center px-2">
              <h5 className="fw-bold mb-2 text-dark">
                {t("home.subscribeOnOurNewsletter")}
              </h5>
              <p className="text-secondary small mb-4">
                {t("home.getDailyNewsOnUpcomingOffersFrom")}
              </p>
              
              <Form 
                onSubmit={(e) => e.preventDefault()} 
                className="d-flex flex-column flex-sm-row gap-2 w-100 justify-content-center"
              >
                <div className="position-relative grow">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder={t("common.email")}
                    className="border bg-white px-3 py-2 text-dark"
                  />
                </div>
                <Button className="px-4 py-2 btn-cus">{t("home.subscribe")}</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SubscribeSection;