import ShopSection from "../../Components/shared/ShopSection";
import Layout from "../../Layouts/BreadcumpLayout/Layout";
import { productDetails } from "../../Data/ProductDetails";
import ProductsDetailsCard from "./components/ProductsDetailsCard";
import { ProductDetailsSkeleton } from "../../Components/ui/Skeleton";
import { Container } from "react-bootstrap";

const ProductsDetails = ({ isLoading = false, product = productDetails, onInquiry }) => {
    return (
        <Layout>
            {isLoading ? (
                <Container fluid="md" className="px-2 px-md-3 py-3" aria-busy="true" aria-label="Loading product details">
                    <ProductDetailsSkeleton />
                </Container>
            ) : (
                <ProductsDetailsCard key={product.id} product={product} onInquiry={onInquiry} />
            )}
            <ShopSection />
        </Layout>
    );
};

export default ProductsDetails;
