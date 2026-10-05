import { API_Config } from "../Config/ApiConfig";

export const SettingService = {
    GEtTermsCondsApi: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.SETTINGS.TERMS_CONDS}`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to fetch terms and conditions")
                    })
                }
                return res.json()
            })
    },

    GetPrivacyPolicyApi: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.SETTINGS.PRIVACY_POLICY}`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to fetch terms and conditions")
                    })
                }
                return res.json()
            })
    }
}