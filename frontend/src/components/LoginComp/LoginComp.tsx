import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

function LoginComp() {
    const [message, setMessage] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginPassword(e.target.value);
    };

    async function forgotPassword(e:any): Promise <void> 
    {
        if(!loginEmail)
        {
            setMessage("Please Enter Your Email.");
        }
        else
        {
            const obj = {email: loginEmail};
            const js = JSON.stringify(obj);
            e.preventDefault();    

            try
            {
                const response = await fetch('http://159.203.135.123:5000/api/forgot-password', {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' }
                });

                if(!response.ok)
                {
                    setMessage('Server error. Please try again.');
                }

                const res = await response.json();

                if(res.success)
                {
                    setMessage('Please Check Your Email.');
                }
                else
                {
                    setMessage('Error sending Email')
                }
            }
            catch (error)
            {
                setMessage('Error, Please Try Again.');
            }
        }
    }

    async function doLogin(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const obj = { email: loginEmail, password: loginPassword };
        const js = JSON.stringify(obj);

        try {
            const response = await fetch('http://159.203.135.123:5000/api/login', {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                setMessage('Server error. Please try again.');
            }

            const res = await response.json();

            if (res.success) {
                localStorage.setItem('user_data', JSON.stringify(res));
                setMessage('');
                window.location.href = '/carpage';
            } else {
                setMessage('Email/Password combination incorrect');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.toString());
            } else {
                alert('An unknown error occurred');
            }
        }
    }

    return (
       <div className="container">
            <form className="p-2 mx-auto" style={{ maxWidth: '400px' }} onSubmit={doLogin}>
                <h2 className="text mb-2">Please Log In</h2>

                {message && <div className="alert alert-danger">{message}</div>}

                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={handleEmailChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={handlePasswordChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Log In</button>
                </div>

                <div className="text-center mt-3">
                    <label>New User? </label>
                    <a href="/register" className="text-decoration-none"> Create An Account</a>
                </div>
                <div className="text-center mt-3">
                    <a onClick={forgotPassword} className="text-decoration-none"> Forgot Password</a>
                </div>
            </form>
       </div>
    );
}

export default LoginComp;
