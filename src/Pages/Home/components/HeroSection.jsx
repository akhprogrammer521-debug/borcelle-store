import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import Button from "../../../Components/ui/Button";
import SecondButton from "../../../Components/ui/SecondButton";
import { AuthContext } from "../../../Contexts/AuthContext";

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const navigateTo = useNavigate();

  return (
    <div className="new-banner py-4 py-md-5">
      <Container>
        <Row>
          <Col xs={12} md={7} lg={6}>
            <div className="hero-title p-3 p-lg-5 text-center text-md-start">
              <div className="py-5 d-flex flex-column gap-3">
                <h1 className="fw-bold">
                  Everything You Need, All in One Place
                </h1>

                <p className="text-secondary">
                  Discover thousands of products from trusted suppliers, enjoy
                  secure shopping, and find the latest deals made for you.
                </p>

                <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                  {user
                    ? <>
                      <Button
                        value="Explore Now"
                        className="w-auto"
                        onClick={() => navigateTo("/products")}
                      />
                    </>
                    : <>
                      <Button
                        value="Explore Now"
                        className="w-auto"
                        onClick={() => navigateTo("/products")}
                      />
                      <SecondButton
                        value="Get Started"
                        className="w-auto"
                        onClick={() => navigateTo("/register")}
                      />
                    </>
                  }
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;