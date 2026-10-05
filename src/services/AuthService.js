import { API_Config } from "../Config/ApiConfig";
export const AuthService = {
    SignUpApi: ({ name, email, phone, image }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.AUTH.REGISTER}`;
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);

        if (image) {
            formData.append("image", image);
        }
        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: formData
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
    LoginApi: (phoneParam) => {
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
                    throw new Error(serverError.message || "هنالك خطأ في تسجيل الدخول");
                });
            }
            return res.json();
        });
    },
    VerificationApi: ({ phone, otp }) => {
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
                    throw new Error(serverError.message || "هنالك خطأ في تسجيل الدخول");
                });
            }
            return res.json();
        });
    },
    ResendOtpApi: (phoneParam) => {
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
                    throw new Error(serverError.message || "Could not resend OTP.");
                });
            }
            return res.json();
        });
    },
    LogOutService: () => { },
};
