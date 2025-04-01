import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";

function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div id="header" className="d-flex justify-content-between align-items-center p-3">
      <Logo />
      <div className="d-flex gap-2">
        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>Home</button>
        <button className="btn btn-outline-dark" onClick={() => navigate("/team")}>Team</button>
        <button className="btn btn-outline-danger" onClick={() => navigate("/login")}>Log In</button>
      </div>
    </div>
  );
}

export default HomeHeader;
