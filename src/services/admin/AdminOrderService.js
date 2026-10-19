import { ADMIN_API_Config } from "../../Config/ApiConfig";

export const AdminOrderService = {
  GetOrdersApi: (page = 1, perPage = 10) => {
    const params = new URLSearchParams({ page, per_page: perPage });

    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.ORDERS}?${params}`;

    return fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }).then((res) =>
      {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
    );
  },

  GetOrderByIdApi: (id) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.ORDERS}/${id}`;

    return fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }).then((res) =>
      {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
    );
  },

  AddOrderApi: (orderData) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.ORDERS}`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(orderData),
    }).then((res) =>
      {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
    );
  },

  UpdateOrderApi: (id, changes) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.ORDERS}/${id}`;

    return fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(changes),
    }).then((res) =>
      {
            if (!res.ok) {
                return res.json().then((serverError) => {
                    throw new Error(serverError.message || "not found")
                })
            }


            return res.json()
        }
    );
  },

  DeleteOrderApi: (id) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.ORDERS}/${id}`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    }).then((res) =>
      {
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