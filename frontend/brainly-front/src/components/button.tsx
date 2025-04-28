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
const defaultStyles = "rounded-xl cursor-pointer"
const sizeStyles = {
    "sm" : "p-2",
    "md" : "p-4",
    "lg" : "px-8 py-4"
}
export const Button = (props : ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
      {props.text}
    </button>
}