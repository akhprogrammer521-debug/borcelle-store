import { Container, Offcanvas } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router";

const PrimaryNavbar = () => {
    return (
        <Navbar expand="lg" className="d-none p-0 d-lg-block">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex justify-content-between w-100">
                        <div className="d-flex">
                            <Offcanvas className="mobile-offcanvas"></Offcanvas>
                            <Nav.Link as={NavLink} to={"/products"} className="custom-nav-link">All category</Nav.Link>
                            <Nav.Link as={NavLink} to={"/products"} className="custom-nav-link">electronics</Nav.Link>
                            <Nav.Link as={NavLink} to={"/products"} className="custom-nav-link">MacBook</Nav.Link>
                            <Nav.Link as={NavLink} to={"/products"} className="custom-nav-link">TV</Nav.Link>
                            <Nav.Link as={NavLink} to={"/products"} className="custom-nav-link">Headphones</Nav.Link>
                        </div>
                        <div>
                            <NavDropdown title="English, USD" id="basic-nav-dropdown" className="custom-nav-drop">
                                <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">USD</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default PrimaryNavbar;