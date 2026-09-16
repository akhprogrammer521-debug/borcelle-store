import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";

import SubscribeSection from "../../Components/shared/SubscribeSection";
import Layout from "../../Layouts/BreadcumpLayout/Layout";
import { products } from "../../Data/Products";

import FilterContent from "./components/FilterContent";
import MobileFilters from "./components/MobileFilters";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsList from "./components/ProductsList";

const Products = () => {
    const [view, setView] = useState("list");
    const [showFilters, setShowFilters] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const priceFilterProps = {
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
    };

    return (
        <>
            <Layout>
                <Container className="py-4">
                    <div className="d-lg-none mb-3">
                        <Button
                            variant="outline-danger"
                            className="d-flex align-items-center gap-2"
                            onClick={() => setShowFilters(true)}
                        >
                            <BsFilter size={20} />
                            Filters
                        </Button>
                    </div>

                    <Row className="g-4">
                        <Col lg={3} className="d-none d-lg-block">
                            <FilterContent
                                {...priceFilterProps}
                                idPrefix="desktop-filters"
                            />
                        </Col>

                        <Col xs={12} lg={9}>
                            <ProductsToolbar
                                view={view}
                                onViewChange={setView}
                            />
                            <ProductsList products={products} view={view} />
                        </Col>
                    </Row>
                </Container>

                <SubscribeSection />
            </Layout>

            <MobileFilters
                show={showFilters}
                onHide={() => setShowFilters(false)}
                priceFilterProps={priceFilterProps}
            />
        </>
    );
};

export default Products;
