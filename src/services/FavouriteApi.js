import { API_Config } from "../Config/ApiConfig";

export const FavApi = {
    GetFavouriteService: () => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.FAVOURITE.INDEX}`;

        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((serverError)=>{
                    throw new Error(serverError.message || "Failed to get favourites")
                })
            }

            return res.json();
        });
    },

    AddFavouriteService: ({ productId }) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.FAVOURITE.STORE}`
        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                product_id: productId
            })
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((ServerError) => {
                        throw new Error(ServerError.message || "failed for adding a product to Favourite")
                    })
                }
                return res.json()
            })
    },

    RemoveFavouriteService: (productId) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.FAVOURITE.DELETE}/${productId}`;

        return fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(async (res) => {
            const responseText = await res.text();

            console.log("Delete status:", res.status);
            console.log("Delete response:", responseText);

            if (!res.ok) {
                throw new Error(responseText || "Failed to remove favourite");
            }

            return responseText ? JSON.parse(responseText) : null;
        });
    },
}