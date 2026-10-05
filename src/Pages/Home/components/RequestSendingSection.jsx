import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "../../../Components/ui/Button"
import { useState } from "react";
import { ContactUsApi } from "../../../services/ContactUsApi";
import { useTranslation } from "react-i18next";
const RequestSendingSection = () => {
  const { t } = useTranslation();

    const [contactUs, setContactUs] = useState({
        type: "EMAIL",
        email: "",
        message: ""
    });
    const [error, setError] = useState(false);
    const [isSaving, setIsSaving] = useState(false)


    const handleContactUs = (e) => {
        e.preventDefault()
        setError(false)
        setIsSaving(false)
        ContactUsApi.ContactUsService(contactUs)
            .then(() => {
                setContactUs({
                    type: "EMAIL",
                    email: "",
                    message: "",
                });
                setIsSaving(true)
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally((e) => {
                console.log(e)
            })
    }

    return (
        <Container className="p-0 p-md-3 my-2">
            <div className="image-bg rounded-3 overflow-hidden">
                <div className="blur-color p-3 p-md-4 w-100 d-flex flex-column">
                    <div className="d-block d-md-none text-white py-5">
                        <h5 className="fw-bold mb-2">
                            {t("home.anEasyWayToSend")} <br /> {t("home.requestsToAllSuppliers")}
                        </h5>
                    </div>
                    <div className="d-block">
                        <Row className="align-items-center">
                            <Col md={6} lg={7} className="d-none d-md-block text-white pe-lg-5 align-items-start">
                                <h3 className="fw-bold mb-3">
                                    {t("home.anEasyWayToSendRequestsTo")}
                                </h3>
                                <p className="mb-0 opacity-75">
                                    {t("home.loremIpsumDolorSitAmetConsecteturAdipisicing")}
                                </p>
                            </Col>
                            <Col md={6} lg={5}>
                                <div className="sending-card rounded-3 border p-4 bg-white text-dark shadow-sm">
                                    <Form onSubmit={handleContactUs} >
                                        <h5 className="fw-bold mb-3 text-dark">{t("home.sendQuoteToSuppliers")}</h5>
                                        <Form.Group className="mb-3" controlId="requestItem">
                                            <Form.Control
                                                type="email"
                                                placeholder={t("home.whatItemYouNeed")}
                                                className="p-2"
                                                value={contactUs.email}
                                                onChange={(e) => {
                                                    setContactUs({
                                                        ...contactUs,
                                                        email: e.target.value
                                                    })
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="requestDetails">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder={t("home.typeMoreDetails")}
                                                className="p-2"
                                                value={contactUs.message}
                                                onChange={(e) => {
                                                    setContactUs({
                                                        ...contactUs,
                                                        message: e.target.value
                                                    })
                                                }}
                                            />
                                        </Form.Group>
                                        <Row className="g-2 mb-3">
                                            <Col xs={7}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={t("home.quantity")}
                                                    className="p-2"
                                                />
                                            </Col>
                                            <Col xs={5}>
                                                <Form.Select defaultValue="Pcs" className="p-2">
                                                    <option value="Pcs">{t("home.pcs")}</option>
                                                    <option value="Kg">{t("home.kg")}</option>
                                                    <option value="Liters">{t("home.liters")}</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        {
                                            error && (<div className="alert alert-warning">{error}</div>)
                                        }
                                        {
                                            isSaving && (<div className="alert alert-success">{t("home.theMessageSentSuccessfully")}</div>)
                                        }
                                        <Button value={t("productDetails.sendInquiry")} type="submit" className="w-auto" />
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
