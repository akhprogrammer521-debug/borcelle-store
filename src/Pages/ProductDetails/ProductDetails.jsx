import ShopSection from "../../Components/shared/ShopSection";
import Layout from "../../Layouts/BreadcumpLayout/Layout";
import { productDetails } from "../../Data/ProductDetails";
import ProductsDetailsCard from "./components/ProductsDetailsCard";

const ProductsDetails = () => {
    return (
        <Layout>
            <ProductsDetailsCard key={productDetails.id} product={productDetails} />
            <ShopSection />
        </Layout>
    );
};

export default ProductsDetails;
