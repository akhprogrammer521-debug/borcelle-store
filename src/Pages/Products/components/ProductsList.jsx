import { Col, Row } from "react-bootstrap";
import ProductCard from "../../../Components/ui/ProductCard";

const ProductsList = ({ products, view }) => {
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
