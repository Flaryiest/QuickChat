import NavBar from "../NavBar"
import ScrollToTop from "../ScrollToTop"
import "/src/styles/settingsPage.css"
import { useState, useEffect } from "react"
import axios from "axios"
require("dotenv").config()
const {createClient} = require("@supabase/supabase-js")
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

function SettingsPage() {
    const [user, setUser] = useState({username: "Not Logged In"})
    const [file, setFile] = useState(null)
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
    
    
    const upload = async (e) => {
        console.log(file)
        const formData = new FormData()
        formData.append("file", file)
        response = await axios.post("http://localhost:3000/api/profilePicture", formData)
    }

    return <div className="settingsPage">
        <NavBar/>
        <ScrollToTop/>
        <div className="settingsPageContent">
            <h2 className="settingsPageHeader">{user.username}</h2>
            <div>
                <div>Upload File</div>
                    <input type="file" name="file" className="fileInput" onChange={(e) => setFile(e.target.files[0])}/>
                    <button type="submit" className="uploadButton" onClick={upload}>
                        <img className="uploadIcon" src="/images/upload-icon.svg"/>
                    </button>
            </div>
        </div>
    </div>
}

export default SettingsPage