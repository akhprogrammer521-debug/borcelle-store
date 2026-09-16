import { Col, Row } from "react-bootstrap";
import ProductCard from "../../../Components/ui/ProductCard";
import { ProductsListSkeleton } from "../../../Components/ui/Skeleton";

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
                    <ProductCard
                        key={product.id}
                        product={product}
                        view="list"
                    />
                ))
            )}
        </div>
    );
};

export default ProductsList;
