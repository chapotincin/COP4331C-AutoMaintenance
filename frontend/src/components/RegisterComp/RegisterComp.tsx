import React, { useState } from "react";
import './RegisterComp.css'

function RegisterComp()
{
    const [message,setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordRepeat: ''
      });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    async function doRegister(event: React.FormEvent) : Promise<void>
    {
        event.preventDefault();
        const {email, firstName, lastName, password, passwordRepeat} = formData;
        if (!email || !firstName || !lastName || !password || !passwordRepeat) 
        {
            setMessage('All fields are required');
            return;
        }

        if(password !== passwordRepeat)
        {
            setMessage('Passwords do not match');
            return;
        }

        try
        {
            const response = await fetch('http://159.203.135.123:5000/api/register', {
                method: 'POST',headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                  email,
                  firstName,
                  lastName,
                  password
                }),
              });
              const data = await response.json();
              if(response.ok)
              {
                setMessage('');
                window.location.href = '/login';
              }
              else
              {
                setMessage(data.message || 'Something went wrong');
              }
        }
        catch (error)
        {
            setMessage('Error registering, try again.')
        }
    };
    return(
        <div id = "register-div">
            <label>Email</label>
            <input type="text" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange}/>
            <div id= "first-last">
                <div>
                    <label>First Name</label>
                    <input type="text" id="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange}/>
                </div>

                <div>
                    <label>Last Name</label>
                    <input type="text" id="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange}/>
                </div>
            </div>

            <label>Password</label>
            <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
            
            <label>Repeat Password</label>
            <input type="password" id="passwordRepeat" placeholder="Repeat Password" value={formData.passwordRepeat} onChange={handleInputChange}/>
            
            <button id="registerButton" className="buttons" onClick={doRegister}>Register</button>
            {message && <p>{message}</p>}
            <label>Already have an account? </label>
            <a href = "/login">Log In</a>
        </div>
    );
};

export default RegisterComp;