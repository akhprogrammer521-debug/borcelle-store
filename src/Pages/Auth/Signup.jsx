import { useRef, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import {
  BsPersonCircle,
  BsEnvelope,
  BsTelephone,
  BsCamera
} from "react-icons/bs";

import Layout from "../../Layouts/AuthLayout/Layout";
import logo from "../../assets/logo/Simplification.png";

import "./Auth.css";
import { NavLink } from "react-router";

const Signup = () => {
  const [photo, setPhoto] = useState(null);

  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPhoto(imageUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add API logic here
  };

  const leftContent = (
    <div className="text-center d-flex flex-column align-items-center justify-content-center p-4">
      <img
        src={logo}
        alt="Borcelle logo"
        className="auth-logo img-fluid mb-3"
      />

      <h1 className="text-white auth-main-title mb-3">
        Let’s get started
      </h1>

      <p className="text-white auth-description mb-0">
        Where opportunities meet simplicity!
        <br />
        Whether you’re here to fill out your cart
        <br />
        or to check irresistible offers.
      </p>
    </div>
  );

  const rightContent = (
    <div className="w-100 auth-form-content">
      <div className="auth-heading">
        <h2 className="fw-semibold fs-4 mb-3">
          Fill your information
        </h2>

        <p className="text-secondary mb-0">
          Enter your details
        </p>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="mt-4 border-0"
      >
        {/* Photo */}
        <div className="d-flex justify-content-center mb-4">
          <div
            className="profile-photo-box d-flex flex-column align-items-center justify-content-center text-center"
            onClick={handlePhotoClick}
            role="button"
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile preview"
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <>
                <BsCamera className="profile-photo-icon mb-2" />

                <span className="fs-5 text-secondary">
                  Add photo
                </span>
              </>
            )}
          </div>

          <Form.Control
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="d-none"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Name */}
        <div className="position-relative mb-3">
          <Form.Control
            type="text"
            placeholder="Name..."
            className="auth-profile-input pe-5"
          />

          <BsPersonCircle className="position-absolute top-50 end-0 translate-middle-y me-4 auth-field-icon" />
        </div>

        {/* Email */}
        <div className="position-relative mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            className="auth-profile-input pe-5"
          />

          <BsEnvelope className="position-absolute top-50 end-0 translate-middle-y me-4 auth-field-icon" />
        </div>

        {/* Phone */}
        <div className="position-relative mb-4">
          <Form.Control
            type="tel"
            placeholder="Add number"
            className="auth-profile-input pe-5"
          />

          <BsTelephone className="position-absolute top-50 end-0 translate-middle-y me-4 auth-field-icon" />
        </div>

        <Button
          type="submit"
          className="auth-primary-btn w-100 border-0"
        >
          Save
        </Button>
      </Form>
      <div className="text-center mt-3 custom-nav-link">
            <Nav.Link as={NavLink} to={'/login'}>Login</Nav.Link>
      </div>
    </div>
  );

  return (
    <Layout
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};

export default Signup;