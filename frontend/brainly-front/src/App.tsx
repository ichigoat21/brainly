import { useState } from "react"
import { Button } from "./components/button"
import { CardComponent } from "./components/card"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"
import { ModalComponent } from "./components/modal"
import { SideBarComponent } from "./components/sidebar"

const App = () => {
  const [modalOpen, setModelOpen] = useState(false);
  return <div>
   <SideBarComponent/>
   <div className="p-4 ml-72 bg-[#f8fafc] min-h-screen">
    <ModalComponent open = {modalOpen} onclick={()=>{
      setModelOpen(false)
    }}/>
    <div className="flex justify-end pt-5 gap-2">
    <Button startIcon={<PlusIcon size="lg"/>} size="lg" variant="primary" text="Share"/>
    <Button onclick={()=>{setModelOpen(true)}} endIcon={<ShareIcon size="lg"/>} size="md" variant="secondary" text="Add Content"/>
    </div>
    <br />
    <div className="flex">
    <CardComponent title="BAMBIETTA" link="https://youtu.be/jM2r532cMbA?si=JyArbOHpA2b-03us" type="youtube"/>
    <br />
    <CardComponent title="tweet 1" link="" type="twitter"/>
    </div>
  </div>
  </div>
 
}
export default App

