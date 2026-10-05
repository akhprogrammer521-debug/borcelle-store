import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router";
import { CategoriesService } from "../../../services/CategoriesService";
import { CartContext } from '../../../Contexts/CartContext';
import { AuthContext } from "../../../Contexts/AuthContext"
import { CartService } from '../../../services/CartService';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ThemeToggle from '../../../theme/ThemeToggle';

import {
  BsFillPersonFill,
  BsChatLeftTextFill,
  BsFillHeartFill,
  BsFillCartFill,
  BsList,
  BsSearch,
  BsHouseDoor,
  BsListUl,
  BsHeart,
  BsBoxSeam,
  BsGlobe,
  BsHeadset,
  BsBuilding,
  BsPersonCircle,
  BsX,
  BsTrashFill
} from "react-icons/bs";
import { LuUserPlus } from "react-icons/lu";
import LanguageSwitcher from "../../ui/LanguageSwitcher";

import logo from '../../../assets/logo/logo.png';
import { useTranslation } from "react-i18next";

const TopNavbar = ({ onCategoryChange }) => {
  const { t, i18n } = useTranslation();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const [setOrders] = useState([]);

  const { user } = useContext(AuthContext)

  const [categories, setCategories] = useState([]);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);
  const [, setError] = useState(false);

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    CategoriesService.GetAllCatsApi()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [setCategories]);

  const handleRemoveItem = (cartItemId) => {
    CartService.DeleteCartApi(cartItemId)
      .then(() => {
        setCart((previousCart) =>
          previousCart.filter((item) => item.id !== cartItemId)
        );
        setOrders((previousOrders) =>
          previousOrders.filter((order) => order.id !== cartItemId)
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const updateQuantity = (cartItem, change) => {
    const newQuantity = cartItem.quantity + change;

    if (newQuantity < 1) return;

    CartService.AddCartApi({
      productId: cartItem.product.id,
      quantity: newQuantity,
    })
      .then((data) => {
        const updatedCartItem = data.data;

        setCart((previousCart) => {
          const updatedCart = previousCart.map((item) =>
            item.id === cartItem.id
              ? updatedCartItem
              : item
          );
          return updatedCart;
        });
        setOrders((previousOrders) => {
          const updatedOrders = previousOrders.map((item) =>
            item.id === cartItem.id
              ? updatedCartItem
              : item
          );
          return updatedOrders;
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleSearch = (e) => {
    e.preventDefault();

    const text = searchText.trim();

    navigate(
      text
        ? `/products?search=${encodeURIComponent(text)}`
        : "/products"
    );
  };

  const links = [
    { name: t("nav.profile"), to: "/profile", icon: <BsFillPersonFill size={20} /> },
    { name: t("nav.message"), to: "/profile/term&condition", icon: <BsChatLeftTextFill size={18} /> },
    { name: t("common.orders"), to: "/cart", icon: <BsFillHeartFill size={18} /> },
    { name: t("nav.myCart"), to: "/", icon: <BsFillCartFill size={18} />, action: handleCartShow },

    {
      name: "",
      icon: <LanguageSwitcher />
    }
  ];

  const canvasLinks = [
    { name: t("common.home"), to: "/", icon: <BsHouseDoor /> },
    { name: t("nav.categories"), to: "/products", icon: <BsListUl /> },
    { name: t("common.favorites"), to: "/", icon: <BsHeart /> },
    { name: t("common.myOrders"), to: "/cart", icon: <BsBoxSeam /> },
    { name: t("nav.languageAndCurrency", { language: t(i18n.resolvedLanguage === "ar" ? "nav.arabic" : "nav.english"), currency: "USD" }), to: "/", icon: <BsGlobe />, dividerBefore: true },
    { name: t("common.contactUs2"), to: "/profile/contact-us", icon: <BsHeadset /> },
    { name: t("nav.about"), to: "/", icon: <BsBuilding /> }
  ];

  return (
    <>
      <Container>
        <Navbar expand="lg" className="d-none p-0 d-lg-flex justify-content-between align-items-center gap-3">
          <div>
            <Navbar.Brand as={NavLink} to={'/'}>
              <img alt={t("nav.logo")} src={logo} width="60" height="40" className="brand-logo d-inline-block align-top" />
            </Navbar.Brand>
          </div>
          <div className="desktop-search">
            <Form
              className="d-flex gap-3 align-items-center customem-nav-form"
              onSubmit={handleSearch}
            >
              <Form.Control
                type="search"
                placeholder={t("common.search")}
                className="custom-nav-search"
                aria-label={t("common.search")}
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value) }}
              />
              <NavDropdown title={t("nav.allCategories")} id="basic-nav-dropdown" className="custom-nav-dropdown">
                {categories.map((category, index) => (
                  <Nav.Link
                    key={category.id}
                    as={NavLink} to={`/products?category=${category.id}`}
                    className={`text-black p-1 ${index !== category.length - 1 ? 'border-bottom' : ''}
                  `}
                    onClick={() => { onCategoryChange(category.id) }}
                  >{category.name}</Nav.Link>
                ))}
              </NavDropdown>
              <Button
                variant="outline-success"
                className="custom-nav-button"
                type="submit"
              >
                {t("common.search")}
              </Button>
            </Form>
          </div>
          <div>
            <Nav className="me-auto my-lg-0 d-flex align-items-center gap-3">
              {links.map((link) => {
                const isCart = link.action === handleCartShow;
                return (
                  <Nav.Link
                    key={link.name}
                    as={link.action ? 'button' : NavLink}
                    to={link.to}
                    href={link.href}
                    onClick={link.action}
                    className="custom-nav-link border-0 bg-transparent"
                  >
                    <div className="d-flex flex-column align-items-center">
                      <span className={isCart ? 'cart-icon-wrapper' : ''}>
                        {link.icon}

                        {isCart && cart.length > 0 && (
                          <span className="cart-badge">{cart.length}</span>
                        )}
                      </span>

                      <p className="fs-6 mb-0">{link.name}</p>
                    </div>
                  </Nav.Link>
                );
              })}
              <ThemeToggle />
              {/* <LanguageSwitcher /> */}
            </Nav>
          </div>
        </Navbar>

        <div className="d-block d-lg-none py-2">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <Button variant="link" className="p-0 text-dark border-0" onClick={handleShow}>
                <BsList size={28} />
              </Button>
              <Navbar.Brand as={NavLink} to={'/'} className="m-0">
                <img alt={t("nav.logo")} src={logo} width="70" height="50" className="brand-logo" />
              </Navbar.Brand>
            </div>
            <div className="d-flex align-items-center text-dark gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <Nav.Link onClick={handleCartShow} className="p-0 text-dark position-relative">
                <BsFillCartFill size={22} />
                {cart.length > 0 && (
                  <span className="cart-badge-mobile">{cart.length}</span>
                )}
              </Nav.Link>
              {
                user
                  ? <Nav.Link as={NavLink} to={'/profile'} className="p-0 text-dark">
                    <BsFillPersonFill size={24} />
                  </Nav.Link>
                  : <Nav.Link as={NavLink} to={'/login'} className="p-0 text-dark">
                    <LuUserPlus size={24} />
                  </Nav.Link>
              }
            </div>
          </div>

          <div className="mobile-search-wrapper mb-2">
            <BsSearch className="search-icon" />
            <input type="text" className="form-control mobile-search-input" placeholder={t("common.search")} />
          </div>

          <div className="mobile-categories-scroll d-flex gap-2">
            <Nav.Link
              as={NavLink}
              to="/products"
              className="`btn mobile-cat-pill"
            >{t("nav.allCategories")}</Nav.Link>
            {categories.map((category) => (
              <Nav.Link
                key={category.id}
                as={NavLink} to={`/products?category=${category.id}`}
                className={`btn mobile-cat-pill`}
                onClick={() => { onCategoryChange(category.id) }}
              >{category.name}</Nav.Link>
            ))}
          </div>
        </div>
      </Container>

      {/* MOBILE OFFCANVAS MENU */}
      <Offcanvas show={showSidebar} onHide={handleClose} className="mobile-offcanvas">
        <div className="mobile-menu-header d-flex flex-column gap-3">
          <div className="d-flex justify-content-between gap-3">
            <BsPersonCircle className="mobile-avatar" />
            <button type="button" className="btn-close ms-auto" onClick={handleClose} aria-label={t("common.close")}></button>
          </div>
          <div className="mobile-auth-link">
            <NavLink to={"/login"} className="text-decoration-none text-dark fw-medium">{t("common.login")}</NavLink>
            <span className="mx-1">|</span>
            <NavLink to={"/register"} className="text-decoration-none text-dark fw-medium">{t("nav.signUp")}</NavLink>
          </div>
        </div>

        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            {canvasLinks.map((item, idx) => (
              <div key={idx}>
                {item.dividerBefore && <hr className="my-2" />}
                <Nav.Link as={NavLink} to={item.to} onClick={handleClose} className="mobile-menu-link d-flex align-items-center gap-2">
                  {item.icon} {item.name}
                </Nav.Link>
              </div>
            ))}

            <hr className="my-2" />

            <div className="mobile-bottom-links">
              <Nav.Link href="#agreement">{t("nav.userAgreement")}</Nav.Link>
              <Nav.Link href="#partnership">{t("nav.partnership")}</Nav.Link>
              <Nav.Link href="#privacy">{t("nav.privacyPolicy")}</Nav.Link>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* SHOPPING BAG DRAWER MODAL */}
      <div
        className={`cart-overlay-backdrop ${showCart ? 'active' : ''}`}
        onClick={handleCartClose}
      />

      <div className={`cart-modal-drawer ${showCart ? 'active' : ''} `}>
        <div className="cart-header">
          <h5 className="cart-title">{t("nav.yourShoppingBag")}</h5>
          <button className="cart-close-btn" onClick={handleCartClose} aria-label={t("common.close")}>
            <BsX size={28} />
          </button>
        </div>

        <div className="cart-body">

          {cart.map((item) => (
            <div className="cart-item-row" key={item.id}>
              <div className="cart-item-image-container">
                <img src={item.product.image} alt={item.title} className="cart-item-image" />
                <span className="cart-item-qty-badge">{item.quantity}</span>
              </div>

              <div className="cart-item-info">
                <div className="cart-item-title-price">
                  <span className="cart-item-title">{item.product.name}</span>
                  <span className="cart-item-price">{item.product.price * item.quantity} AED</span>
                </div>
                <div className="cart-item-subtext">{item.subtitle}</div>

                <div className="cart-item-actions">
                  <div className="cart-qty-selector">
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item, -1)} disabled={item.quantity <= 1}>-</button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item, 1)}>+</button>
                  </div>
                  <button className="cart-delete-icon-btn" onClick={() => { handleRemoveItem(item.id); console.log(item); }}>
                    <BsTrashFill size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="text-center py-5 text-muted">
              {t("nav.yourShoppingBagIsEmpty")}
            </div>
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-subtotal-container">
            <span className="cart-subtotal-title">{t("nav.subTotal")}</span>
            <span className="cart-subtotal-amount">{cartCount} AED</span>
          </div>
          <NavLink to={"/payment"}>
            <button className="cart-checkout-action-btn">
              {t("common.checkout")}
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
