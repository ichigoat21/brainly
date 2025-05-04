import { useEffect, useState } from "react"
import { refresh } from "./share";




export const useContent = () => {
    const [content, setContent] =useState<any[]>([]);

    useEffect(() => {
        refresh("contents", setContent)
        let interval = setInterval(() => {
            refresh("contents", setContent)
        }, 10 * 1000)
        return () => {
            clearInterval(interval)
        }
    }, []
    )
    return { content, setContent }
}