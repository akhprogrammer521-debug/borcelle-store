import { BsTelephone } from "react-icons/bs";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { AuthService } from "../../services/AuthService";
import Layout from "../../Layouts/AuthLayout/Layout";

import logo from "../../assets/logo/Simplification.png";

import "./Auth.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";
import LoadingButton from "../../Components/ui/LoadingButton";

const Login = () => {

    // const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [phone, setPhone] = useState('');
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext)
    const navigateTo = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg(null)
        setLoading(true)
        const phoneRegex = /^09\d{8}$/;

        if (!phoneRegex.test(phone)) {
            setErrorMsg("The phone number must be 10 digits. Please enter a valid phone number, for example: 09xxxxxxxx");
            return;
        }

        console.log("Submitting form")
        AuthService.LoginService(phone)
            .then((data) => {
                console.log(data)
                sessionStorage.setItem("verification_phone", phone);
                setUser(data)
                localStorage.setItem("userInfo", JSON.stringify(data))
                navigateTo('/verification')
            })
            .catch((err) => {
                console.log(err)
                setErrorMsg(err.message)
            })
            .finally(() => {
                // setIsLoggingIn(false)
                setLoading(false)
            })
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
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <BsTelephone
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 auth-phone-icon"
                                />
                            </div>
                            {errorMsg && (
                                <p className="text-danger small mt-2 mb-0">
                                    {errorMsg}
                                </p>
                            )}
                            <LoadingButton
                                type="submit"
                                className="btn auth-primary-btn w-100 mt-4"
                                isLoading={loading}
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
