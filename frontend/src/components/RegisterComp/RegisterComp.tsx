import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterComp() {
    const [message, setMessage] = useState('');
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

    async function doRegister(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        const { email, firstName, lastName, password, passwordRepeat } = formData;
        if (!email || !firstName || !lastName || !password || !passwordRepeat) {
            setMessage('All fields are required');
            return;
        }

        if (password !== passwordRepeat) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://159.203.135.123:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('');
                window.location.href = '/emailverify';
            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch {
            setMessage('Error registering, try again.');
        }
    };

    return (
        <div className="container mt-2">
            <form className="p-2 mx-auto" style={{ maxWidth: '400px' }} onSubmit={doRegister}>
                <h2 className="text mb-2">Create an Account</h2>

                {message && <div className="alert alert-danger">{message}</div>}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordRepeat" className="form-label">Repeat Password</label>
                    <input
                        type="password"
                        id="passwordRepeat"
                        className="form-control"
                        placeholder="Repeat Password"
                        value={formData.passwordRepeat}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>

                <div className="text-center mt-3">
                    <label>Already have an account?</label>
                    <a href="/login" className="text-decoration-none"> Log In</a>
                </div>
            </form>
        </div>
    );
}

export default RegisterComp;
