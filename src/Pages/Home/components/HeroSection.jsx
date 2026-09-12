import { Col, Container, Nav, Row } from "react-bootstrap";
import hero from '../../../assets/image/Banner-board-800x420 2.png';
import { BsPersonCircle } from "react-icons/bs";
import Button from "../../../Components/ui/Button";
import SecondButton from "../../../Components/ui/SecondButton";

const HeroSection = () => {
  return (
    <div>
      <Container className="p-3">
        {/* DESKTOP VIEW (Visible on lg screens and up) */}
        <div className="d-none d-lg-flex border rounded-3 p-3 bg-white">
          <Row className="gx-3 w-100 align-items-stretch">
            {/* Left Category Sidebar */}
            <Col lg={3} xl={2}>
              <ul className="d-flex flex-column gap-2 ps-0 mb-0">
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Automobiles</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Clothes and wear</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Home interiors</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Computer and tech</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Tools, equipments</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Sports and outdoor</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Animal and pets</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">Machinery tools</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">More category</Nav.Link></li>
              </ul>
            </Col>

            <Col lg={6} xl={7}>
              <div className="hero-banner-container position-relative overflow-hidden rounded-2 h-100">
                <img src={hero} alt="Latest trending items" className="hero-banner-img w-100 h-100 object-fit-cover" />
                <div className="position-absolute-cus px-4 top-50 start-0 translate-middle-y">
                  <p className="fs-4 mb-1 text-dark">Latest trending</p>
                  <h2 className="fw-bold text-dark mb-3">Electronic items</h2>
                  <button className="bg-light border-0 px-3 py-2 rounded-2 fw-medium shadow-sm">
                    Learn more
                  </button>
                </div>
              </div>
            </Col>

            <Col lg={3}>
              <div className="d-flex flex-column gap-2 h-100">
                <div className="rounded-3 user-bg p-3 d-flex flex-column gap-2">
                  <div className="w-100 d-flex align-items-center gap-2">
                    <BsPersonCircle className="fs-1 text-light user-bg-cus rounded-circle shrink-0" />
                    <p className="mb-0 lh-sm">Hi, user <br /><small className="text-muted">let's get started</small></p>
                  </div>
                  <div className="mt-2">
                    <Button value={"Join us"} className="w-100"/>
                  </div>
                  <div>
                    <SecondButton value={"Log in"} />
                  </div>
                </div>
                <div className="hero-orange-bg p-3 rounded-3 text-light fs-6">
                  Get US $10 off with a new supplier
                </div>
                <div className="hero-pink-bg p-3 rounded-3 text-light fs-6">
                  Send quotes with supplier preferences
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="d-block d-lg-none">
          <div className="mobile-hero-wrapper position-relative overflow-hidden rounded-3">
            <img src={hero} alt="Latest trending items" className="mobile-banner-img w-100 object-fit-cover" />
            <div className="mobile-hero-overlay position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-center">
              <p className="mb-0 fs-6 text-dark opacity-75">Latest trending</p>
              <h3 className="fw-bold text-dark mb-2">Electronic items</h3>
              <div>
                <button className="bg-light border-0 px-3 py-1 rounded-2 fw-medium fs-6 shadow-sm">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;