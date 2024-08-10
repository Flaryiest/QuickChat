import { useState } from "react"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ScrollToTop from "../ScrollToTop"
import { useForm } from "react-hook-form"
import "/src/styles/chatPage.css"
import UserSearch from "./UserSearch.jsx"
function ChatPage() {
    async function getChats() {
        const response = await fetch("http://localhost:3000/api/chats", {
            method: 'GET',
            credentials: 'include'
        })
        const userChats = await response.json()
        console.log(userChats)
        return userChats
    }
    const chats = getChats()
    
    return <div className="chatPage">
        <NavBar/>
        <ScrollToTop/>
        <div className="chatPageContent">
            <div className="chatPageSideBar">
                <div className="chatPageSideBarTop">
                    <div className="chatPageSideBarHeader">People</div>
                    <UserSearch/>
                </div>
            </div>
            <div className="fadeColumn"></div>
            <div className="chatPageMain">
                <div className="chatPageMainTop">
                    <h2 className="chatPageMainHeader">Chat</h2>
                    <div className="fade"></div>
                </div>
            </div>
        </div>
    </div>
}

export default ChatPage