import SidePicture from '../../components/SidePicture/SidePicture.tsx';
import LoginComp from '../../components/LoginComp/LoginComp.tsx';
import Logo from '../../components/Logo/Logo.tsx';
import "./Login.css";

const Login = () =>
{
    return(
        <div id="full-page">
            <SidePicture />
            <div id='verify-field'>
                <div id='logo'>
                    <Logo />
                </div>
                <LoginComp />
            </div>
        </div>
    );
};

export default Login;