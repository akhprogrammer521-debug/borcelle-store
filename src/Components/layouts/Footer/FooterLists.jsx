import FooterItems from "./FooterItems";
import { Container, Row, Col, Nav } from "react-bootstrap";

import {
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsYoutube,
  BsApple,
  BsGooglePlay
} from "react-icons/bs";
import logo from '../../../assets/logo/logo.png';
import { useTranslation } from "react-i18next";

const FooterLists = () => {
  const { t } = useTranslation();
  const socialLinks = [
    { name: "Facebook", icon: <BsFacebook />, href: "#" },
    { name: "Twitter", icon: <BsTwitter />, href: "#" },
    { name: "LinkedIn", icon: <BsLinkedin />, href: "#" },
    { name: "Instagram", icon: <BsInstagram />, href: "#" },
    { name: "YouTube", icon: <BsYoutube />, href: "#" }
  ];

  const footerSections = [
    {
      title: t("footer.about"),
      items: [t("footer.aboutUs"), t("footer.findStore"), t("footer.categories"), t("footer.blogs")]
    },
    {
      title: t("footer.partnership"),
      items: [t("footer.aboutUs"), t("footer.findStore"), t("footer.categories"), t("footer.blogs")]
    },
    {
      title: t("footer.information"),
      items: [t("footer.helpCenter"), t("footer.moneyRefound"), t("footer.shipping"), t("common.contactUs")]
    },
    {
      title: t("footer.forUsers"),
      items: [t("common.login"), t("common.register"), t("footer.settings"), t("common.myOrders")]
    }
  ];

  const appLinks = [
    {
      platform: t("footer.appStore"),
      subtitle: t("footer.downloadOnThe"),
      icon: <BsApple />,
      href: "#"
    },
    {
      platform: t("footer.googlePlay"),
      subtitle: t("footer.gETITON"),
      icon: <BsGooglePlay />,
      href: "#"
    }
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col lg={2} sm={12} className="d-flex flex-column p-sm-0">
          <img src={logo} alt={t("footer.logo")} width="60" height="40" className="brand-logo" />
          <p className="w-100 fs-6 text-secondary">
            {t("footer.bestInformationAboutTheCompanyGiesHere")}
          </p>
          <div className="d-flex gap-3">
            {socialLinks.map((social, index) => (
              <Nav.Link key={index} href={social.href} className="custom-nav-link" aria-label={social.name}>
                {social.icon}
              </Nav.Link>
            ))}
          </div>
        </Col>

        {footerSections.map((section, index) => (
          <Col key={index} lg={2} sm={12} className="p-sm-0">
            <ul className="ps-md-5 ps-0">
              <p className="fw-bolder">{section.title}</p>
              {section.items.map((item, itemIdx) => (
                <FooterItems key={itemIdx} footerItems={item} />
              ))}
            </ul>
          </Col>
        ))}

        <Col lg={2} sm={12} className="p-sm-0">
          <ul className="ps-md-5 ps-0">
            <p className="fw-bolder">{t("footer.getApp")}</p>
            <div className="d-lg-block d-flex gap-3">
              {appLinks.map((app, index) => (
                <button
                  key={index}
                  className="btn-cus-app d-flex align-items-center gap-2 my-2 border-0 rounded-2 p-1"
                >
                  <div>{app.icon}</div>
                  <div className="d-flex flex-column fs-6 text-start">
                    <small>{app.subtitle}</small>
                    <p className="m-0">{app.platform}</p>
                  </div>
                </button>
              ))}
            </div>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterLists;
