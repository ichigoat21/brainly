import { useRef } from "react";
import { Button } from "../components/button";
import { InputComponent } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navigate, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()

 async function signup (){
           if (!usernameRef.current || !passwordRef.current) return;
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                    username,
                    password
            })
            navigate("/signin")
  }
  return (
    <div className="h-screen w-screen bg-[#f8fafc] flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl px-8 py-10 w-full max-w-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create an Account
        </h2>
        <div className="flex flex-col gap-4">
          <InputComponent reference={usernameRef}  placeholder="Username" />
          <InputComponent  reference={passwordRef} placeholder="Password" />
          <div className="flex justify-center">
            <Button onclick={signup} text="Submit" variant="secondary" size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};
