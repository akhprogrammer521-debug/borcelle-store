import { useEffect, useRef, useState } from "react";

import Layout from "../../Layouts/AuthLayout/Layout";

import logo from "../../assets/logo/Simplification.png";

import "./Auth.css";
import LoadingButton from "../../Components/ui/LoadingButton";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router";
const Verification = () => {

  const [code, setCode] = useState(["", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const phone = sessionStorage.getItem("verification_phone");
  const otp = code.join("");

  const [timeLeft, setTimeLeft] = useState(60);
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const [error, setError] = useState(null);

  const inputsRef = useRef([]);

  const navigateTo = useNavigate()

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleReset = () => {
    AuthService.ResendOtpService(phone)
      .then(() => {
        setTimeLeft(60);
        setCode(["", "", "", "", ""]);
      })
      .catch((err) => {
        setError(err.message);
      });

  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (!phone) {
      setError("Phone number not found. Return to login.");
      return;
    }

    if (otp.length !== 5) {
      setError("Enter the OTP completly");
      return;
    }

    setError(null);
    setIsVerifying(true);

    AuthService.VerificationService({ phone, otp })
      .then((data) => {
        console.log(data)
        localStorage.setItem("token", data.data.token)
        sessionStorage.removeItem("verification_phone");
        navigateTo("/");
      })
      .catch((err)=>{
        setError(err.message)
      })
      .finally(
        setIsVerifying(false)
      )
    };

    const handleChange = (value, index) => {
      const digit = value.replace(/\D/g, "").slice(-1);

      const newCode = [...code];
      newCode[index] = digit;
      setCode(newCode);

      // بعد كتابة رقم: انتقلي للحقل التالي
      if (digit && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        e.preventDefault();

        const newCode = [...code];

        // يحذف الرقم الموجود في الحقل الحالي
        if (code[index]) {
          newCode[index] = "";
          setCode(newCode);
        }

        // ثم يرجع للحقل السابق
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();

      const pastedCode = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 5);

      if (!pastedCode) return;

      const newCode = ["", "", "", "", ""];

      pastedCode.split("").forEach((digit, index) => {
        newCode[index] = digit;
      });

      setCode(newCode);

      const indexToFocus = Math.min(
        pastedCode.length,
        3
      );

      inputsRef.current[indexToFocus]?.focus();
    };


    return (
      <Layout
        leftContent={
          <>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-4">
              <img
                src={logo}
                alt="logo"
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
          </>
        }
        rightContent={
          <>
            <div className="w-100 auth-form-content">
              <div className="auth-heading">
                <h2 className="fw-semibold fs-4 mb-2">
                  Verification
                </h2>
                <p className="text-secondary mb-0 verification-subtitle">
                  Enter the code we send to : 0923423414
                </p>
              </div>
              <form onSubmit={handleVerify}>
                <div className="d-flex gap-3 gap-md-4 mt-4">
                  {code.map((value, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputsRef.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      placeholder="-"
                      autoComplete={
                        index === 0
                          ? "one-time-code"
                          : "off"
                      }
                      onChange={(e) =>
                        handleChange(
                          e.target.value,
                          index
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, index)
                      }
                      onPaste={handlePaste}
                      className="form-control text-center verification-input"
                    />
                  ))}
                </div>
                {
                  error && (
                    <p className="text-danger text-center mt-4 small mt-2 mb-0">
                      {error}
                    </p>
                  )}
                <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                  <span className="text-secondary">
                    Didn’t receive code ?
                  </span>
                  <span className="auth-pink">
                    {minutes}:{seconds}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn d-block mx-auto auth-pink mt-2 border-0 bg-transparent"
                  disabled={timeLeft > 0}
                  onClick={handleReset}
                >
                  Resend Code
                </button>
                <LoadingButton
                  type="submit"
                  className="btn auth-primary-btn w-100 mt-4"
                  isLoading={isVerifying}
                  loadingLabel="Verifying code"
                >
                  Verify
                </LoadingButton>
              </form>
              <div className="d-flex align-items-center gap-3 my-4">
                <div className="grow border-top" />
                <span className="text-secondary">
                  OR
                </span>
                <div className="grow border-top" />
              </div>
              <button
                type="button"
                className="btn auth-outline-btn w-100"
                onClick={() => window.history.back()}
              >
                Go back
              </button>
            </div>
          </>
        }
      />
    );
  };

  export default Verification;
