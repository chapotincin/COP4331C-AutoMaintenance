import 'bootstrap/dist/css/bootstrap.min.css';

function LoggedInName()
{
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

    return(
        <div className='container'>
            <div className='row'>
                <h2>Welcome, {firstName} {lastName}</h2>
            </div>
        </div>
    );
}

export default LoggedInName;