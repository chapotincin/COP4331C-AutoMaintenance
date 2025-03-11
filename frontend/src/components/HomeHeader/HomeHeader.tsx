import "./HomeHeader.css"
import Logo from '../Logo/Logo'
import { useNavigate } from "react-router-dom";

function HomeHeader()
{
    const navigate = useNavigate();

    return(
        <div id="header">
            <Logo />
            <button id="homeButton" className="buttons" onClick={() => navigate("/")}>Home</button>
            <button id="teamButton" className="buttons" onClick={() => navigate("/team")}>Team</button>
            <button id="loginButton" className="buttons" onClick={() => navigate("/login")}>Log In</button>
            {/*
            <h1 id="title">CarLogix 
                <a href="/">Home</a> <a href="/team">Team</a> <a href="/login">Log In</a>
            </h1>
            */}

        </div>
    );
};

export default HomeHeader;