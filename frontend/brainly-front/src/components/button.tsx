import { ReactElement } from "react"

type Variants = "primary" | "secondary"

interface ButtonProps  {
      variant : Variants,
      text : string,
      size : "sm" | "md" | "lg",
      startIcon? : ReactElement,
      endIcon? : ReactElement
}
//button colors : light purple bg , dark purple bg  text white , text-purple 

const  variantStyles = {
    "primary" : "bg-[#e1e7fe] text-[#4038ae]",
    "secondary" : "bg-[#5046e4] text-[#eef3ff]"
}
const defaultStyles = "rounded-md cursor-pointer"
const sizeStyles = {
    "sm" : "px-2 py-1 text-sm",
    "md" : "px-4 py-2 text-md",
    "lg" : "px-8 py-4 text-lg"
}
export const Button = (props : ButtonProps) => { <Button size="md" variant="secondary" text="add"/>
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        <div className="flex items-center">
          {props.startIcon}
          {props.text}
          {props.endIcon}
        </div>
    </button>
}