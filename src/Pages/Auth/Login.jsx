import { BsTelephone } from "react-icons/bs";
import { useState } from "react";

import Layout from "../../Layouts/AuthLayout/Layout";

import logo from "../../assets/logo/Simplification.png";

import "./Auth.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";
import LoadingButton from "../../Components/ui/LoadingButton";

const Login = ({ onLogin }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!onLogin) return;

        setIsLoggingIn(true);
        try {
            await onLogin();
        } finally {
            setIsLoggingIn(false);
        }
    };
    return (
        <Layout
            leftContent={
                <>
                    <div className="text-center d-flex flex-column align-items-center justify-content-center p-4">
                        <img
                            src={logo}
                            alt="logo"
                            className="img-fluid mb-3"
                            width={245}
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
                </>
            }
            rightContent={
                <>
                    <div className="w-100 auth-form-content">
                        <div className="auth-heading">
                            <h2 className="fw-semibold fs-4 mb-2">
                                Welcome!
                            </h2>
                            <p className="text-secondary mb-0">
                                Please Log in to continue
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-4 border-0"
                        >
                            <div className="position-relative">
                                <input
                                    type="tel"
                                    placeholder="Add number"
                                    className="form-control auth-phone-input pe-5"
                                />
                                <BsTelephone
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 auth-phone-icon"
                                />
                            </div>
                            <LoadingButton
                                type="submit"
                                className="btn auth-primary-btn w-100 mt-4"
                                isLoading={isLoggingIn}
                                loadingLabel="Logging in"
                            >
                                Log in
                            </LoadingButton>
                            <div className="text-center mt-3 custom-nav-link">
                                <Nav.Link as={NavLink} to={'/register'}>Sign up</Nav.Link>
                            </div>
                        </form>
                    </div>
                </>
            }
        />
    );
};

export default Login;
