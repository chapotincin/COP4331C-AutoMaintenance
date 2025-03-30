import "./HomeHeader.css"
import Logo from '../Logo/Logo'
import { useNavigate, useLocation } from "react-router-dom";

function HomeHeader() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current route
    const currentPath = location.pathname;
    const hideButtonOnPath = "/carpage"; // Example path
    return (
        <div id="header">
            <Logo />
            <div className="buttons-container">
                <button id="homeButton" className="buttons" onClick={() => navigate("/")}>Home</button>
                <button id="teamButton" className="buttons" onClick={() => navigate("/team")}>Team</button>
                {currentPath !== hideButtonOnPath && (
                    <button id="loginButton" className="buttons" onClick={() => navigate("/login")}>Log In</button>
                )}
            </div>
        </div>
    );
}

export default HomeHeader;
