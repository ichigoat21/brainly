import { ReactElement } from "react"

interface sidebarprops {
    text : string,
    icon : ReactElement
}



export const SideBarItem = (props : sidebarprops) => {
    return <div className="flex gap-2">
     <div className="p-2">
        {props.text}
     </div>
     <div className="p-2">
        {props.icon}
     </div>
    </div>
}