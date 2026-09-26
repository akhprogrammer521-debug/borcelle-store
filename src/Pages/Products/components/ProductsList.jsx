import { Col, Row } from "react-bootstrap";
import ProductCard from "../../../Components/ui/ProductCard";
import { ProductsListSkeleton } from "../../../Components/ui/Skeleton";
import { NavLink } from "react-router";

const ProductsList = ({ products, view, isLoading = false }) => {
    if (isLoading) {
        return (
            <div aria-busy="true" aria-label="Loading products">
                <ProductsListSkeleton view={view} />
            </div>
        );
    }

    return (
        <div>
            {view === "grid" ? (
                <Row className="g-3">
                    {products.map((product) => (
                        <Col key={product.id} xs={12} sm={6} xl={4}>
                            <ProductCard product={product} view="grid" />
                        </Col>
                    ))}
                </Row>
            ) : (
                products.map((product) => (
                    <div key={product.id}>
                        <NavLink
                            to={`/products/${product.id}`}
                            className="d-lg-none text-decoration-none custom-nav-link"
                        >
                            <ProductCard
                                product={product}
                                view={view}
                                showDetails={false}
                            />
                        </NavLink>

                        <div className="d-none d-lg-block">
                            <ProductCard
                                product={product}
                                view={view}
                                showDetails
                            />
                        </div>
                    </div>

                ))

            )}
        </div>
    );
};

export default ProductsList;
