import { useState, useEffect } from "react";
import { CategoriesApi } from "../../services/CategoriesApi";
import { Button, Col, Container, Row, Pagination } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";
import { ProductsApi } from "../../services/ProductsApi";
import SubscribeSection from "../../Components/shared/SubscribeSection";
import Layout from "../../Layouts/BreadcumpLayout/Layout";
import { useSearchParams } from "react-router";
import FilterContent from "./components/FilterContent";
import MobileFilters from "./components/MobileFilters";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsList from "./components/ProductsList";
import { useTranslation } from "react-i18next";

const Products = ({ isLoading = false }) => {
  const { t } = useTranslation();

    const [productItems, setProductItems] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);

    const [, setError] = useState(null);
    const [view, setView] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get("search")?.toLowerCase() || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [paginationMeta, setPaginationMeta] = useState(null);

    const categoryIdFromNavbar =
        Number(searchParams.get("category")) || null;

    const activeCategoryId =
        categoryIdFromNavbar || selectedCategoryId;

    const handleCategoryChange = (categoryId) => {
        setSearchParams({});
        setSelectedCategoryId(categoryId);
    };

    const priceFilterProps = {
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        categories,
        selectedCategoryId: activeCategoryId,
        onCategoryChange: handleCategoryChange,
    };

    useEffect(() => {
        CategoriesApi.GetAllCatsService()
            .then((data) => {
                setCategories(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        ProductsApi.GetProductsService(activeCategoryId, currentPage)
            .then((data) => {
                setProductItems(data.data);
                setPaginationMeta(data.meta);
            })
            .catch((err) => {
                console.error(err.message);
                setError(err.message)
            })
            .finally(() => {
                setIsProductsLoading(false)
            });
    }, [activeCategoryId, currentPage]);

    const filteredProducts = productItems.filter((product) =>
        (product.name || "").toLowerCase().includes(searchText)
    );

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
                            {t("products.filters")}
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
                                products={productItems}
                                totalProducts={paginationMeta?.total || 0}
                                view={view}
                                onViewChange={setView}
                            />
                            <ProductsList
                                products={filteredProducts}
                                view={view}
                                isLoading={isLoading || isProductsLoading}
                            />
                            {paginationMeta && (
                                <div className="d-flex justify-content-end align-items-start mt-4 gap-2">
                                    <form action="">
                                        <select name="" id="" className="p-2 border rounded-1 pe-2">
                                            <option value="" className="me-1">{t("products.show10")}</option>
                                            <option value="" className="me-1">{t("products.show20")}</option>
                                            <option value="" className="me-1">{t("products.show30")}</option>
                                            <option value="" className="me-1">{t("products.show40")}</option>
                                        </select>
                                    </form>
                                    <Pagination size="">
                                        <Pagination.Prev
                                            disabled={!paginationMeta.prev}
                                            onClick={() =>
                                                setCurrentPage(paginationMeta.current_page - 1)
                                            }
                                        />

                                        {paginationMeta.links
                                            .filter((link) => /^\d+$/.test(link.label))
                                            .map((link) => (
                                                <Pagination.Item
                                                    key={link.label}
                                                    active={link.active}
                                                    onClick={() => setCurrentPage(Number(link.label))}
                                                >
                                                    {link.label}
                                                </Pagination.Item>
                                            ))}

                                        <Pagination.Next
                                            disabled={!paginationMeta.next}
                                            onClick={() =>
                                                setCurrentPage(paginationMeta.current_page + 1)
                                            }
                                        />
                                    </Pagination>
                                </div>
                            )}
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
