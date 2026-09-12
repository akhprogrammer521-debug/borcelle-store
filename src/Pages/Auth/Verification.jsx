import { useRef, useState } from "react";

import Layout from "../../Layouts/AuthLayout/Layout";

import logo from "../../assets/logo/Simplification.png";

import "./Auth.css";

const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);

  const inputsRef = useRef([]);


  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "");

    const newCode = [...code];

    newCode[index] = digit.slice(-1);

    setCode(newCode);

    if (digit && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };


  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < code.length - 1
    ) {
      inputsRef.current[index + 1]?.focus();
    }
  };


  const handlePaste = (event) => {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedCode) return;

    const newCode = ["", "", "", ""];

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


  const handleVerify = () => {
    const finalCode = code.join("");

    if (finalCode.length !== 4) return;

    console.log(finalCode);
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
                Verification
              </h2>
              <p className="text-secondary mb-0 verification-subtitle">
                Enter the code we send to : 0923423414
              </p>
            </div>
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
                  onChange={(event) =>
                    handleChange(
                      event.target.value,
                      index
                    )
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(event, index)
                  }
                  onPaste={handlePaste}
                  className="form-control text-center verification-input"
                />
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
              <span className="text-secondary">
                Didn’t receive code ?
              </span>
              <span className="auth-pink">
                00:55
              </span>
            </div>
            <button
              type="button"
              className="btn d-block mx-auto auth-pink mt-2 border-0 bg-transparent"
            >
              Resend Code
            </button>
            <button
              type="button"
              className="btn auth-primary-btn w-100 mt-4"
              onClick={handleVerify}
            >
              Verify
            </button>
            <div className="d-flex align-items-center gap-3 my-4">
              <div className="flex-grow-1 border-top" />
              <span className="text-secondary">
                OR
              </span>
              <div className="flex-grow-1 border-top" />
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