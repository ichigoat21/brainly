
import { BACKEND_URL } from "../config";
import axios from "axios";


export const handleShare = async () => {
  const res = await axios.post(`${BACKEND_URL}/api/v1/share`,{
    share : true
    }, {
    headers: {
    "Authorization" : localStorage.getItem("token")
    }
  });
  const hash = res.data.hash;
  return hash
  }