import React, { useState } from "react";
import axios from "axios"; 

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5236/api/users', formData, {
                withCredentials: true 
            });

            // Handle successful signup
            console.log('Signup successful:', response.data);
            setSuccess('Signup successful');
            setError(''); 

            // Redirect or perform additional actions
        } catch (err) {
            // Handle signup error
            console.error('Signup error:', err.response ? err.response.data : err.message);
            setError('Signup failed: ' + (err.response ? err.response.data : err.message));
            setSuccess('');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username</label><br/>
                <input
                    type="text"
                    placeholder="Username"
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                /><br/>
                <label>Email</label><br/>
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                /><br/>
                <label>Password</label><br/>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                /><br/>
                <label>Confirm Password</label><br/>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                /><br/>
                <button className="bg-blue-400" type="submit">Sign Up</button>
            </form>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </>
    );
}

export default Signup;
