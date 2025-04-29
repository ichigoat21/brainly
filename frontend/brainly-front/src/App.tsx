import { Button } from "./components/button"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"

const App = () => {
  return <div>
    <Button startIcon={<PlusIcon size="lg"/>} size="lg" variant="primary" text="Share"/>
    <Button endIcon={<ShareIcon size="lg"/>} size="lg" variant="secondary" text="Add Content"/>
  </div>
}
export default App

