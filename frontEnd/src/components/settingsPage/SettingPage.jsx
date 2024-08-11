import NavBar from "../NavBar"
import ScrollToTop from "../ScrollToTop"
import "/src/styles/settingsPage.css"
import { useState, useEffect } from "react"

function SettingsPage() {
    const [user, setUser] = useState({username: "Not Logged In"})
    async function getUser() {
        const response = await fetch("http://localhost:3000/api/user", {
            method: 'GET',
            credentials: 'include'
        })
        const currentUser = await response.json()
        setUser(currentUser)
    }

    useEffect(() => {
        getUser()
    }, [])
    console.log(user)

    return <div className="settingsPage">
        <NavBar/>
        <ScrollToTop/>
        <div className="settingsPageContent">
            <h2 className="settingsPageHeader">{user.username}</h2>
            <div>
                <div>Upload File</div>
                <form action="/upload" method="POST" encType="multipart/form-data">
                    <input type="file" name="file" className="fileInput"/>
                    <button type="submit" className="uploadButton">
                        <img className="uploadIcon" src="/images/upload-icon.svg"/>
                    </button>
                </form>
            </div>
        </div>
    </div>
}

export default SettingsPage