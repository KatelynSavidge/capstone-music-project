import React, { useState } from 'react'

const Register = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setUser('')
        setPass('')
        setName('')
    }

  return (
    <div className='auth-container'>
        <form onSubmit={handleSubmit} className='register-form'>
            
        <h1 className='h1-text'>Register</h1>
        <br />

        <label htmlFor="">Full Name</label>
        <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            name='name' 
            id='name'/>

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