import { Button } from "./components/button"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"

const App = () => {
  return <div>
    <Button startIcon={<PlusIcon/>} size="sm" variant="primary" text="share"/>
    <Button endIcon={<ShareIcon/>} size="md" variant="secondary" text="add"/>
  </div>
}
export default App
