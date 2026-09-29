import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router";

import { ProductsApi } from "../../../services/ProductsApi";
import { CartApi } from "../../../services/CartApi";
import { CartContext } from "../../../Contexts/CartContext";
import Button from "../../../Components/ui/Button";

const RecommendedItems = () => {
  const [recItems, setRecItems] = useState([]);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(null);

  const { setCart } = useContext(CartContext);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    ProductsApi.GetProductsService()
      .then((response) => {
        setRecItems(response.data.slice(0, 10));
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load recommended products.");
      });
  }, []);

  const handleAddingCart = (e, item) => {
    e.preventDefault();

    setError(null);
    setIsSaving(item.id);

    CartApi.AddCartService({
      productId: item.id,
      quantity: 1,
    })
      .then((data) => {
        const addedCartItem = data.data;

        setCart((previousCart) => {
          const updatedCart = [...previousCart, addedCartItem];
          sessionStorage.setItem("userCart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Could not add product to cart.");
      })
      .finally(() => {
        setIsSaving(null);
      });
  }

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  }

  return (
    <Container className="p-2 p-md-3 my-3">
      <h5 className="fw-bold mb-3 text-dark">Recommended items</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-none d-md-block">
        <Row className="g-3">
          {recItems.map((item) => (
            <Col key={item.id} md={3} lg={2} style={{ width: "20%" }}>
              <NavLink to={`/products/${item.id}`} className="text-decoration-none">
                <div className="ui-card bg-white border rounded-3 p-3 h-100 d-flex flex-column justify-content-between grow">
                  <div
                    className="w-100 d-flex align-items-center justify-content-center mb-3"
                    style={{ height: "130px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mw-100 mh-100 object-fit-contain"
                    />
                  </div>

                  <div>
                    <p className="fw-bold mb-1 text-dark">${item.price}</p>
                    <p className="text-muted small mb-0 lh-sm">
                      {item.name}
                    </p>
                  </div>

                  <Button
                    value={isSaving === item.id ? "Adding..." : "Add to cart"}
                    className="mt-3"
                    disabled={isSaving === item.id}
                    onClick={(e) => handleAddingCart(e, item)}
                  />
                </div>
              </NavLink>
            </Col>
          ))}
        </Row>
      </div>

      {/* Mobile: أول 4 منتجات، ثم See more */}
      <div className="d-block d-md-none">
        <Row className="g-2">
          {recItems.slice(0, visibleCount).map((item) => (
            <Col key={item.id} xs={6}>
              <NavLink to={`/products/${item.id}`} className="text-decoration-none">
                <div className="bg-white border rounded-3 p-2 h-100 d-flex flex-column justify-content-between">
                  <div
                    className="d-flex align-items-center justify-content-center my-2"
                    style={{ height: "110px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mw-100 mh-100 object-fit-contain"
                    />
                  </div>

                  <div>
                    <p className="fw-bold mb-1 text-dark small">${item.price}</p>
                    <p className="text-muted small mb-0 lh-sm">
                      {item.name}
                    </p>
                  </div>

                  <Button
                    value={isSaving === item.id ? "Adding..." : "Add to cart"}
                    className="mt-2"
                    disabled={isSaving === item.id}
                    onClick={(e) => handleAddingCart(e, item)}
                  />
                </div>
              </NavLink>
            </Col>
          ))}
        </Row>

        {visibleCount < recItems.length && (
          <Button
            value="See more"
            className="w-100 mt-3"
            onClick={handleSeeMore}
          />
        )}
      </div>
    </Container>
  );
};

export default RecommendedItems;