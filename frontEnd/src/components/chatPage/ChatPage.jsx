import { useState } from "react"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ScrollToTop from "../ScrollToTop"
import { useForm } from "react-hook-form"
import "/src/styles/chatPage.css"

function ChatPage() {
    return <div className="chatPage">
        <NavBar/>
        <ScrollToTop/>
        <div className="chatPageContent">
            <div className="chatPageSideBar">
                <div className="chatPageSideBarTop">
                    <div className="chatPageSideBarHeader">People</div>
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