import { Container, Nav, Row } from "react-bootstrap";
import TopNavbar from "../../Components/layouts/Header/TopNavbar";
import { NavLink } from "react-router";

const Layout = ({ headerProfile , bodyProfile}) => {
    return (
        <>
            <TopNavbar />
            <div className="bg-light p-5 bg-vh">
                <Container>
                    <Row className="rounded-3">
                        <div className="header-profile rounded-3 p-4 text-white">
                            <Nav.Link as={NavLink} to={'/profile'}>{headerProfile}</Nav.Link>
                        </div>
                        <div className="bg-white rounded-top-0 rounded-3">
                            {bodyProfile}
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Layout
