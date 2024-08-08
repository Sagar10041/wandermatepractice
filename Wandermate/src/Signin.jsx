import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios`

const Signin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5236/api/login', formData, {
                withCredentials: true // Ensures cookies are sent with the request
            });

            // Handle successful login
            console.log('Login successful:', response.data);
            setSuccess('Login successful');
            setError(''); // Clear any previous errors

            // Redirect or perform additional actions
        } catch (err) {
            // Handle login error
            console.error('Login error:', err.response ? err.response.data : err.message);
            setError('Login failed: ' + (err.response ? err.response.data : err.message));
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
                <input type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChange} /><br/>
                <label>Password</label><br/>
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} /><br/>
                <button className="bg-blue-400" type="submit">Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </>
    );
}

export default Signin;
