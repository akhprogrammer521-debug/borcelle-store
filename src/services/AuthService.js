import { API_Config } from "../Config/ApiConfig";
export const AuthService = {
    SignUpService: ({ name, email, phone, image }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.AUTH.REGISTER}`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    image,
                    name,
                    email,
                    phone
                }
            )
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(
                            serverError.message || "Something went wrong!"
                        );
                    });
                }

                return res.json();
            })

    },
    LoginService: (phoneParam) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.AUTH.LOGIN}`;
        console.log("=========== url ==========");
        console.log(url);
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: phoneParam
            }),

        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    // console.log(serverError)
                    throw new Error(serverError.message || "هنالك خطأ في تسجيل الدخول");
                });
            }
            return res.json();
        });
    },
    VerificationService: ({ phone, otp }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.AUTH.VERIFY}`
        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone,
                otp
            }),
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    // console.log(serverError)
                    throw new Error(serverError.message || "هنالك خطأ في تسجيل الدخول");
                });
            }
            return res.json();
        });
    },
    ResendOtpService: (phoneParam) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.AUTH.RESEND}`
        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone: phoneParam })
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    // console.log(serverError)
                    throw new Error(serverError.message || "Could not resend OTP.");
                });
            }
            return res.json();
        });
    },
    LogOutService: () => { },
};
