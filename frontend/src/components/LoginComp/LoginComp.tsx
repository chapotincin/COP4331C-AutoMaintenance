import "./LoginComp.css";
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
                return;
            }

            const res = await response.json();

            if (!res.id) {
                setMessage('Email/Password combination incorrect');
            } else {
                localStorage.setItem('user_data', JSON.stringify(res));
                setMessage('');
                window.location.href = '/carpage';
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
        <form onSubmit={doLogin} id="login-div">
            <label>Email</label>
            <input
                type="text"
                placeholder="Email"
                value={loginEmail}
                onChange={handleEmailChange}
                required
            />

            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={handlePasswordChange}
                required
            />

            <button type="submit" className="buttons">Login</button>

            {message && <p style={{ color: "red" }}>{message}</p>}

            <label>New User? </label>
            <a href="/register">Create An Account</a>
        </form>
    );
}

export default LoginComp;
