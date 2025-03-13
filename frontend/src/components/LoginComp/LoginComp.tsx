import "./LoginComp.css"
import React,{useState} from "react";

function LoginComp()
{
    const [message,setMessage] = useState('');
    const [loginEmail,setLoginEmail] = React.useState('');
    const [loginPassword,setLoginPassword] = React.useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginEmail(e.target.value);
    };
    
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginPassword(e.target.value);
    };

    async function doLogin(event:any) : Promise<void>
    {
        event.preventDefault();
        var obj = {email:loginEmail, password:loginPassword};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch('http://159.203.135.123:5000/api/login',
                {method:'POST',body:js,headers:{'Content-Type' :
                    'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0)
            {
                setMessage('Email/Password combination incorrect');
            }
            else
            {
                var user =
                {firstName:res.firstName,lastName:res.lastName,email:res.email,id:res.id}
                    localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/carpage';
            }
        }
        catch(error:any)
        {
            alert(error.toString());
            return;
        }
    };
    return(
        <div id="login-div">
            <label>Email</label>
            <input type="text" id="email" placeholder="Email" value={loginEmail} onChange={handleEmailChange}/>
            <label>Password</label>
            <input type="password" id="password" placeholder="Password" value={loginPassword} onChange={handlePasswordChange}/>
            <button id="loginButton" className="buttons" onClick={doLogin}>Login</button>
            {message && <p style={{ color: "red" }}>{message}</p>} {/* Display error message */}
            <label>New User? </label>
            <a href = "/register">Create An Account</a>
        </div>
    );
}

export default LoginComp;