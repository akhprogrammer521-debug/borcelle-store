import { ADMIN_API_Config } from "../../Config/ApiConfig";

export const AdminAuthService = {
  LoginApi: ({ email, password }) => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.AUTH.LOGIN}`;

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      
        if (!res.ok) {
          return res.json().then((serverError) => {
            throw new Error(serverError.message || "not found")
          })
        }


        return res.json()
      });
  },

  LogoutApi: () => {
    const url =
      `${ADMIN_API_Config.BASE_URL}/${ADMIN_API_Config.ENDPOINTS.AUTH.LOGOUT}`;

    return fetch(url, {
      method: "POST",
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
    });
  },
};