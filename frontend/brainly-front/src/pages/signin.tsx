import { useRef } from "react";
import { Button } from "../components/button";
import { InputComponent } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function signin (){
         if (!usernameRef.current || !passwordRef.current) return;
          const username = usernameRef.current.value;
          const password = passwordRef.current.value;
          const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                  username,
                  password
          })
          const jwt = response.data.token;
          localStorage.setItem("token", jwt)
          navigate("/dashboard")
          ;
}   return (
  <div className="h-screen w-screen bg-[#f8fafc] flex justify-center items-center">
    <div className="bg-white rounded-xl shadow-xl px-8 py-10 w-full max-w-sm border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Log into your Account
      </h2>
      <div className="flex flex-col gap-4">
        <InputComponent reference={usernameRef} placeholder="Username" />
        <InputComponent reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center">
          <Button text="Submit" variant="secondary" size="md" onclick={signin} />
        </div>
        <div className="flex justify-center">
        <h6>Dont have an account? <h6 onClick={()=>{navigate("/signup")}}className="cursor-pointer underline font-blue-700">Sign Up</h6></h6>
        </div>
      </div>
    </div>
  </div>
)
};
