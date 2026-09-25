import { API_Config } from "../Config/ApiConfig";

export const CategoriesApi = {
    GetAllCatsService: ()=>{
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.CATS.INDEX}`
        return fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },

        })
        .then((res)=>{
            if(!res.ok){
                return res.json().then((serviceError)=>{
                    throw new Error(serviceError.message || "No Categories to display")
                })
            }
            return res.json()
        })
    }
};