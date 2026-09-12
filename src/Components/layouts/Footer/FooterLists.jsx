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

const FooterLists = () => {
  const socialLinks = [
    { name: "Facebook", icon: <BsFacebook />, href: "#" },
    { name: "Twitter", icon: <BsTwitter />, href: "#" },
    { name: "LinkedIn", icon: <BsLinkedin />, href: "#" },
    { name: "Instagram", icon: <BsInstagram />, href: "#" },
    { name: "YouTube", icon: <BsYoutube />, href: "#" }
  ];

  const footerSections = [
    {
      title: "About",
      items: ["About us", "Find Store", "Categories", "Blogs"]
    },
    {
      title: "Partnership",
      items: ["About us", "Find Store", "Categories", "Blogs"]
    },
    {
      title: "Information",
      items: ["Help Center", "Money Refound", "Shipping", "Contact us"]
    },
    {
      title: "For users",
      items: ["Login", "Register", "Settings", "My Orders"]
    }
  ];

  const appLinks = [
    {
      platform: "App Store",
      subtitle: "Download on the",
      icon: <BsApple />,
      href: "#"
    },
    {
      platform: "Google Play",
      subtitle: "GET IT ON",
      icon: <BsGooglePlay />,
      href: "#"
    }
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col lg={2} sm={12} className="d-flex flex-column p-sm-0">
          <img src={logo} alt="Logo" width="60" height="40" />
          <p className="w-100 fs-6 text-secondary">
            Best information about the company gies here but now lorem ipsum is
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
            <p className="fw-bolder">Get app</p>
            <div className="d-lg-block d-flex gap-3">
              {appLinks.map((app, index) => (
                <button
                  key={index}
                  className="btn-cus-app d-flex align-items-center gap-2 my-2 border-0 rounded-2 p-1 text-light"
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