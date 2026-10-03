import { useEffect, useState } from "react";
import { ProductsApi } from "../../../services/ProductsApi";
import { Container } from "react-bootstrap";


const DealOfferSection = () => {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    ProductsApi.GetProductsService()
      .then((data) => {
        setOffers(data.data.slice(0, 5));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  return (
    <Container className="p-0 p-md-3 my-2">
      <div className="bg-white border border-md rounded-3 overflow-hidden">
        <div className="d-block d-md-none bg-white">
          <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top border-bottom">
            <div>
              <h6 className="fw-bold mb-0 text-dark">Deals and offers</h6>
              <small className="text-muted" style={{ fontSize: '12px' }}>Electronic equipments</small>
            </div>
            <div className="d-flex gap-1 text-center">
              <div className="bg-light px-2 py-1 rounded">
                <span className="fw-bold text-secondary d-block" style={{ fontSize: '13px' }}>13</span>
                <small className="text-muted d-block" style={{ fontSize: '9px' }}>Hour</small>
              </div>
              <div className="bg-light px-2 py-1 rounded">
                <span className="fw-bold text-secondary d-block" style={{ fontSize: '13px' }}>34</span>
                <small className="text-muted d-block" style={{ fontSize: '9px' }}>Min</small>
              </div>
              <div className="bg-light px-2 py-1 rounded">
                <span className="fw-bold text-secondary d-block" style={{ fontSize: '13px' }}>56</span>
                <small className="text-muted d-block" style={{ fontSize: '9px' }}>Sec</small>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-x-auto text-center">
            {offers.map((item) => (
              <div
                key={item.id}
                className="p-3 border-end flex-shrink-0 d-flex flex-column align-items-center justify-content-between"
                style={{ width: '135px' }}
              >
                <div style={{ height: '85px', width: '85px' }} className="d-flex align-items-center justify-content-center mb-2">
                  <img src={item.image} alt={item.name} className="mw-100 mh-100 object-fit-contain" />
                </div>
                <p className="mb-2 text-dark small text-truncate w-100" style={{ fontSize: '13px' }}>{item.name}</p>
                <span className="badge rounded-pill bg-danger-subtle text-danger px-2 py-1 fw-normal" style={{ fontSize: '11px' }}>
                  25%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="d-none d-md-flex align-items-stretch">
          <div className="p-3 border-end d-flex flex-column justify-content-between" style={{ width: '230px', flexShrink: 0 }}>
            <div>
              <h5 className="fw-bold mb-0 text-dark">Deals and offers</h5>
              <p className="text-muted small">Hygiene equipments</p>
            </div>

            <div className="d-flex gap-2 text-center">
              <div className="p-2 rounded bg-secondary text-white flex-fill">
                <span className="fw-bold d-block">04</span>
                <small style={{ fontSize: '10px' }}>Days</small>
              </div>
              <div className="p-2 rounded bg-secondary text-white flex-fill">
                <span className="fw-bold d-block">13</span>
                <small style={{ fontSize: '10px' }}>Hour</small>
              </div>
              <div className="p-2 rounded bg-secondary text-white flex-fill">
                <span className="fw-bold d-block">34</span>
                <small style={{ fontSize: '10px' }}>Min</small>
              </div>
              <div className="p-2 rounded bg-secondary text-white flex-fill">
                <span className="fw-bold d-block">56</span>
                <small style={{ fontSize: '10px' }}>Sec</small>
              </div>
            </div>
          </div>

          <div className="d-flex flex-grow-1">
            {offers.map((item, index) => (
              <div
                key={item.id}
                className={`ui-card p-3 text-center d-flex flex-column align-items-center justify-content-between flex-fill ${index !== offers.length - 1 ? 'border-end' : ''
                  }`}
              >
                <div style={{ height: '100px', width: '100px' }} className="d-flex align-items-center justify-content-center mb-2">
                  <img src={item.image} alt={item.name} className="mw-100 mh-100 object-fit-contain" />
                </div>
                <p className="mb-2 text-dark small fw-medium w-50">{item.name}</p>
                <span className="badge rounded-pill bg-danger-subtle text-danger px-2 py-1 fw-normal">
                  25%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Container>
  );
};

export default DealOfferSection;