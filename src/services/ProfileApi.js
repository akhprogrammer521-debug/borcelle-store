import { API_Config } from "../Config/ApiConfig";

export const ProfileApi = {
    GetProfileDataService: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PROFILE.INDEX}`;

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
                        throw new Error(serverError.message || "Failed to fetch profile data")
                    })
                }
                return res.json()
            })
    },

    UpdateProfileService: (profileData) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PROFILE.UPDATE}`;
        const formData = new FormData();


        formData.append("name", profileData.name);
        formData.append("email", profileData.email);
        formData.append("phone", profileData.phone);
        if (profileData.image) {
            formData.append("image", profileData.image);
        }

        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: formData 
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to update profile data")
                    })
                }
                return res.json()
            })
    }
}