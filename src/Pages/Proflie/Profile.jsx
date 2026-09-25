import Layout from "../../Layouts/ProfileLayout/Layout";
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";
import Link from "../../Components/ui/Link";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Button from "../../Components/ui/Button"
import { FiEdit } from "react-icons/fi";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const settingLinks = [
        { id: 1, href: '/cart', value: "Wishlist page" },
        { id: 2, href: '', value: "About us page" },
        { id: 3, href: '/profile/contact-us', value: "Contact us page" },
        { id: 4, href: '', value: "FAQ page" },
        { id: 5, href: '/profile/term&condition', value: "Terms and condition" },
        { id: 6, href: '', value: "Privacy Policy page" }
    ];

    const [photo, setPhoto] = useState(null);

    const fileInputRef = useRef(null);
    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setPhoto(imageUrl);
    };
    return (
        <>
            <Layout
                bodyProfile={
                    <div className="p-3">
                        <div className="d-flex gap-2 justify-content-between align-items-center my-3">
                            <div className="d-flex gap-2 justify-content-between align-items-center my-3">
                                <button
                                    type="button"
                                    className="border-0 bg-white p-0 position-relative"
                                    onClick={handlePhotoClick}
                                    aria-label="Change profile photo"
                                >
                                    <img
                                        src={photo || user?.data?.image}
                                        alt="Profile"
                                        className="user_image"
                                    />
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={handlePhotoChange}
                                />

                                <div className="person-info">
                                    <p className="lh-sm mb-0">{user?.data?.name}</p>
                                    <p className="lh-sm mt-0 text-secondary">{user?.data?.email}</p>
                                </div>
                            </div>

                            <button className="">
                                <FiEdit /> Edit
                            </button>
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
                                    <Link href={item.href} value={item.value} />
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
