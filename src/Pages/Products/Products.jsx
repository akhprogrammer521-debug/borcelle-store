import { useState, useEffect } from "react";
import { CategoriesApi } from "../../services/CategoriesApi";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";
import { ProductsApi } from "../../services/ProductsApi";
import SubscribeSection from "../../Components/shared/SubscribeSection";
import Layout from "../../Layouts/BreadcumpLayout/Layout";

import FilterContent from "./components/FilterContent";
import MobileFilters from "./components/MobileFilters";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsList from "./components/ProductsList";

const Products = ({ isLoading = false }) => {
    const [productItems, setProductItems] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);
    const [view, setView] = useState("list");
    const [showFilters, setShowFilters] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const priceFilterProps = {
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        categories,
        selectedCategoryId,
        onCategoryChange: setSelectedCategoryId,
    };

    useEffect(() => {
        CategoriesApi.GetAllCatsService()
            .then((data) => {
                setCategories(data.data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        ProductsApi.GetProductsService(selectedCategoryId)
            .then((data) => {
                setProductItems(data.data);
            })
            .catch((error) => {
                console.error(error.message);
                setProductItems([])
            })
            .finally(() => {
                setIsProductsLoading(false)
            });
    }, [selectedCategoryId]);

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
                        <Col lg={3} className="d-none d-lg-block bg-light">
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
                            <ProductsList products={productItems} view={view} isLoading={isLoading || isProductsLoading} />
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
