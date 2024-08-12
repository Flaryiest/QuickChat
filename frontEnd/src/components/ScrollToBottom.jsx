import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToBottom() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({top: document.documentElement.scrollHeight, behavior: "smooth"})
    }, [pathname])
    return null
}

export default ScrollToBottom
