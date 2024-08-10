import { useState, useEffect } from "react"
import NavBar from "../NavBar"
import ScrollToTop from "../ScrollToTop"
import "/src/styles/chatPage.css"
import UserSearch from "./UserSearch.jsx"
function ChatPage() {
    const [chats, setChats] = useState([])
    const [render, triggerRender] = useState(0)
    const [currentChatID, setCurrentChatID] = useState(null)

    function triggerRenderFunction() {
        console.log(render)
        triggerRender(prevRender => prevRender + 1)
    }   

    useEffect(() => {
        getChats()
    }, [render])

    async function getChats() {
        const response = await fetch("http://localhost:3000/api/chats", {
            method: 'GET',
            credentials: 'include'
        })
        const userChats = await response.json()
        console.log(userChats)
        setChats(userChats)
    }

    const changeChat = (e) => {
        console.log(e.target.id)
    }
    return <div className="chatPage">
        <NavBar/>
        <ScrollToTop/>  
        <div className="chatPageContent">
            <div className="chatPageSideBar">
                <div className="chatPageSideBarTop">
                    <div className="chatPageSideBarHeader">People</div>
                    <UserSearch renderNumber={render} renderFunction={triggerRenderFunction}/>
                    <div className="chatPageSideBarHeader">Chats</div>
                    <ul className="chatPageChats">
                    {chats.map((chat) => <li key={chat.id} id={chat.id} onClick={changeChat} className="chatPageChat">{chat.usernameone} {chat.usernametwo}</li>)}
                    </ul>
                </div>
            </div>
            <div className="fadeColumn"></div>
            <div className="chatPageMain">
                <div className="chatPageMainTop">
                    <h2 className="chatPageMainHeader">Chat</h2>
                    <div className="fade"></div>
                </div>
                <div className="chatPageMainBottom">
                    <div className="messageBar">
                    <input className="messageBarInput" placeholder="Send Message"></input>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ChatPage