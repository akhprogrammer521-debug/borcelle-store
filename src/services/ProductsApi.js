import { API_Config } from "../Config/ApiConfig";

export const ProductsApi = {
    GetProductsService: (categoryId) => {
        const params = new URLSearchParams();

        if (categoryId) {
            params.append("category_id", categoryId)
        }
        const query = params.toString()
        const url = query
            ? `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.INDEX}?${query}`
            : `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.INDEX}`
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "No products")
                    })
                }
                return res.json()
            })
    },
    GetProductByIdService: (productId) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.SHOW}/${productId}`;
        return fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Product not found");
                    });
                }

                return res.json();
            });
    }
} 