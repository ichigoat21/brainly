import { useEffect, useState } from "react"
import { refresh } from "./useRefresh";

export const useContent = () => {
    const [content, setContent] =useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return; 
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