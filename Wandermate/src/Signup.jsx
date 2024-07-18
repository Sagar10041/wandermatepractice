import React from "react";
import {useState} from 'react';

const Signup =() => {

    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        password :'',

    })
    const handleChange =(e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,[name]:value
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted',formData)

    }

    return(
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="username" /> <br/>
        <input type="text" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="email@example.com" /> <br/>
        <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="password" /> <br/>
        <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default Signup;