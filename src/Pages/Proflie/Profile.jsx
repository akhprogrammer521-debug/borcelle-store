import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ProfileApi } from "../../services/ProfileApi";
import Layout from "../../Layouts/ProfileLayout/Layout";
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from "react-bootstrap";
import Link from "../../Components/ui/Link";

const Profile = () => {

    const { user, setUser } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        image: null
    });

    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        ProfileApi.GetProfileDataService()
            .then((data) => {
                const profile = data.data;
                setProfileData({
                    name: profile.name || "",
                    email: profile.email || "",
                    phone: profile.phone || "",
                    image: null
                });
                setPhoto(profile.image);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const handleUpdateProfile = () => {

        setIsSaving(true);
        setError(null);

        ProfileApi.UpdateProfileService(profileData)
            .then((data) => {
                console.log(data);
                setUser(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsSaving(false);
            })
    }

    const settingLinks = [
        { id: 1, href: '/cart', value: "Wishlist page" },
        { id: 2, href: '', value: "About us page" },
        { id: 3, href: '/profile/contact-us', value: "Contact us page" },
        { id: 4, href: '', value: "FAQ page" },
        { id: 5, href: '/profile/term&condition', value: "Terms and condition" },
        { id: 6, href: '', value: "Privacy Policy page" }
    ];


    const fileInputRef = useRef(null);
    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setPhoto(imageUrl);
        setProfileData((prev) => ({
            ...prev,
            image: file
        }));
    }

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
                                        src={user.data.photo}
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
                                    <p className="lh-sm mb-0">{user.data.name}</p>
                                    <p className="lh-sm mt-0 text-secondary">{user.data.email}</p>
                                </div>
                            </div>
                        </div>

                        <Form className="d-flex flex-column">
                            <div className="d-flex flex-column flex-md-row gap-4">
                                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Full Name"
                                        className="bg-light"
                                        value={user.data.name || ""}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                name: e.target.value
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Your Email"
                                        className="bg-light"
                                        value={user.data.email || ""}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                email: e.target.value
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Your Number"
                                        className="bg-light"
                                        value={user.data.phone || ""}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                phone: e.target.value
                                            })
                                        } />
                                </Form.Group>
                            </div>
                            <Button
                                className="btn-cus w-auto align-self-end my-3 px-2"
                                onClick={handleUpdateProfile}
                                disabled={isSaving}
                            >
                                {
                                    isSaving
                                        ?
                                        "Saving..."
                                        :
                                        "Save"
                                }
                            </Button>
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
