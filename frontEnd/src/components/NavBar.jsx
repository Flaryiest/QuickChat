import "/src/styles/navbar.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
function NavBar() {
    const [loginStatus, setLoginStatus] = useState(false)

    async function getChats() {
        const response = await fetch("http://localhost:3000/api/checkLoggedIn", {
            method: 'GET',
            credentials: 'include'
        })
        if (response.status == 200) {
            setLoginStatus(true)
        }
    }

    async function logOut() {
        await fetch("http://localhost:3000/api/log-out", {
            method: 'GET',
            credentials: "include",
        })
    }


    useEffect(() => {
        getChats()
    }, [])

    if (loginStatus) {
        return <header className="navBar">
        <div className="logo">  
            <Link to="/">Quickchat</Link>
        </div>
        <ul className="navLinks">
            <li>
                <Link to="/chats"><span className="animated secondRow">Chats</span></Link>
            </li>
            <li>
                <Link to="/" onClick={logOut}>Log Out</Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
            <li>
                <Link to="/login"><span className="animated secondRow">Log In</span></Link>
            </li>
        </ul>

    </header>
    }
    else {
        return (
        <header className="navBar">
            <div className="logo">
                <Link to="/">Quickchat</Link>
            </div>
            <ul className="navLinks">
                <li>
                    <Link to="/chats"><span className="animated secondRow">Chats</span></Link>
                </li>
                <li>
                    <Link to="/" onClick={logOut}>Log Out</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login"><span className="animated secondRow">Log In</span></Link>
                </li>
            </ul>
        </header>
        )
    }
}

export default NavBar
