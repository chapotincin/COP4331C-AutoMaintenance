import HomeHeader from '../../components/HomeHeader/HomeHeader.tsx';
import HomeFooter from '../../components/HomeFooter.tsx';
import RegisterComp from '../../components/RegisterComp/RegisterComp.tsx';
import SidePicture from '../../components/SidePicture/SidePicture.tsx';
import Logo from '../../components/Logo/Logo.tsx';
import "./Register.css"

const Register = () =>
{
    return(
            <div id="full-page">
                <SidePicture />
                <div id='register-field'>
                    <div id='logo'>
                        <Logo />
                    </div>
                    <RegisterComp />
                </div>
            </div>
    );
};

export default Register;