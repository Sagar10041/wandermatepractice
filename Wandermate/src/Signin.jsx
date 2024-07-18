import React from "react";
import { useState } from "react";

const Signin = () => {

    const [formData, setFormData] = useState({

        username :'',
        password :''

    })

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log('submitted',formData)
    }

    const handleChange =(e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value

            });
    }

    return(
        <>
        <form onSubmit={handleSubmit}> 
            <label >Uername</label><br/>
            <input type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChange} /><br/>
            <label >Password</label><br/>
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/><br/>
            <button className="bg-blue-400" type="submit"> Submit</button>
        </form>

        </>
    )
}

export default Signin;
