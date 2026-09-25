import { API_Config } from "../Config/ApiConfig";

export const ContactUsApi = {
    ContactUsService: ({email, message}) => {
        const url = `${API_Config.BASE_URL}/${API_Config.ENDPOINTS.CONTACT_US.CONTACT}`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({type:"EMAIL", email, message})
        })
        .then((res)=>{
            if(!res.ok){
                return res.json().then((serverMessage)=>{
                    throw new Error(serverMessage.message || "Something went wrong")
                })
            }
            return res.json()
        })
    }
}