import React, { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {

        e.preventDefault()

        setPass('')
        setUser('')
    }


  return (
    
    <div className='auth-container'>
    <form onSubmit={handleSubmit} className='login-form' >

        <h1 className='h1-text'>Login</h1>
        <br />

        <label htmlFor="user" >Username</label>
        <input 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            type="user"  
            id='email' 
            name='email'/>

        <label htmlFor="password" className='pass'>Password</label>
        <input 
            value={pass}
            onChange={(e) => setPass(e.target.value)} 
            type="password" 
            id='password' 
            name='passsword'/>

        <button type='submit'>Login</button>
    </form>
    </div>   
  )
}

export default Login;