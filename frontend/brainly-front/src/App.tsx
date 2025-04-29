import { useState } from "react"
import { Button } from "./components/button"
import { CardComponent } from "./components/card"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"
import { ModalComponent } from "./components/modal"

const App = () => {
  const [modalOpen, setModelOpen] = useState(false);
  return <div>
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
    <CardComponent title="tweet 1" link="https://x.com/vampivex/status/1916942044963946708" type="twitter"/>
    </div>
  </div>
}
export default App

