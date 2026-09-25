import { useRef, useState, useContext } from "react";
import { useNavigate, NavLink } from 'react-router';
import { Form, Nav } from "react-bootstrap";
import { AuthContext } from "../../Contexts/AuthContext"
import {
  BsPersonCircle,
  BsEnvelope,
  BsTelephone,
  BsCamera
} from "react-icons/bs";

import Layout from "../../Layouts/AuthLayout/Layout";
import logo from "../../assets/logo/Simplification.png";

import LoadingButton from "../../Components/ui/LoadingButton";
import { AuthService } from "../../services/AuthService";

import "./Auth.css";

const Signup = () => {
  const [photo, setPhoto] = useState(null);
  const [registerData, setRegiserData] = useState({
    image: "",
    name: "",
    email: "",
    phone: ""
  });

  const { setUser } = useContext(AuthContext)
  const [isSaving, setIsSaving] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const navigateTo = useNavigate()

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

  const handleRegisteration = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError(null);
    setIsSaving(true);

    AuthService.SignUpService(registerData)
      .then((data) => {
        setUser(data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        console.log(data);
        navigateTo("/login");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const leftContent = (
    <div className="text-center d-flex flex-column align-items-center justify-content-center p-4">
      <img
        src={logo}
        alt="Borcelle logo"
        className="auth-logo img-fluid mb-3"
      />

      <h1 className="auth-main-title mb-3">
        Let’s get started
      </h1>

      <p className="auth-description mb-0">
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
        noValidate
        validated={validated}
        onSubmit={handleRegisteration}
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
        <Form.Group className="mb-3" controlId="validationName">
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Name..."
              className="auth-profile-input pe-5"
              required
              value={registerData.name}
              onChange={(e) =>
                setRegiserData({
                  ...registerData,
                  name: e.target.value,
                })
              }
            />

            <BsPersonCircle className="position-absolute top-50 end-0 translate-middle-y me-5 auth-field-icon" />
          </div>

          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="validationFormik02">
          <div className="position-relative mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className="auth-profile-input pe-5"
              required
              value={registerData.email}
              onChange={(e) =>
                setRegiserData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />
            <BsEnvelope className="position-absolute top-50 end-0 translate-middle-y me-5 auth-field-icon" />
          </div>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        {/* Phone */}
        <Form.Group controlId="validationFormik03">
          <div className="position-relative mb-4">

            <Form.Control
              type="tel"
              placeholder="Add number"
              className="auth-profile-input pe-5"
              required
              pattern="^09[0-9]{8}$"
              value={registerData.phone}
              onChange={(e) =>
                setRegiserData({
                  ...registerData,
                  phone: e.target.value,
                })
              }
            />
            <BsTelephone className="position-absolute top-50 end-0 translate-middle-y me-5 auth-field-icon" />
          </div>
          <Form.Control.Feedback type="invalid">
            Enter a valid phone number: 09xxxxxxxx.
          </Form.Control.Feedback>
        </Form.Group>
        <div>
          {error && (
            <div className="alert alert-warning">
              {error}
            </div>
          )}
        </div>

        <LoadingButton
          type="submit"
          className="auth-primary-btn w-100 border-0"
          isLoading={isSaving}
          loadingLabel="Saving account details"
        >
          Save
        </LoadingButton>
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
