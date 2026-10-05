import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ProfileApi } from "../../services/ProfileApi";
import Layout from "../../Layouts/ProfileLayout/Layout";
import Form from "react-bootstrap/Form";
import { Col, Row, Button } from "react-bootstrap";
import Link from "../../Components/ui/Link";

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        image: null,
    });

    const [originalProfile, setOriginalProfile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
        ProfileApi.GetProfileDataService()
            .then((data) => {
                const profile = data.data.user;

                const profileInfo = {
                    name: profile.name || "",
                    email: profile.email || "",
                    phone: profile.phone || "",
                    image: profile.image || "",
                };

                setProfileData({
                    ...profileInfo,
                    image: null,
                });

                setOriginalProfile(profileInfo);
                setPhoto(profileInfo.image);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleUpdateProfile = () => {
        if (!originalProfile) return;

        const changes = {};

        if (profileData.name !== originalProfile.name) {
            changes.name = profileData.name;
        }

        if (profileData.email !== originalProfile.email) {
            changes.email = profileData.email;
        }

        if (profileData.phone !== originalProfile.phone) {
            changes.phone = profileData.phone;
        }

        if (profileData.image) {
            changes.image = profileData.image;
        }

        if (Object.keys(changes).length === 0) {
            return;
        }

        setIsSaving(true);
        setError(null);

        ProfileApi.UpdateProfileService(changes)
            .then((data) => {
                const completeProfile = {
                    ...originalProfile,
                    ...changes,
                    image: data.data?.image || originalProfile.image,
                };

                setProfileData({
                    ...completeProfile,
                    image: null,
                });

                setOriginalProfile(completeProfile);
                setPhoto(completeProfile.image);

                const updatedUser = {
                    ...user,
                    data: {
                        ...user?.data,
                        ...completeProfile,
                    },
                };

                setUser(updatedUser);
                localStorage.setItem("userInfo", JSON.stringify(updatedUser));
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

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
            image: file,
        }));
    };

    const settingLinks = [
        { id: 1, href: "/profile/myProducts", value: "My Products" },
        { id: 2, href: "/profile/orders", value: "My Orders" },
        { id: 3, href: "/profile/favorite", value: "My Favorites" },
        { id: 4, href: "/profile/privacy-policy", value: "Privacy & Policy" },
        { id: 5, href: "/profile/contact-us", value: "Contact us page" },
        { id: 6, href: "/profile/term&condition", value: "Terms and condition" },
        { id: 7, href: "/profile/address", value: "Address" },
    ];

    return (
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
                                <p className="lh-sm mb-0">{profileData.name}</p>
                                <p className="lh-sm mt-0 text-secondary">
                                    {profileData.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Form className="d-flex flex-column">
                        <div className="d-flex flex-column flex-md-row gap-4">
                            <Form.Group className="mb-3 w-100" controlId="profileName">
                                <Form.Label>Full Name</Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="Your Full Name"
                                    className="bg-light"
                                    value={profileData.name}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-100" controlId="profileEmail">
                                <Form.Label>Email</Form.Label>

                                <Form.Control
                                    type="email"
                                    placeholder="Your Email"
                                    className="bg-light"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-100" controlId="profilePhone">
                                <Form.Label>Phone</Form.Label>

                                <Form.Control
                                    type="tel"
                                    placeholder="Your Number"
                                    className="bg-light"
                                    value={profileData.phone}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                />
                            </Form.Group>
                        </div>

                        {error && (
                            <p className="text-danger small text-end mb-0">{error}</p>
                        )}

                        <Button
                            type="button"
                            className="btn-cus w-auto align-self-end my-3 px-2"
                            onClick={handleUpdateProfile}
                            disabled={isSaving || !originalProfile}
                        >
                            {isSaving ? "Saving..." : "Save"}
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
    );
};

export default Profile;