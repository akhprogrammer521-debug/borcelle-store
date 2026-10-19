import { ADMIN_API_Config } from "../../Config/ApiConfig";

export const AdminCategoriesService = {
  GetCategoriesApi: (page = 1, perPage = 10) => {
    const params = new URLSearchParams({ page, per_page: perPage });

    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.CATEGORIES}?${params}`;

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

  GetCategoryByIdApi: (id) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.CATEGORIES}/${id}`;

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

  AddCategoryApi: (categoryData) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.CATEGORIES}`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(categoryData),
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

  UpdateCategoryApi: (id, changes) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.CATEGORIES}/${id}`;

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

  DeleteCategoryApi: (id) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.CATEGORIES}/${id}`;

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