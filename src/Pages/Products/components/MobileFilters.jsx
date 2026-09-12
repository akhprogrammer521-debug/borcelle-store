import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import FilterContent from "./FilterContent";

const MobileFilters = ({ show, onHide, priceFilterProps }) => {
    return (
        <Offcanvas show={show} onHide={onHide} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="p-0">
                <FilterContent
                    {...priceFilterProps}
                    idPrefix="mobile-filters"
                />
            </Offcanvas.Body>

            <div className="p-3 border-top">
                <Row className="g-2">
                    <Col>
                        <Button
                            variant="outline-secondary"
                            className="w-100"
                        >
                            Clear
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            variant="danger"
                            className="w-100"
                            onClick={onHide}
                        >
                            Apply
                        </Button>
                    </Col>
                </Row>
            </div>
        </Offcanvas>
    );
};

export default MobileFilters;
