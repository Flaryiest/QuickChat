import { useState } from "react"

function UserSearch() {
    const [searchItem, setSearchItem] = useState('')
    const [users, setUsers] = useState([])
    async function getUsers() {
        
        const response = await fetch("http://localhost:3000/api/users", {
            method: 'GET',
            credentials: 'include'
        })
        const users = await response.json()
        console.log(users, "in promise")
        setUsers[users]
        return users
    }  
    getUsers()
    
    console.log(users, "test")
    
    const handleInputChange = (e) => {
        const searchTerm = e.target.value
        setSearchItem(searchTerm)
    }

    return <div className="userSearch">
        <input type="text" className="chatPageUserSearch" placeholder="Search" value={searchItem} onChange={handleInputChange}></input>
        <ul className="userSearchList">
            {users.map(user => <li key={user.id}>{user.username}</li>)}
        </ul>
    </div>
}

export default UserSearch