import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Button from '../../../Components/ui/Button';

import Tshirt from '../../../assets/products_cloth/Bitmap.png';
import Jacket from '../../../assets/products_cloth/2 1.png';
import Suit from '../../../assets/products_cloth/image 30.png';
import Wallet from '../../../assets/products_cloth/image 24.png';
import Bag from '../../../assets/products_cloth/image 26.png';
import Short from '../../../assets/products_cloth/Bitmap.png';
import Jack from '../../../assets/products_home/image 90.png';
import Headphone from '../../../assets/products_tech/image 86.png';
import Jeans from '../../../assets/products_tech/image 85.png';

const RecommendedItems = () => {
  const recItems = [
    { id: 1, price: "10.30", desc: "T-shirts with multiple colors, for men", image: Tshirt },
    { id: 2, price: "10.30", desc: "Jeans shorts for men blue color", image: Jacket },
    { id: 3, price: "12.50", desc: "Brown winter coat medium size", image: Suit },
    { id: 4, price: "34.00", desc: "Jeans bag for travel for men", image: Wallet },
    { id: 5, price: "99.00", desc: "Leather wallet", image: Bag },
    { id: 6, price: "9.99", desc: "Canon camera black, 100x zoom", image: Short },
    { id: 7, price: "8.99", desc: "Headset for gaming with mic", image: Headphone },
    { id: 8, price: "10.30", desc: "Smartwatch silver color modern", image: Bag },
    { id: 9, price: "10.30", desc: "Blue wallet for men leather metarfial", image: Jeans },
    { id: 10, price: "80.95", desc: "Jeans bag for travel for men", image: Jack },
  ];

  const [visibleCount, setVisibleCount] = useState(4);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <Container className="p-2 p-md-3 my-3">
      <h5 className="fw-bold mb-3 text-dark">Recommended items</h5>

      {/* MOBILE VIEW */}
      <div className="d-block d-md-none">
        <Row className="g-2">
          {recItems.slice(0, visibleCount).map((item) => (
            <Col xs={6} key={item.id}>
              <div className="bg-white border rounded-3 p-2 h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-center my-2" style={{ height: "110px" }}>
                  <img src={item.image} alt={item.desc} className="mw-100 mh-100 object-fit-contain" />
                </div>
                <div>
                  <p className="fw-bold mb-1 text-dark small">${item.price}</p>
                  <p className="text-muted small mb-0 lh-sm" style={{ fontSize: "11px" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* See More Button */}
        {visibleCount < recItems.length && (
          <div className="mt-3 w-100">
            <Button
              value={"See More"}
              onClick={handleSeeMore}
              className="w-100"
            />
          </div>
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="d-none d-md-block">
        <Row className="g-3">
          {recItems.map((item) => (
            <Col key={item.id} md={3} lg={2} className="flex-grow-1" style={{ width: "20%" }}>
              <div className="bg-white border rounded-3 p-3 h-100 d-flex flex-column align-items-start justify-content-between">
                <div className="w-100 d-flex align-items-center justify-content-center mb-3" style={{ height: "130px" }}>
                  <img src={item.image} alt={item.desc} className="mw-100 mh-100 object-fit-contain" />
                </div>
                <div>
                  <p className="fw-bold mb-1 text-dark fs-6">${item.price}</p>
                  <p className="text-muted small mb-0 lh-sm" style={{ fontSize: "12px" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default RecommendedItems;