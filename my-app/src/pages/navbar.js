import './navbar.css';
export default function Navbar() {
    return(
        <nav>
            <a href = "/">
                <img src = "/Logo3.png"></img>
            </a>
            <ul>
                <li>
                    <a href = "/resume"> Resume </a>
                </li>
                <li>
                    <a href = "/jobs"> Jobs </a>
                </li>
                <li>
                    <a href = "/interview"> Interview Stage </a>
                </li>
                <li>
                    <a href = "/user"> User </a>
                </li>
                <li>
                    <a href = "/resources"> Resources </a>
                </li>
            </ul>
            
        </nav>
    )
}
