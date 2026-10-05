import { useState } from "react";
import { useNavigate, NavLink } from 'react-router';
import { Form, Nav } from "react-bootstrap";
// import { AuthContext } from "../../Contexts/AuthContext";
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
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState(null);
  const [registerData, setRegiserData] = useState({
    image: "",
    name: "",
    email: "",
    phone: ""
  });

  // const { setUser } = useContext(AuthContext)
  const [isSaving, setIsSaving] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const navigateTo = useNavigate()

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
    setRegiserData((data) => ({
      ...data,
      image: file
    }))
  };

  const handleRegisteration = (e) => {
    e.preventDefault();
    console.log(e)
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
        // setUser(data)
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
        alt={t("auth.borcelleLogo")}
        className="auth-logo img-fluid mb-3"
      />

      <h1 className="auth-main-title mb-3">
        {t("auth.letsGetStarted")}
      </h1>

      <p className="auth-description mb-0">
        {t("auth.whereOpportunitiesMeetSimplicity")}
        <br />
        {t("auth.whetherYoureHereToFillOutYour")}
        <br />
        {t("auth.orToCheckIrresistibleOffers")}
      </p>
    </div>
  );

  const rightContent = (
    <div className="w-100 auth-form-content">
      <div className="auth-heading">
        <h2 className="fw-semibold fs-4 mb-3">
          {t("auth.fillYourInformation")}
        </h2>

        <p className="text-secondary mb-0">
          {t("auth.enterYourDetails")}
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
          <label
            htmlFor="profile-photo"
            className="profile-photo-box d-flex flex-column align-items-center justify-content-center text-center"
          >
            {photo ? (
              <img
                src={photo}
                alt={t("auth.profilePreview")}
                className="w-100 h-100 object-fit-cover"
              />
            ) : (
              <>
                <BsCamera className="profile-photo-icon mb-2" />
                <span className="fs-5 text-secondary">{t("auth.addPhoto")}</span>
              </>
            )}
          </label>

          <input
            id="profile-photo"
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
              placeholder={t("auth.name")}
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
            {t("validation.pleaseEnterYourName")}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="validationFormik02">
          <div className="position-relative mb-3">
            <Form.Control
              type="email"
              placeholder={t("common.email")}
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
            {t("validation.pleaseEnterAValidEmail")}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Phone */}
        <Form.Group controlId="validationFormik03">
          <div className="position-relative mb-4">

            <Form.Control
              type="tel"
              placeholder={t("auth.addNumber")}
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
            {t("validation.enterAValidPhoneNumber09xxxxxxxx")}
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
          loadingLabel={t("auth.savingAccountDetails")}
        >
          {t("common.save")}
        </LoadingButton>
      </Form>
      <div className="text-center mt-3 custom-nav-link">
        <Nav.Link as={NavLink} to={'/login'}>{t("common.login")}</Nav.Link>
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
