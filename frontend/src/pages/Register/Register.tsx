import RegisterComp from '../../components/RegisterComp/RegisterComp.tsx';
import SidePicture from '../../components/SidePicture/SidePicture.tsx';
import "./Register.css"

const Register = () =>
{
    return(
            <div id="full-page">
                <SidePicture />
                <RegisterComp />
            </div>
    );
};

export default Register;