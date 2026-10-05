import { API_Config } from "../Config/ApiConfig";

export const OrderService = {
    GetOrdersApi: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ORDER.INDEX}`;

        return fetch(url, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to get orders")
                    })
                }
                return res.json()
            })
    },

    AddOrdersApi: (orderData) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ORDER.STORE}`;

        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(orderData)
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to add order")
                    })
                }
                return res.json()
            })
    },

    DeleteOrderApi: (orderId, comment) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ORDER.CANCEL}/${orderId}`;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                comment: comment
            })
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        console.log("Delete API error:", serverError);
                        throw new Error(
                            serverError.message ||
                            JSON.stringify(serverError.errors) ||
                            "Failed to delete order"
                        );
                    });
                }

                return res.json();
            })
    }
}