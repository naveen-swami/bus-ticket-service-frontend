// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { makeAxiosRequest } from '../../utils/helper';

function LoginForm() {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const url = `http://localhost:3000/api/users/login`;
            const headers = {
                Connection: 'Keep-alive',
                'Content-Type': 'application/json'
            };

            let options = {
                method: 'POST',
                url: url,
                headers
            };
            const response = await makeAxiosRequest(options, user);
            console.log(response);
            localStorage.setItem('x-access_token', response.token);

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={user.email} onChange={handleInputChange} placeholder="Email" />
                <input type="password" name="password" value={user.password} onChange={handleInputChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
