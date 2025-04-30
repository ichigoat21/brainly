import { LogoIcon } from "./icons/Logo"
import { TwitterIcon } from "./icons/TwitterIcon"
import { YoutubeIcon } from "./icons/YoutubeIcon"
import { SideBarItem } from "./sidebaritems"


export const SideBarComponent = () => {
    return <div className="h-screen bg-white shadow-lg w-72 fixed left-0 top-0 pl-6 pr-12">
        <div className="flex text-2xl pt-6 items-center">
        <div className="text-purple-500 pr-3"><LogoIcon/></div>
         Second Brain
        </div>
        <div>
            <div className="pt-8">
            <SideBarItem text="Twitter" icon={<TwitterIcon/>}/>
            <SideBarItem text="Youtube" icon={<YoutubeIcon/>}/>
            </div>
        </div>
     </div>
} 