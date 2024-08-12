import { useState, useEffect } from "react"

function UserSearch({renderFunction}) {
    const [searchItem, setSearchItem] = useState('')
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers() {
        const response = await fetch("http://localhost:3000/api/users", {
            method: 'GET',
            credentials: 'include'
        })
        const users = await response.json()
        setUsers(users)
        setFilteredUsers(users)
        return users
    }  

    async function createNewChat(chatUser) {
        await fetch("http://localhost:3000/api/chats", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: chatUser})
        })
        renderFunction()
    }

    const createChat = (e) => {
        const chatUser = e.target.value
        createNewChat(chatUser)

    }
    
    
    const handleInputChange = (e) => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)
        const filteredItems = users.filter((user) => {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredUsers(filteredItems)
    }

    const filteredSlicedUsers = filteredUsers.slice(0, 5)

    return <div className="userSearch">
        <input type="text" className="chatPageUserSearch" placeholder="Search" value={searchItem} onChange={handleInputChange}></input>
        <ul className="userSearchList">
            {filteredSlicedUsers.map(user => <li key={user.id} className="userSearchItem"><button className="userSearchItem" value={user.username} onClick={createChat}>{user.username} +</button></li>)}
        </ul>
    </div>
}

export default UserSearch