import { Nav } from "react-bootstrap";
import { BsCaretRightFill } from "react-icons/bs";
import { NavLink } from "react-router";

const Link = ({ value , href}) => {
    return (
        <>
            <div className="bg-light p-3 rounded-3 ">
                <Nav.Link as={NavLink} to={href} className="d-flex align-align-items-center profile-links justify-content-between">
                    {value}
                    <BsCaretRightFill className="link-color" />
                </Nav.Link>

            </div>
        </>
    )
}

export default Link
