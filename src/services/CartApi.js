import { API_Config } from "../Config/ApiConfig";

export const CartApi = {
    GetCartService: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.CART.INDEX}`;
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((ServerMessage) => {
                        throw new Error(ServerMessage || "Failed to fetch carts")
                    })
                }
                return res.json()
            })
    },

    AddCartService: ({ productId, quantity }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.CART.STORE}`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                product_id: String(productId),
                quantity
            })
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((ServerMessage) => {
                        throw new Error(ServerMessage || "Failed to add cart")
                    })
                }
                return res.json()
            })
    },

    DeleteCartService: ()=>{}
}