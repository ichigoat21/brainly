import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";



export const useContent = () => {
    const [content, setContent] = useState([]);

    useEffect(
        ()=> {
            axios.get(`${BACKEND_URL}/api/v1/contents`, {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            }).then((response)=>{
                setContent(response.data.content)
            })
        }, []
    )
    return content
}