import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";

function GarageHeader() {
    const navigate = useNavigate();
    async function logOut(event:any): Promise<void>
    {
        event.preventDefault();
        localStorage.removeItem('user_data');
        navigate("/")
    }
    return (
        <div className="d-flex justify-content-between align-items-center p-3 ">
            <Logo />
            <button type="button" className="btn btn-outline-danger" onClick={logOut}>Log Out</button>
        </div>
    );
}

export default GarageHeader;
