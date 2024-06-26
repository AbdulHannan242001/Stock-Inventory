import React from 'react'

const Button = ({ title }) => {
    return (
        <button class="bg-primary text-neutral-white hover:bg-primary-light px-4 py-2 rounded">
            {title}
        </button>
    )
}

export default Button