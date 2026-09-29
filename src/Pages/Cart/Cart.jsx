import { useEffect, useState } from "react";
import { CartApi } from "../../services/CartApi";
import Layout from "../../Layouts/CartLayout/Layout";
import Tshirt from "../../assets/products_cloth/image 24.png";
import { Container, Row, Col } from "react-bootstrap";

import ProductCart from "./components/ProductCart";
import CartHeaderActions from "./components/CartHeaderActions";
import TrustBadges from "./components/TrustBadges";
import CouponCard from "./components/CouponCard";
import OrderSummary from "./components/OrderSummary";
import SavedForLater from "./components/SavedForLater";
import ShopSection from '../../Components/shared/ShopSection';
import { CartContentSkeleton } from "../../Components/ui/Skeleton";

const Cart = ({onCheckout= false}) => {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    CartApi.GetCartService()
    .then((data)=>{
      setOrders(data.data || [])
    })
    .catch((err)=>{
      setError(err.message)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  },[])

  const savedItems = [
    { id: 101, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
    { id: 102, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
    { id: 103, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
    { id: 104, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
  ];

  return (
    <Layout>
      <Container className="my-3 my-md-4">
        <h5 className="fw-bold mb-3 d-none d-md-block">My cart ({orders.length})</h5>

        <Row className="g-4">
          <Col lg={9}>
            <div className="bg-white border-0 border-md rounded-3 p-2 p-md-3 shadow-sm mb-3" aria-busy={isLoading || undefined}>
              {isLoading ? <CartContentSkeleton /> : <>
                {orders.map((item) => (
                  <div key={item.id}>
                    <ProductCart item={item} />
                  </div>
                ))}
                <div className="border-bottom" />
                <div className="d-none d-md-block">
                  <CartHeaderActions />
                </div>
              </>}
            </div>
            <TrustBadges />


          </Col>

          <Col lg={3}>
            <div className="d-none d-md-block">
              <CouponCard />
            </div>
            <OrderSummary itemLength={orders.length} isLoading={isLoading} onCheckout={onCheckout} />
          </Col>
        </Row>

        <SavedForLater items={savedItems} />

        <div className="d-none d-md-block">
        </div>

        <ShopSection />
      </Container>
    </Layout>
  );
};

export default Cart;
