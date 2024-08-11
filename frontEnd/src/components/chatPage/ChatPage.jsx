import { useState, useEffect, useRef } from "react"
import NavBar from "../NavBar"
import ScrollToTop from "../ScrollToTop"
import "/src/styles/chatPage.css"
import UserSearch from "./UserSearch.jsx"
import { Link } from "react-router-dom"


function ChatPage() {
    const [chats, setChats] = useState([])
    const [render, triggerRender] = useState(0)
    const [currentChatID, setCurrentChatID] = useState(null)
    const [messages, setMessages] = useState([])
    const ws = useRef(null)
    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8080")
        ws.current.onopen = () => {
            console.log("websocket opened")
        }
        ws.current.onmessage = (event) => {
            console.log(event.data)
            console.log("recieved message")
            triggerRender(prevRender => prevRender + 1)
        }
        ws.current.onclose = () => {
            console.log("websocket closed")
        }
        ws.current.onerror = (error) => {
            console.log(error)
            console.log("websocket error")
            
        }
        return () => {
            ws.current.close()
        }
        
    }, [])

    useEffect(() => {
        getChats()
    }, [render])

    useEffect(() =>{ 
        getMessages()
    }, [render, currentChatID])

    function triggerRenderFunction() {
        triggerRender(prevRender => prevRender + 1)
    }   
    const handleInput = (e) => {
        if (e.key === "Enter") {
            sendMessage(e.target.value)
            e.target.value = null
            
        }
    }

    async function sendMessage(message) {
        await sendMessageToServer(message)
        await fetch("http://localhost:3000/api/sendMessage", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: message, chatID: currentChatID})
        })
    }

    async function sendMessageToServer(message) {
        const messageObject = {chatID: currentChatID, message: message}
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(messageObject))
            console.log("message sent")
        }
        else {
            console.log("no websocket")
        }
    }

    async function getChats() {
        const response = await fetch("http://localhost:3000/api/chats", {
            method: 'GET',
            credentials: 'include'
        })
        const userChats = await response.json()
        setChats(userChats)
    }

    async function getMessages() {
        const response = await fetch("http://localhost:3000/api/getMessages", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chatID: currentChatID}),
        })
        const chatMessages = await response.json()
        setMessages(chatMessages)
    }

    const changeChat = async (e) => {
        await setCurrentChatID(e.target.id)
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
                        {chats.map((chat) => (
                        <li key={chat.id} id={chat.id} onClick={changeChat}className={`chatPageChat ${Number(chat.id) === Number(currentChatID) ? 'selectedChat' : ''}`}> {chat.usernameone} {chat.usernametwo} </li>
                        ))}
                    </ul>
                </div>
                <div className="chatPageSideBarBottom">
                    <Link to="/settings" className="chatPageSettings">Settings</Link>
                </div>
            </div>
            <div className="fadeColumn"></div>
            <div className="chatPageMain">
                <div className="chatPageMainTop">
                    <h2 className="chatPageMainHeader">Chat</h2>
                    <div className="fade"></div>
                </div>
                <div className="chatPageMainBottom">
                    <ul className="chatPageMessages">
                        {messages.map((message) => <li key={message.id} className="chatPageMessage">{message.message}</li>)}
                    </ul>
                    <div className="messageBar">
                    <input className="messageBarInput" placeholder="Send Message" onKeyDown={handleInput}></input>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ChatPage