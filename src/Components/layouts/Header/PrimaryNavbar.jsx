import { useEffect, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router";
import { CategoriesService } from "../../../services/CategoriesService";
import { useTranslation } from "react-i18next";

const PrimaryNavbar = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoriesService.GetAllCatsApi()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const displayedCategories = categories.slice(0, 4);

  return (
    <Navbar expand="lg" className="d-none p-0 d-lg-block">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-between w-100">
            <div className="d-flex">
              <Offcanvas className="mobile-offcanvas" />

              <Nav.Link
                as={NavLink}
                to="/products"
                className="custom-nav-link"
              >
                {t("nav.allCategory")}
              </Nav.Link>

              {displayedCategories.map((category) => (
                <Nav.Link
                  key={category.id}
                  as={NavLink}
                  to={`/products?category=${category.id}`}
                  className="custom-nav-link"
                >
                  {category.name}
                </Nav.Link>
              ))}
            </div>

            <NavDropdown
              title={t("nav.languageCurrency", { language: t(i18n.resolvedLanguage === "ar" ? "nav.arabic" : "nav.english"), currency: "USD" })}
              id="basic-nav-dropdown"
              className="custom-nav-drop"
            >
              <NavDropdown.Item href="#action/3.1">
                {t("nav.english")}
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">
                USD
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimaryNavbar;
