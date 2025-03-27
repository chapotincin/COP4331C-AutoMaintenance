import "./HomeHeader.css"
import Logo from '../Logo/Logo'
import { useNavigate } from "react-router-dom";

function HomeHeader() {
    const navigate = useNavigate();

    return (
        <div id="header">
            <Logo />
            <div className="buttons-container">
                <button id="homeButton" className="buttons" onClick={() => navigate("/")}>Home</button>
                <button id="teamButton" className="buttons" onClick={() => navigate("/team")}>Team</button>
                <button id="loginButton" className="buttons" onClick={() => navigate("/login")}>Log In</button>
            </div>
        </div>
    );
}

export default HomeHeader;
