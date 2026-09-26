import { Col, Container, Row } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";

const RegionSection = () => {
    const countries = [
        { id: 1, countryCode: "AE", name: "Arabic Emirates", email: "shopname.ae" },
        { id: 2, countryCode: "AU", name: "Australia", email: "shopname.au" },
        { id: 3, countryCode: "US", name: "United States", email: "shopname.us" },
        { id: 4, countryCode: "RU", name: "Russia", email: "shopname.ru" },
        { id: 5, countryCode: "IT", name: "Italy", email: "shopname.it" },
        { id: 6, countryCode: "CN", name: "China", email: "shopname.cn" },
        { id: 7, countryCode: "DK", name: "Denmark", email: "shopname.dk" },
        { id: 8, countryCode: "FR", name: "France", email: "shopname.fr" },
        { id: 9, countryCode: "GB", name: "Great Britain", email: "shopname.uk" },
        { id: 10, countryCode: "GB", name: "Great Britain", email: "shopname.uk" },
        { id: 11, countryCode: "GB", name: "Great Britain", email: "shopname.uk" },
        { id: 12, countryCode: "GB", name: "Great Britain", email: "shopname.uk" },
    ];

    return (
        <Container className="my-3">
            <p className="fw-bold">Suppliers by region</p>

            <Row className="g-3">
                {countries.map((item) => (
                    <Col
                        key={item.id}
                        xs={6}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                    >
                        <div
                            className="d-flex align-items-center gap-2 city-item"

                        >
                            <ReactCountryFlag
                                countryCode={item.countryCode}
                                svg
                                title={item.name}
                                style={{
                                    width: "2.5em",
                                    height: "2.5em",
                                }}
                            />

                            <div className="d-flex flex-column justify-content-center fs-6">
                                <p className="mb-0 lh-sm">{item.name}</p>
                                <p className="mb-0 lh-sm text-secondary">{item.email}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RegionSection;