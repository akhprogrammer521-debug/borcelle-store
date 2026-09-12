import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

const categories = [
    "Mobile accessory",
    "Electronics",
    "Smartphones",
    "Modern tech",
];

const brands = [
    "Samsung",
    "Apple",
    "Huawei",
    "Pocco",
    "Lenovo",
];

const features = [
    "Metallic",
    "Plastic cover",
    "8GB Ram",
    "Super power",
    "Large Memory",
];

const conditions = [
    "Any",
    "Refurbished",
    "Brand new",
    "Old items",
];

const FilterContent = ({
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    idPrefix,
}) => {
    return (
        <Accordion
            defaultActiveKey={["0", "1", "2", "3", "4", "5"]}
            alwaysOpen
            flush
        >
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span className="fw-semibold">
                        Category
                    </span>
                </Accordion.Header>
                <Accordion.Body className="pt-2">
                    <div className="d-flex flex-column gap-3">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                type="button"
                                className="btn p-0 border-0 text-start text-secondary"
                            >
                                {category}
                            </button>
                        ))}
                        <button
                            type="button"
                            className="btn p-0 border-0 text-start text-danger"
                        >
                            See all
                        </button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            {/* Brands */}
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                    <span className="fw-semibold">
                        Brands
                    </span>
                </Accordion.Header>
                <Accordion.Body className="pt-2">
                    <div className="d-flex flex-column gap-2">
                        {brands.map((brand, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                id={`${idPrefix}-brand-${index}`}
                                label={brand}
                            />
                        ))}

                        <button
                            type="button"
                            className="btn p-0 border-0 text-start text-danger mt-1"
                        >
                            See all
                        </button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            {/* Features */}
            <Accordion.Item eventKey="2">
                <Accordion.Header>
                    <span className="fw-semibold">
                        Features
                    </span>
                </Accordion.Header>
                <Accordion.Body className="pt-2">
                    <div className="d-flex flex-column gap-2">
                        {features.map((feature, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                id={`${idPrefix}-feature-${index}`}
                                label={feature}
                            />
                        ))}
                        <button
                            type="button"
                            className="btn p-0 border-0 text-start text-danger mt-1"
                        >
                            See all
                        </button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>

            {/* Price */}
            <Accordion.Item eventKey="3">
                <Accordion.Header>
                    <span className="fw-semibold">
                        Price range
                    </span>
                </Accordion.Header>
                <Accordion.Body>
                    <Form.Range />
                    <Row className="g-2 mb-2">
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label className="small">
                                    Min
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                    value={minPrice}
                                    onChange={(e) =>
                                        setMinPrice(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group>
                                <Form.Label className="small">
                                    Max
                                </Form.Label>

                                <Form.Control
                                    type="number"
                                    placeholder="999999"
                                    value={maxPrice}
                                    onChange={(e) =>
                                        setMaxPrice(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        variant="outline-danger"
                        className="w-100"
                    >
                        Apply
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
            {/* Condition */}
            <Accordion.Item eventKey="4">
                <Accordion.Header>
                    <span className="fw-semibold">
                        Condition
                    </span>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="d-flex flex-column gap-2">
                        {conditions.map((condition, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                name={`${idPrefix}-condition`}
                                id={`${idPrefix}-condition-${index}`}
                                label={condition}
                                defaultChecked={index === 0}
                            />
                        ))}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            {/* Ratings */}
            <Accordion.Item eventKey="5">
                <Accordion.Header>
                    <span className="fw-semibold">
                        Ratings
                    </span>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="d-flex flex-column gap-2">
                        {[5, 4, 3, 2].map((rating) => (
                            <div
                                key={rating}
                                className="d-flex align-items-center gap-2"
                            >
                                <Form.Check
                                    type="checkbox"
                                    id={`${idPrefix}-rating-${rating}`}
                                />

                                <div className="d-flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <BsStarFill
                                            key={star}
                                            size={17}
                                            className={
                                                star <= rating
                                                    ? "text-warning"
                                                    : "text-secondary opacity-25"
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default FilterContent;
