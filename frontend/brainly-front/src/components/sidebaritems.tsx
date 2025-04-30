import { ReactElement } from "react"

interface sidebarprops {
    text : string,
    icon : ReactElement
}



export const SideBarItem = (props : sidebarprops) => {
    return <div className="flex gap-2 text-gray-800 items-center cursor-pointer hover:bg-gray-300 rounded">
     <div className="p-2">
        {props.icon}
     </div>
     <div className="p-2">
        {props.text}
     </div>
    </div>
}