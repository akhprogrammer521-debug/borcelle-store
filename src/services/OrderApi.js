import { API_Config } from "../Config/ApiConfig";

export const OrderApi = {
    GetOrdersService: ()=>{
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.ORDER.INDEX}`;

        return fetch(url, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        .then((res)=>{
            if(!res.ok){
                return res.json().then((serverError)=>{
                    throw new Error(serverError.message || "Failed to get orders")
                })
            }
            return res.json()
        })
    }
}