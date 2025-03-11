import "./LoginComp.css"

function LoginComp()
{
    return(
        <div id="login-div">
            <label>Email</label>
            <input type="text" id="emailRegister" placeholder="Email" />
            <label>Password</label>
            <input type="password" id="passwordRegister" placeholder="Password" />
            <button id="loginButton" className="buttons" >Login</button>
            <label>New User? </label>
            <a href = "/register">Create An Account</a>
        </div>
    );
}

export default LoginComp;