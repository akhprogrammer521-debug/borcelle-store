import { Col, Container, Row } from "react-bootstrap";

// Banner Image
import homeBanner from "../../../assets/products_tech/image 98.png";

// Product Images
import softChairs from "../../../assets/products_tech/image 23.png";
import sofaChair from "../../../assets/products_tech/image 28.png";
import kitchenDishes from "../../../assets/products_tech/image 29.png";
import smartWatches from "../../../assets/products_tech/image 32.png";
import kitchenMixer from "../../../assets/products_tech/image 33.png";
import blenders from "../../../assets/products_tech/image 34 (2).png";
import homeAppliance from "../../../assets/products_tech/image 35 (2).png";
import coffeeMaker from "../../../assets/products_tech/image 85.png";

const CunsomerElectronic = () => {
  const items = [
    { id: 1, title: "Soft chairs", price: "USD 19", image: softChairs },
    { id: 2, title: "Sofa & chair", price: "USD 19", image: sofaChair },
    { id: 3, title: "Kitchen dishes", price: "USD 19", image: kitchenDishes },
    { id: 4, title: "Smart watches", price: "USD 19", image: smartWatches },
    { id: 5, title: "Kitchen mixer", price: "USD 100", image: kitchenMixer },
    { id: 6, title: "Blenders", price: "USD 39", image: blenders },
    { id: 7, title: "Home appliance", price: "USD 19", image: homeAppliance },
    { id: 8, title: "Coffee maker", price: "USD 10", image: coffeeMaker },
  ];

  return (
    <Container className="p-0 p-md-3 my-2">
      <div className="bg-white border rounded-3 overflow-hidden">

        {/* MOBILE VIEW (Header + Horizontal Scroll / Grid Layout) */}
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
                  <img src={product.image} alt={product.title} className="mw-100 mh-100 object-fit-contain" />
                </div>
                <p className="mb-1 text-dark small text-truncate w-100">{product.title}</p>
                <small className="text-muted">From {product.price}</small>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW (Banner on Left + 8 Grid Items on Right) */}
        <div className="d-none d-md-block">
          <Row className="g-0">
            {/* Left Category Banner */}
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

            {/* Right Products Grid (4 Columns x 2 Rows) */}
            <Col md={9}>
              <Row className="g-0">
                {items.map((product) => (
                  <Col md={3} key={product.id} className="border-bottom border-end p-3">
                    <div className="d-flex justify-content-between align-items-start h-100">
                      <div>
                        <p className="mb-1 text-dark fw-medium small">{product.title}</p>
                        <small className="text-muted d-block" style={{ fontSize: '12px' }}>From<br />{product.price}</small>
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
