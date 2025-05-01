import { useRef, useState } from "react"
import { Button } from "./button"
import { CrossIcon } from "./icons/CrossIcon"
import { InputComponent } from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface modalProps {
    open : boolean,
    onclick? : () => void
}
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const ModalComponent = ({open, onclick}: modalProps) => {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)
     async function addContent() {
          const title = titleRef.current.value;
          const link = linkRef.current.value;
         
        await  axios.post(`${BACKEND_URL}/api/v1/contents`, {
            title,
            link,
            type
          }, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
          })
    
      
    }
      return <div>
        {open && <div>
         <div className="w-screen h-screen bg-slate-200 opacity-60 fixed top-0 left-0 flex justify-center"> </div>
         <div className="w-screen h-screen bg-slate-200 opacity-60 fixed top-0 left-0 flex justify-center">
         <div className="flex flex-col justify-center">
             <span className="bg-white opacity-100 p-4 rounded gap-2">
                 <div className="flex justify-end">
                    <div onClick={onclick} className="cursor-pointer">
                    <CrossIcon size="lg"/>
                    </div>
                 </div>
                 <div className="flex flex-col">
                 <InputComponent reference={titleRef} placeholder="title"/>
                 <InputComponent reference={linkRef} placeholder="link"/>
                 </div>
                 <div className="flex p-4 justify-center gap-2 items-center">
                 <h2 className="flex justify-center items-center pt-1">Type</h2>
                <Button onclick={()=>setType(ContentType.Twitter)} text="Twitter" variant={type === ContentType.Twitter ? "secondary" : "primary"} size="sm"/>
                <Button onclick={()=>setType(ContentType.Youtube)} text="Youtube" variant={type === ContentType.Youtube ? "secondary" : "primary"} size="sm"/>
                 </div>
                 <div className="flex justify-center">
                    <Button onclick={addContent} size="md" text="Submit" variant="secondary" />
                 </div>
             </span>
         </div>
             </div>
            </div>}
      </div>
}