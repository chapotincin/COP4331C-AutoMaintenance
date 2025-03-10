import React from "react";
import './RegisterComp.css'

function RegisterComp()
{
    async function doRegister(event:any) : Promise<void>
    {
        
    };
    return(
        <div id = "register-div">
            <label>Email</label>
            <input type="text" id="emailRegister" placeholder="Email" />
            <div id= "first-last">
                <div>
                    <label>First Name</label>
                    <input type="text" id="firstNameRegister" placeholder="First Name" />
                </div>

                <div>
                    <label>Last Name</label>
                    <input type="text" id="lastNameRegister" placeholder="Last Name" />
                </div>
            </div>

            <label>Password</label>
            <input type="password" id="passwordRegister" placeholder="Password" />
            
            <label>Repeat Password</label>
            <input type="password" id="passwordRepeatRegister" placeholder="Repeat Password" />
            
            <button id="registerButton" className="buttons" onClick={doRegister}>Register</button>
            <label>Already have an account? </label>
            <a href = "/login">Log In</a>
        </div>
    );
};

export default RegisterComp;