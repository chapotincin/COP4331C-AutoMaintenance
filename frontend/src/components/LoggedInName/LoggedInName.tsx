import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function LoggedInName()
{
    const navigate = useNavigate();
    var _userData = localStorage.getItem('user_data');
    var userData;
    if(_userData)
    {
        userData = JSON.parse(_userData);
    }
    else
    {
        console.log("Missing user data!");
        //FOR TESTING ONLY BELOW VVVVVVVVVVVVV
        //userData = { success: true, userId: "1234", firstName: "Rick", lastName: "L"};
    }
    var firstName = userData.firstName;
    var lastName = userData.lastName;
    
    async function logOut(event:any): Promise<void>
    {
        event.preventDefault();
        localStorage.removeItem('user_data');
        navigate("/")
    }

    return(
        <div className='container'>
            <div className='row'>
                <h2>Welcome, {firstName} {lastName}</h2>
                <button type="submit" className="btn btn-primary" onClick={logOut}>Log Out</button>
            </div>
        </div>
    );
}

export default LoggedInName;