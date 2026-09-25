import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

import ShopSection from "../../Components/shared/ShopSection";
import { ProductDetailsSkeleton } from "../../Components/ui/Skeleton";
import Layout from "../../Layouts/BreadcumpLayout/Layout";
import { productDetails } from "../../Data/ProductDetails";
import { ProductsApi } from "../../services/ProductsApi";

import ProductsDetailsCard from "./components/ProductsDetailsCard";

const ProductsDetails = ({ onInquiry }) => {
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { pID } = useParams();

    useEffect(() => {
        ProductsApi.GetProductByIdService(pID)
            .then((data) => {
                setDetails(data.data);
            })
            .catch((error) => {
                console.error(error.message);
                setDetails(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [pID]);

    return (
        <Layout>
            {isLoading ? (
                <Container
                    fluid="md"
                    className="px-2 px-md-3 py-3"
                    aria-busy="true"
                    aria-label="Loading product details"
                >
                    <ProductDetailsSkeleton />
                </Container>
            ) : details ? (
                <ProductsDetailsCard
                    key={details.id}
                    product={details}
                    staticProduct={productDetails}
                    onInquiry={onInquiry}
                />
            ) : (
                <p className="text-center py-5">
                    Product not found.
                </p>
            )}

            <ShopSection />
        </Layout>
    );
};

export default ProductsDetails;