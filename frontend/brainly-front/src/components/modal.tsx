import { useRef, useState } from "react"
import { Button } from "./button"
import { CrossIcon } from "./icons/CrossIcon"
import { InputComponent } from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { configDotenv } from "dotenv"
import { on } from "events"

interface modalProps {
    open : boolean,
    onclick? : () => void
}
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const ModalComponent = ({open, onclick}: modalProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)

     async function addContent() {
          const title = titleRef.current?.value;
          const link = linkRef.current?.value;
          

         
        await  axios.post(`${BACKEND_URL}/api/v1/content/add`, {
            title,
            link,
            type
          }, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
           
          })
          onclick()
    }
      return <div>
        {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Background */}
    <div className="absolute inset-0 bg-slate-200 opacity-60"></div>

    {/* Modal content */}
    <div className="relative bg-white p-4 rounded shadow-lg z-10">
      <div className="flex justify-end">
        <div onClick={onclick} className="cursor-pointer">
          <CrossIcon size="lg" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <InputComponent reference={titleRef} placeholder="title" />
        <InputComponent reference={linkRef} placeholder="link" />
      </div>
      <div className="flex p-4 justify-center gap-2 items-center">
        <h2 className="pt-1">Type</h2>
        <Button
          onclick={() => setType(ContentType.Twitter)}
          text="Twitter"
          variant={type === ContentType.Twitter ? "secondary" : "primary"}
          size="sm"
        />
        <Button
          onclick={() => setType(ContentType.Youtube)}
          text="Youtube"
          variant={type === ContentType.Youtube ? "secondary" : "primary"}
          size="sm"
        />
      </div>
      <div className="flex justify-center">
        <Button onclick={addContent} size="md" text="Submit" variant="secondary" />
      </div>
    </div>
  </div>
)}

      </div>
}