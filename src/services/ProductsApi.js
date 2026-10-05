import { API_Config } from "../Config/ApiConfig";

export const ProductsApi = {
    GetProductsService: (categoryId, page = 1) => {
        const params = new URLSearchParams();

        if (categoryId) {
            params.append("category_id", categoryId);
        }

        params.append("page", page);

        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.INDEX}?${params}`;

        return fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "No products");
                });
            }

            return res.json();
        });
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
    },

    AddProductService: ({ name, description, price, category_id, image }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.STORE}`;
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category_id", category_id);
        if (image) {
            formData.append("image", image);
        }

        console.log([...formData.entries()]);

        return fetch(url, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to add product");
                    });
                }

                return res.json();
            });
    },

    UpdateProductService: ({ id, name, description, price, category_id, image }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.UPDATE}/${id}`;
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category_id", category_id);
        formData.append("_method", "PUT");

        if (image instanceof File) {
            formData.append("image", image);
        }

        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to update product");
                    });
                }

                return res.json();
            })
    },

    GetMyProductsService: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.MY_PRODUCTS}?mine=1`;
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to fetch my products");
                    });
                }

                return res.json();
            });
    },

    DeleteProductService: (id) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.PRODUCTS.MY_PRODUCTS}/${id}`;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => {
                        throw new Error(serverError.message || "Failed to fetch my products");
                    });
                }

                return res.json();
            });
    },
}
