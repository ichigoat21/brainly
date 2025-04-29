interface InputProps {
    placeholder : string,
    onchange? : () => void
}



export const InputComponent = (props : InputProps) => {
    return <input type="text" className="px-4 py-2 rounded-md border m-2" onChange={props.onchange} placeholder={props.placeholder}/>
}