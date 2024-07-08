import React, { useContext, useState } from 'react'
import Button from '../../components/Button'
import inv from '../../assets/inventory.jpg'
import UserContext from '../../context/UserContext/userContext'
import { useNavigate } from 'react-router-dom'

const Login = ({ authUser }) => {
    const context = useContext(UserContext);
    const { login, loading } = context;
    const Navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = data;
        
        await login(email, password);
    }
    return (
        <div className='w-full h-screen flex items-center bg-secondary'>
            <div className='mx-auto w-5/6 md:w-2/6 h-[90vh] bg-neutral-white border shadow-xl content-center rounded'>
                <h1 className='text-center text-2xl font-semibold text-primary'>Login</h1>
                <p className='text-center py-3'>Enter your credentials</p>
                <form className='p-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3 w-full md:w-1/2 mx-auto'>
                        <label className='font-semibold'>Email</label>
                        <input type="email" name='email' onChange={handleChange} className='border border-primary-light p-2' />
                        <label className='font-semibold'>Password</label>
                        <input type="password" name='password' onChange={handleChange} className='border border-primary-light p-2' />
                    </div>
                    <div className='text-center py-6'>
                        <Button title={"Login"} />
                    </div>
                </form>
            </div>
            <div className='hidden md:block relative w-3/6 h-screen overflow-hidden'>
                <img src={inv} className='w-full h-auto object-cover' alt="Your Alt Text" />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </div>
        </div>
    )
}

export default Login