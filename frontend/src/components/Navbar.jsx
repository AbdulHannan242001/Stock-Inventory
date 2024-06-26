import React, { useState } from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import Notification from './Notification';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className='px-5 bg-white py-2 flex w-12/12 border items-center'>
                <h className='text-primary font-bold w-4/12 px-10'>Dashboard Preview</h>
                <div className='text-primary font-bold w-8/12 flex justify-end'>
                    <div className='w-[5vh] h-[5vh] mx-3 border border-secondary rounded-full cursor-pointer' onClick={handleClick}>

                    </div>
                    <div className='w-2/12 flex items-center'>
                        <button className='border-l-2 border-secondary pl-2'>Logout</button>
                        <i className='pl-2 font-bold text-xl'> <AiOutlineLogout /> </i>
                    </div>
                </div>
            </div>
            <div className={`${open ? 'block' : 'hidden'}`}>
                <Notification />
            </div>
        </>
    )
}

export default Navbar