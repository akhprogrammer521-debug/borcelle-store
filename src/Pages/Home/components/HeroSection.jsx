import { useContext } from "react"
import { Col, Container, Nav, Row } from "react-bootstrap";
import hero from '../../../assets/image/Banner-board-800x420 2.png';
import { BsPersonCircle } from "react-icons/bs";
import Button from "../../../Components/ui/Button";
import SecondButton from "../../../Components/ui/SecondButton";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext";
import { CartContext } from "../../../Contexts/CartContext";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const navigateTo = useNavigate()

  const handleButton = () => {
    navigateTo('/register')
  }

  const handleLogin = () => {
    navigateTo('/login')
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // sessionStorage.removeItem("userCart");

    setUser(null);
    setCart([]);
    navigateTo('/')
  }

  return (
    <div>
      <Container className="p-3">
        <div className="d-none d-lg-flex border rounded-3 p-3 bg-white">
          <Row className="gx-3 w-100 align-items-stretch">
            <Col lg={3} xl={2}>
              <ul className="d-flex flex-column gap-2 ps-0 mb-0">
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.automobiles")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.clothesAndWear")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.homeInteriors")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.computerAndTech")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.toolsEquipments")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.sportsAndOutdoor")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.animalAndPets")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.machineryTools")}</Nav.Link></li>
                <li className="list-unstyled hero-link"><Nav.Link href="" className="p-1">{t("home.moreCategory")}</Nav.Link></li>
              </ul>
            </Col>

            <Col lg={6} xl={7}>
              <div className="hero-banner-container position-relative overflow-hidden rounded-2 h-100">
                <img src={hero} alt={t("home.latestTrendingItems")} className="hero-banner-img w-100 h-100 object-fit-cover" />
                <div className="position-absolute-cus px-4 top-50 start-0 translate-middle-y">
                  <p className="fs-4 mb-1 image-banner-title">{t("home.latestTrending")}</p>
                  <h2 className="fw-bold image-banner-title mb-3">{t("home.electronicItems")}</h2>
                  <button className="bg-light border-0 px-3 py-2 rounded-2 fw-medium shadow-sm">
                    {t("home.learnMore")}
                  </button>
                </div>
              </div>
            </Col>

            <Col lg={3}>
              <div className="d-flex flex-column gap-2 h-100">
                {
                  user
                    ? <>
                      <div className="rounded-3 user-bg p-3 d-flex flex-column gap-2">
                        <div className="w-100 d-flex align-items-center gap-2">
                          <BsPersonCircle className="fs-1 text-light user-bg-cus rounded-circle shrink-0" />
                          <p className="mb-0 lh-sm"> {t("home.greeting", { name: user.data.name })} <br /><small className="text-muted">{t("home.letsGetStarted")}</small></p>
                          <Button value={t("nav.logout")} onClick={handleLogout} />
                        </div>
                      </div>
                    </>
                    : <div className="rounded-3 user-bg p-3 d-flex flex-column gap-2">
                      <div className="w-100 d-flex align-items-center gap-2">
                        <BsPersonCircle className="fs-1 text-light user-bg-cus rounded-circle shrink-0" />
                        <p className="mb-0 lh-sm">{t("home.hiUser")} <br /><small className="text-muted">{t("home.letsGetStarted")}</small></p>
                      </div>
                      <div className="mt-2">
                        <Button value={t("auth.joinUs")} className="w-100" onClick={handleButton} />
                      </div>
                      <div>
                        <SecondButton value={t("auth.logIn")} onClick={handleLogin} />
                      </div>
                    </div>
                }
                <div className="hero-orange-bg p-3 rounded-3 text-light fs-6">
                  {t("home.getUS10OffWithANew")}
                </div>
                <div className="hero-pink-bg p-3 rounded-3 text-light fs-6">
                  {t("home.sendQuotesWithSupplierPreferences")}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="d-block d-lg-none">
          <div className="mobile-hero-wrapper position-relative overflow-hidden rounded-3">
            <img src={hero} alt={t("home.latestTrendingItems")} className="mobile-banner-img w-100 object-fit-cover" />
            <div className="mobile-hero-overlay position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-center">
              <p className="mb-0 fs-6 image-banner-title opacity-75">{t("home.latestTrending")}</p>
              <h3 className="fw-bold image-banner-title mb-2">{t("home.electronicItems")}</h3>
              <div>
                <button className="bg-light border-0 px-3 py-1 rounded-2 fw-medium fs-6 shadow-sm">
                  {t("home.learnMore")}
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
