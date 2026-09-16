import { Nav } from "react-bootstrap";

const FooterItems = ({footerItems , location}) => {
    return (
        <>
            <Nav.Link href={location} className="custom-nav-link list-unstyled list-group-item">
                {footerItems}
            </Nav.Link>
        </>
    )
}

export default FooterItems
