import React, { useState } from "react";
import "./LoginComp.css"

function LoginComp()
{
    const [message,setMessage] = useState('');
    const [loginEmail,setLoginEmail] = React.useState('');
    const [loginPassword,setLoginPassword] = React.useState('');

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
                window.location.href = '/';
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
            <input type="text" id="emailRegister" placeholder="Email" />
            <label>Password</label>
            <input type="password" id="passwordRegister" placeholder="Password" />
            <button id="loginButton" className="buttons" onClick={doLogin}>Login</button>
            <label>New User? </label>
            <a href = "/register">Create An Account</a>
        </div>
    );
}

export default LoginComp;