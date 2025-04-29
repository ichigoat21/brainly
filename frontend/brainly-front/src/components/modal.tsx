import { Button } from "./button"
import { CrossIcon } from "./icons/CrossIcon"
import { InputComponent } from "./Input"

interface modalProps {
    open : boolean,
    onclick? : () => void
}

export const ModalComponent = ({open, onclick}: modalProps) => {
      return <div>
        {open && <div className="w-screen h-screen bg-slate-200 opacity-60 fixed top-0 left-0 flex justify-center">
         <div className="flex flex-col justify-center">
             <span className="bg-white opacity-100 p-4 rounded gap-2">
                 <div className="flex justify-end">
                    <div onClick={onclick} className="cursor-pointer">
                    <CrossIcon size="lg"/>
                    </div>
                 </div>
                 <div className="flex flex-col">
                 <InputComponent placeholder="title"/>
                 <InputComponent placeholder="link"/>
                 </div>
                 <div className="flex justify-center">
                    <Button size="md" text="Submit" variant="secondary" />
                 </div>
             </span>
         </div>
            </div>}
      </div>
}