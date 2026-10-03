import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ProductsApi } from "../../../services/ProductsApi";
import homeBanner from "../../../assets/products_tech/image 98.png";

const CunsomerElectronic = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    ProductsApi.GetProductsService()
      .then((data) => {
        setItems(data.data.slice(7, 20));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container className="p-0 p-md-3 my-2">
      <div className="bg-white border rounded-3 overflow-hidden">
        <div className="d-block d-md-none p-3">
          <h6 className="fw-bold mb-3 text-dark">Consumer electronics and gadgets</h6>
          <div className="d-flex overflow-x-auto gap-2">
            {items.map((product) => (
              <div
                key={product.id}
                className="border rounded-2 p-2 bg-white shrink-0 d-flex flex-column align-items-center text-center"
                style={{ width: "135px" }}
              >
                <div style={{ height: "85px", width: "85px" }} className="d-flex align-items-center justify-content-center mb-2">
                  <img src={product.image} alt={product.name} className="mw-100 mh-100 object-fit-contain" />
                </div>
                <p className="mb-1 text-dark small text-truncate w-100">{product.name}</p>
                <small className="text-muted">USD {product.price}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="d-none d-md-block">
          <Row className="g-0">
            <Col md={3}>
              <div
                className="p-4 h-100 d-flex flex-column justify-content-between position-relative"
                style={{
                  backgroundImage: `url(${homeBanner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div>
                  <h5 className="fw-bold image-banner-title mb-2">Consumer <br />electronics and gadgets</h5>
                  <button className="btn btn-light bg-white border-0 fw-medium shadow-sm btn-sm px-3 py-2 rounded-2">
                    Source now
                  </button>
                </div>
              </div>
            </Col>

            <Col md={9}>
              <Row className="g-0">
                {items.map((product) => (
                  <Col md={6} lg={3} key={product.id} className="ui-card border-bottom border-end p-3">
                    <div className="d-flex justify-content-between align-items-start h-100">
                      <div>
                        <p className="mb-1 text-dark fw-medium small">{product.name}</p>
                        <small className="text-muted d-block" style={{ fontSize: '12px' }}>From<br />USD {product.price}</small>
                      </div>
                      <div style={{ width: '65px', height: '65px' }} className="d-flex align-items-center justify-content-center shrink-0 ms-2">
                        <img src={product.image} alt={product.title} className="mw-100 mh-100 object-fit-contain" />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

      </div>
    </Container>
  );
}

export default CunsomerElectronic
