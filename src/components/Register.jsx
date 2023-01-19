import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = {
                username: user,
                password: pass
            }
            axios.post("http://localhost:4000/api/register/", body)
            .then((res) => {
                const response = res.data;
                alert(response);
            })
            setUser('');
            setPass('');
          } catch (err) {
            alert('Error creating user');
          }
    }

  return (
    <div className='auth-container'>
        <form onSubmit={handleSubmit} className='register-form'>
            
        <h1 className='h1-text'>Register</h1>
        <br />

        <label htmlFor="user">Username</label>
        <input 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            type="user"  
            id='email' 
            name='email'/>

        <label htmlFor="password">Password</label>
        <input 
            value={pass}
            onChange={(e) => setPass(e.target.value)} 
            type="password" 
            id='password' 
            name='passsword'/>

        <button type='submit'>Register</button>
    </form>
    </div>
  )

}

export default Register