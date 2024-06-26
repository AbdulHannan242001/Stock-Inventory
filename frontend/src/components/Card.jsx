import React from 'react'

const Card = ({ title, value, icon, num, svg }) => {
    return (
        <div className='w-3/12 shadow-lg bg-white rounded-lg py-3 px-12'>
            <div className='w-3/12 rounded-lg bg-secondary-dark p-2'>
                <img src={svg} alt="" className='h-[4vh] w-[4.5vh] mx-auto' />
            </div>
            <div className='w-full py-2'>
                <h3 className='text-lg text-neutral-mediumGray font-semibold'>{title}</h3>
                <h1 className='text-3xl font-bold'>{value}</h1>
            </div>
            <div className='w-full py-2 flex text-xs space-x-3 items-center'>
                <i className='text-secondary-dark text-lg'>{icon}</i>
                <p className='text-secondary-dark font-semibold'>{num}%</p>
                <p className='text-neutral-mediumGray font-semibold'>Than Last Month</p>
            </div>
        </div>
    )
}

export default Card