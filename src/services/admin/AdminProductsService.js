import { ADMIN_API_Config } from "../../Config/ApiConfig";

export const AdminProductsService = {
    GetProductsApi: (page = 1, perPage = 10) => {
        const params = new URLSearchParams({
            page,
            per_page: perPage,
        });

        const url =
            `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.PRODUCTS}?${params}`;

        return fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
        );
    },

    GetProductByIdApi: (id) => {
        const url =
            `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.PRODUCTS}/${id}`;

        return fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
        );
    },

    AddProductApi: ({ sku, category_id, price, ar, en, image }) => {
        const url =
            `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.PRODUCTS}`;

        const formData = new FormData();

        formData.append("sku", sku);
        formData.append("category_id", category_id);
        formData.append("price", price);
        formData.append("ar[name]", ar.name);
        formData.append("ar[description]", ar.description);
        formData.append("en[name]", en.name);
        formData.append("en[description]", en.description);
        formData.append("image", image);

        return fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
            body: formData,
        }).then((res) =>
            res.json().then((data) => {
                if (!res.ok) {
                    const error = new Error(
                        data.message || "تعذرت إضافة المنتج"
                    );

                    error.status = res.status;
                    error.errors = data.errors;
                    throw error;
                }

                return data;
            })
        );
    },

    UpdateProductApi: (id, changes) => {
        const url =
            `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.PRODUCTS}/${id}`;

        return fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
            body: JSON.stringify(changes),
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
        );
    },

    DeleteProductApi: (id) => {
        const url =
            `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.PRODUCTS}/${id}`;

        return fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
        );
    },
};