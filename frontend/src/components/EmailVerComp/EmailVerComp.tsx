import React, {useState} from "react";
import './EmailVerComp.css'

function EmailVerComp()
{
    const [message,setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        emailCode: ''
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    async function doVerify(event: React.FormEvent) : Promise<void>
    {
        event.preventDefault();
        const {email, firstName, lastName, password, emailCode} = formData;
        if (!email || !firstName || !lastName || !password || !emailCode) 
        {
            setMessage('All fields are required');
            return;
        }
        try
        {
            const response = await fetch('http://localhost:5000/api/login',
                {method:'POST',headers:{'Content-Type' :
                    'application/json'},body: JSON.stringify({
                        email,
                        emailCode,
                        password,
                        firstName,
                        lastName
                    })});
            if(response.ok)
            {
                setMessage('');
                window.location.href = '/login';
            }
        }
        catch
        {
            setMessage('Error, try again.')
        }
            
    }
    return(
        <div id='verify-field'>
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
            
            <label>Email Code</label>
            <input type="text" id="emailCode" placeholder="Code" value={formData.emailCode} onChange={handleInputChange}/>
            
            <button id="verifyButton" className="buttons" onClick={doVerify}>Verify</button>
            {message && <p>{message}</p>}
            <label>Already have an account? </label>
            <a href = "/login">Log In</a>
        </div>
    )
}

export default EmailVerComp;