import React, {useState} from "react";

function EmailVerComp()
{
    const [message,setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        code: ''
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    async function doVerify(event: React.FormEvent) : Promise<void>
    {
        event.preventDefault();
        const {email, firstName, lastName, password, code} = formData;
        if (!email || !firstName || !lastName || !password || !code) 
        {
            setMessage('All fields are required');
            return;
        }
        try
        {
            const response = await fetch('http://159.203.135.123:5000/api/verify-email',
                {method:'POST',headers:{'Content-Type' :
                    'application/json'},body: JSON.stringify({
                        email,
                        code,
                        password,
                        firstName,
                        lastName
                    })});
            
            if (!response.ok) {
                setMessage('Server error. Please try again.');
            }

            const res = await response.json();

            if(res.success)
            {
                setMessage('');
                window.location.href = '/login';
            }
            else
            {
                setMessage('Error registering.');
            }
        }
        catch
        {
            setMessage('Error, try again.')
        }
            
    }
    return(
        /*
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
            <input type="text" id="code" placeholder="Code" value={formData.code} onChange={handleInputChange}/>
            
            <button id="verifyButton" className="buttons" onClick={doVerify}>Verify</button>
            {message && <p>{message}</p>}
            <label>Already have an account? </label>
            <a href = "/login">Log In</a>
        </div>
        */
        <div className="container mt-4">
            <form className="p-2 mx-auto" style={{ maxWidth: '400px' }} onSubmit={doVerify}>
                <h2 className="text">Verify Email</h2>
                {message && <div className="alert alert-danger">{message}</div>}

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Code </label>
                    <input
                        type="text"
                        id="code"
                        placeholder="Code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Verify</button>
                </div>

                <div className="text-center mt-3">
                    <label>Already Have an Account? </label>
                    <a href="/login" className="text-decoration-none"> Log in</a>
                </div>
            </form>
        </div>
    );
}

export default EmailVerComp;