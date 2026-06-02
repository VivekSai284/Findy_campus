import React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate()

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const resp = await axios.post('http://localhost:5000/auth/register', registerData)
            toast.success(resp.data.message)

            navigate('/login')
        }catch(error){
            toast.error(error.response.data.message)
        }

        setRegisterData({
            username: '',
            email: '',
            password: ''
        })

        
    }

  return (
    <div className='RegisterForm'>
        <h1 className='Register'>Register</h1>

        <form className='Form' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Username'
                required
                value={registerData.username}
                onChange={(e) => {setRegisterData({
                        ...registerData,
                        username: e.target.value
                    })
                }}
            />

            <input
                type='email'
                placeholder='Email'
                required
                value={registerData.email}
                onChange={(e) => {setRegisterData({
                        ...registerData,
                        email: e.target.value
                    })
                }}
            />

            <input
                type='password'
                placeholder='Password'
                required
                value={registerData.password}
                onChange={(e) => {setRegisterData({
                        ...registerData,
                        password: e.target.value
                    })
                }}
            />

            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register