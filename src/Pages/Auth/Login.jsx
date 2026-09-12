import { BsTelephone } from "react-icons/bs";

import Layout from "../../Layouts/AuthLayout/Layout";

import logo from "../../assets/logo/Simplification.png";

import "./Auth.css";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
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
                            <button
                                type="submit"
                                className="btn auth-primary-btn w-100 mt-4"
                            >
                                Log in
                            </button>
                        </form>
                    </div>
                </>
            }
        />
    );
};

export default Login;