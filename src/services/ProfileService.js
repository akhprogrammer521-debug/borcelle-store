import { API_Config } from "../Config/ApiConfig";

export const ProfileService = {
    GetProfileDataApi: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PROFILE.INDEX}`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(
                        serverError.message || "Failed to fetch profile data"
                    );
                });
            }

            return res.json();
        });
    },

    UpdateProfileApi: (changes) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PROFILE.UPDATE}`;
        const formData = new FormData();

        if (changes.name !== undefined) {
            formData.append("name", changes.name);
        }

        if (changes.email !== undefined) {
            formData.append("email", changes.email);
        }

        if (changes.phone !== undefined) {
            formData.append("phone", changes.phone);
        }

        if (changes.image) {
            formData.append("image", changes.image);
        }

        return fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "Failed to update profile data");
                });
            }

            return res.json();
        });
    },

    GetAddressApi: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ADDRESS.INDEX}`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "Failed to fetch address data");
                });
            }

            return res.json();
        });
    },

    AddAddressApi: ({ name, phone, city, neighborhood, street, building, zip_code, lat, lng, is_default }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ADDRESS.STORE}`;
        const formData = new FormData();

        formData.append("name", name);
        formData.append("city", city);
        formData.append("phone", phone);
        formData.append("neighborhood", neighborhood);
        formData.append("street", street);
        formData.append("building", building);
        formData.append("zip_code", zip_code);
        formData.append("lat", lat);
        formData.append("lng", lng);
        formData.append("is_default", is_default ? "1" : "0");

        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "Failed to add address data");
                });
            }

            return res.json();
        });
    },

    UpdateAddressApi: ({ id, name, phone, city, neighborhood, street, building, zip_code, lat, lng, is_default }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ADDRESS.UPDATE}/${id}`;
        const formData = new FormData();

        formData.append("name", name);
        formData.append("city", city);
        formData.append("phone", phone);
        formData.append("neighborhood", neighborhood);
        formData.append("street", street);
        formData.append("building", building);
        formData.append("zip_code", zip_code);
        formData.append("lat", lat);
        formData.append("lng", lng);
        formData.append("is_default", is_default ? "1" : "0");

        return fetch(url, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "Failed to update address data");
                });
            }

            return res.json();
        });
    },

    DeleteAddressApi: (id) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ADDRESS.DELETE}/${id}`;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "Failed to delete address data");
                });
            }

            return res.json();
        });
    }
};