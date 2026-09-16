import { Container, Offcanvas } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const PrimaryNavbar = () => {
    return (
        <Navbar expand="lg" className="d-none p-0 d-lg-block">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex justify-content-between w-100">
                        <div className="d-flex">
                            <Offcanvas className="mobile-offcanvas"></Offcanvas>
                            <Nav.Link href="#home" className="custom-nav-links">All category</Nav.Link>
                            <Nav.Link href="#link" className="custom-nav-links">Hot offers</Nav.Link>
                            <Nav.Link href="#link" className="custom-nav-links">Gift boxes</Nav.Link>
                            <Nav.Link href="#link" className="custom-nav-links">About Us</Nav.Link>
                            <NavDropdown title="Help" id="basic-nav-dropdown" className="custom-nav-links">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
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