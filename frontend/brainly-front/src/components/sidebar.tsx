import { TwitterIcon } from "./icons/TwitterIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { SideBarItem } from "./sidebaritems"


export const SideBarComponent = () => {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div>
            <div className="pt-4">
            <SideBarItem text="Twitter" icon={<TwitterIcon/>}/>
            <SideBarItem text="Youtube" icon={<YoutubeIcon/>}/>
            </div>
        </div>
     </div>
} 