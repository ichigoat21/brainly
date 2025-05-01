import { useState } from "react"
import { Button } from "../components/button"
import { CardComponent } from "../components/card"
import { PlusIcon } from "../components/icons/PlusIcon"
import { ShareIcon } from "../components/icons/ShareIcon"
import { ModalComponent } from "../components/modal"
import { SideBarComponent } from "../components/sidebar"
import { useContent } from "../hooks/useContent"

export const Dashboard = () => {
  const [modalOpen, setModelOpen] = useState(false);
  const content = useContent()
  return <div>
   <SideBarComponent/>
   <div className="p-4 ml-72 bg-[#f8fafc] min-h-screen">
    <ModalComponent open = {modalOpen} onclick={()=>{
      setModelOpen(false)
    }}/>
    <div className="flex justify-end pt-5 gap-2">
    <Button startIcon={<ShareIcon size="lg"/>} size="lg" variant="primary" text="Share"/>
    <Button onclick={()=>{setModelOpen(true)}} endIcon={<PlusIcon size="lg"/>} size="md" variant="secondary" text="Add Content"/>
    </div>
    <br />
    <div className="flex gap-4">
    {content.map(({type, title, link})=> <CardComponent title={title} link={link} type={type}/> )}
    </div>
  </div>
  </div>
 
} 