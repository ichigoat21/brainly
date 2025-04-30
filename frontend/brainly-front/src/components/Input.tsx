interface InputProps {
    placeholder : string,
    onchange? : () => void,
    reference? : any
}



export const InputComponent = (props : InputProps) => {
    return <input ref={props.reference} type="text" className="px-4 py-2 rounded-md border m-2" placeholder={props.placeholder}/>
}