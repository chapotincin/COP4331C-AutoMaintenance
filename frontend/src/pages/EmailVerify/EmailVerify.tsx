import SidePicture from "../../components/SidePicture/SidePicture";
import Logo from "../../components/Logo/Logo";
import EmailVerComp from "../../components/EmailVerComp/EmailVerComp";
import './EmailVerify.css'

const EmailVerify = () =>
{
    return(
        <div id='email-verify-page'>
            <SidePicture />
            <div id='verify-field'>
                <div id='logo'>
                    <Logo />
                </div>
                <EmailVerComp />
            </div>
        </div>
    );
}

export default EmailVerify;