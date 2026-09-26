import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ThemeToggle from '../../../theme/ThemeToggle';
import { CategoriesApi } from "../../../services/CategoriesApi"
import { NavLink } from "react-router";

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

import logo from '../../../assets/logo/logo.png';
import { CartContext } from '../../../Contexts/CartContext';
import { CartApi } from '../../../services/CartApi';

const TopNavbar = ({ onCategoryChange }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);
  
  const [categories, setCategories] = useState([]);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);

  const [showAllCategories] = useState(false);
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);

  useEffect(() => {
    CategoriesApi.GetAllCatsService()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [setCategories]);

  const handleRemoveItem = (cardId)=>{
    CartApi.DeleteCartService(cardId)
    .then((data)=>{
      setCart(data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const updateQuantity = (id, change) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  // const removeItem = (id) => {
  //   setCart(prev => prev.filter(item => item.id !== id));
  // };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const links = [
    { name: "Profile", to: "/profile", icon: <BsFillPersonFill size={20} /> },
    { name: "Message", to: "/profile/term&condition", icon: <BsChatLeftTextFill size={18} /> },
    { name: "Orders", to: "/cart", icon: <BsFillHeartFill size={18} /> },
    { name: "My Cart", to: "/", icon: <BsFillCartFill size={18} />, action: handleCartShow }
  ];

  const canvasLinks = [
    { name: "Home", to: "/", icon: <BsHouseDoor /> },
    { name: "Categories", to: "/products", icon: <BsListUl /> },
    { name: "Favorites", to: "/", icon: <BsHeart /> },
    { name: "My Orders", to: "/cart", icon: <BsBoxSeam /> },
    { name: "English | USD", to: "/", icon: <BsGlobe />, dividerBefore: true },
    { name: "Contact Us", to: "/profile/contact-us", icon: <BsHeadset /> },
    { name: "About", to: "/", icon: <BsBuilding /> }
  ];

  return (
    <>
      <Container>
        <Navbar expand="lg" className="d-none p-0 d-lg-flex justify-content-between align-items-center gap-3">
          <div>
            <Navbar.Brand as={NavLink} to={'/'}>
              <img alt="Logo" src={logo} width="60" height="40" className="brand-logo d-inline-block align-top" />
            </Navbar.Brand>
          </div>
          <div className="desktop-search">
            <Form className="d-flex gap-3 align-items-center customem-nav-form">
              <Form.Control
                type="search"
                placeholder="Search"
                className="custom-nav-search"
                aria-label="Search"
              />
              <NavDropdown title="All Categories" id="basic-nav-dropdown" className="custom-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-success" className="custom-nav-button">
                Search
              </Button>
            </Form>
          </div>
          <div>
            <Nav className="me-auto my-lg-0 d-flex align-items-center gap-3">
              {links.map((link) => {
                const isCart = link.name === 'My Cart';
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
                <img alt="Logo" src={logo} width="70" height="50" className="brand-logo" />
              </Navbar.Brand>
            </div>
            <div className="d-flex align-items-center text-dark gap-2">
              <ThemeToggle />
              <Nav.Link onClick={handleCartShow} className="p-0 text-dark position-relative">
                <BsFillCartFill size={22} />
                {cart.length > 0 && (
                  <span className="cart-badge-mobile">{cart.length}</span>
                )}
              </Nav.Link>
              <Nav.Link as={NavLink} to={'/profile'} className="p-0 text-dark">
                <BsFillPersonFill size={24} />
              </Nav.Link>
            </div>
          </div>

          <div className="mobile-search-wrapper mb-2">
            <BsSearch className="search-icon" />
            <input type="text" className="form-control mobile-search-input" placeholder="Search" />
          </div>

          <div className="mobile-categories-scroll d-flex gap-2">
            {displayedCategories.map((category) => (
              <Nav.Link
                key={category.id}
                as={NavLink} to={"/products"}
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
            <button type="button" className="btn-close ms-auto" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="mobile-auth-link">
            <NavLink to={"/login"} className="text-decoration-none text-dark fw-medium">Login</NavLink>
            <span className="mx-1">|</span>
            <NavLink to={"/register"} className="text-decoration-none text-dark fw-medium">Sign Up</NavLink>
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
              <Nav.Link href="#agreement">User agreement</Nav.Link>
              <Nav.Link href="#partnership">Partnership</Nav.Link>
              <Nav.Link href="#privacy">Privacy policy</Nav.Link>
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
          <h5 className="cart-title">Your Shopping Bag</h5>
          <button className="cart-close-btn" onClick={handleCartClose} aria-label="Close">
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
                  <span className="cart-item-price">{item.product.price} AED</span>
                </div>
                <div className="cart-item-subtext">{item.subtitle}</div>

                <div className="cart-item-actions">
                  <div className="cart-qty-selector">
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="cart-delete-icon-btn" onClick={()=>{handleRemoveItem(item.id)}}>
                    <BsTrashFill size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="text-center py-5 text-muted">
              Your shopping bag is empty
            </div>
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-subtotal-container">
            <span className="cart-subtotal-title">SubTotal :</span>
            <span className="cart-subtotal-amount">{cartCount} AED</span>
          </div>
          <button className="cart-checkout-action-btn">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
