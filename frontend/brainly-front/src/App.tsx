import { Button } from "./components/button"
import { CardComponent } from "./components/card"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"

const App = () => {
  return <div>
    <Button startIcon={<PlusIcon size="lg"/>} size="lg" variant="primary" text="Share"/>
    <Button endIcon={<ShareIcon size="lg"/>} size="lg" variant="secondary" text="Add Content"/>
    <br />
   <CardComponent title="BAMBIETTA" link="https://youtu.be/jM2r532cMbA?si=JyArbOHpA2b-03us" type="youtube"/>
   <CardComponent title="" link="https://x.com/vampivex/status/1916942044963946708" type="twitter"/>
  </div>
}
export default App

