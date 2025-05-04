import axios from "axios"
import { BACKEND_URL } from "../config"



export function refresh (route : string, setContent: React.Dispatch<React.SetStateAction<any>>) {
    axios.get(`${BACKEND_URL}/api/v1/${route}`, {
        headers : {
            "Authorization" : localStorage.getItem("token")
        }
    }).then((response)=>{
        setContent(response.data.content)
    })
}