import HomeHeader from '../../components/HomeHeader.tsx';
import HomeFooter from '../../components/HomeFooter.tsx';
import SidePicture from '../../components/SidePicture/SidePicture.tsx';
import LoginComp from '../../components/LoginComp/LoginComp.tsx';
import "./Login.css";

const Login = () =>
{
    return(
        <div id="full-page">
            <SidePicture />
            <LoginComp />
        </div>
    );
};

export default Login;