import Layout from "../../Layouts/ProfileLayout/Layout";
import Form from 'react-bootstrap/Form';
import MTN from '../../assets/logo/Ellipse 13.png'
import { Col, Row } from "react-bootstrap";
import Link from "../../Components/ui/Link";


const Profile = () => {
    const settingLinks = [
        { id: 1, href: '/cart', value: "Wishlist page" },
        { id: 2, href: '', value: "About us page" },
        { id: 3, href: '/profile/contact-us', value: "Contact us page" },
        { id: 4, href: '', value: "FAQ page" },
        { id: 5, href: '/profile/term&condition', value: "Terms and condition" },
        { id: 6, href: '', value: "Privacy Policy page" }
    ];
    return (
        <>
            <Layout
                bodyProfile={
                    <div className="p-3">
                        <div className="d-flex gap-2 align-items-center my-3">
                            <img src={MTN} alt="" />
                            <div className="person-info lh-1">
                                <p>Alexa</p>
                                <p className="text-secondary">alexa@gmail.com</p>
                            </div>
                        </div>
                        <Form className="d-flex gap-4">
                            <Form.Group className="mb-3 w-50" controlId="exampleForm.ControlInput1">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="email" placeholder="Your First Name"
                                    className="bg-light" />
                            </Form.Group>
                            <Form.Group className="mb-3 w-50" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control type="email" placeholder="Your Nick Name"
                                    className="bg-light" />
                            </Form.Group>
                        </Form>
                        <p className="fw-bold">Setting</p>
                        <Row className="g-3">
                            {settingLinks.map((item) => (
                                <Col lg={4} sm={6} key={item.id}>
                                    <Link href={item.href} value={item.value}/>
                                </Col>


                            ))}

                        </Row>
                    </div>
                }
            />

        </>
    )
}

export default Profile
