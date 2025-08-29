import { useEffect, useState } from "react"
import { Button } from "../components/button"
import { CardComponent } from "../components/card"
import { PlusIcon } from "../components/icons/PlusIcon"
import { ShareIcon } from "../components/icons/ShareIcon"
import { ModalComponent } from "../components/modal"
import { SideBarComponent } from "../components/sidebar"
import { useContent } from "../hooks/useContent"
import { refresh } from "../hooks/share"
import { handleShare } from "../hooks/useShare"


export const Dashboard = () => {
  
  const [modalOpen, setModelOpen] = useState(false);
  const {content, setContent} = useContent()
  useEffect (()=> {
    refresh("/content/preview", setContent)
  }, [modalOpen]
  )
  console.log(content);
  
  const onShareClick = async () => {
    const shareUrl = await handleShare(); 
    alert(`http://localhost:5173/${shareUrl}`);
  };

  return <div>
   <SideBarComponent/>
   <div className="p-4 ml-72 bg-[#f8fafc] min-h-screen">
    <ModalComponent open = {modalOpen} onclick={()=>{
      setModelOpen(false)
    }}/>
    <div className="flex justify-end pt-5 gap-2">
    <Button onclick={onShareClick} startIcon={<ShareIcon size="lg"/>} size="lg" variant="primary" text="Share"/>
    <Button onclick={()=>{setModelOpen(true)}} endIcon={<PlusIcon size="lg"/>} size="md" variant="secondary" text="Add Content"/>
    </div>
    <br />
    <div className="flex gap-4">
    {content.map(({ _id, type, title, link }) => (
   <CardComponent
    key={_id}
    title={title}
    link={link}
    type={type as "youtube" | "twitter"}
    ondelete={() => deleteIcon(_id)}
  />
  ))}
    </div>
  </div>
  </div>
 
} 