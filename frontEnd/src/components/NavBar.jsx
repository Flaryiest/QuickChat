import "/src/styles/navbar.css"
import { Link } from "react-router-dom"
function NavBar() {
    return (
    <header className="navBar">
        <div className="logo">
            <Link to="/">Quickchat</Link>
        </div>
        <ul className="navLinks">
            <li>
                <Link to="/info">Info</Link>
            </li>
            <li>
                <Link to="/signup"><span className="animated secondRow">Log In</span></Link>
            </li>
        </ul>

            

    </header>
    )
}

export default NavBar
