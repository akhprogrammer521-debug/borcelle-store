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

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: Tshirt,
      model: "T-shirts with multiple colors for men",
      size: "medium",
      color: "blue",
      seller: "Artel Market",
      price: "78.99",
      quantity: 2,
    },
    {
      id: 2,
      image: Tshirt,
      model: "Solid Backpack blue jeans large size",
      size: "medium",
      color: "blue",
      seller: "Artel Market",
      price: "78.99",
      quantity: 1,
    },
    {
      id: 3,
      image: Tshirt,
      model: "Water boiler black for kitchen, 1200 Watt",
      size: "medium",
      color: "blue",
      seller: "Artel Market",
      price: "78.99",
      quantity: 2,
    },
  ];

  const savedItems = [
    { id: 101, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
    { id: 102, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
    { id: 103, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
    { id: 104, price: "57.70", title: "Regular Fit Resort Shirt", image: Tshirt },
  ];

  return (
    <Layout>
      <Container className="my-3 my-md-4">
        <h5 className="fw-bold mb-3 d-none d-md-block">My cart ({cartItems.length})</h5>

        <Row className="g-4">
          <Col lg={9}>
            <div className="bg-white border-0 border-md rounded-3 p-2 p-md-3 shadow-sm mb-3">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <ProductCart item={item} />
                  {index < cartItems.length - 1 && <hr className="my-2 my-md-3 text-muted" />}
                </div>
              ))}
              <div className="border-bottom" />
              <div className="d-none d-md-block">
                <CartHeaderActions />
              </div>
            </div>
            <TrustBadges />


          </Col>

          <Col lg={3}>
            <div className="d-none d-md-block">
              <CouponCard />
            </div>
            <OrderSummary itemLength={cartItems.length} />
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