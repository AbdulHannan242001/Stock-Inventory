import React, { useState } from 'react';

const Dropdown = ({ onSelect }) => {
    const options = [
        '1 month', '2 months', '3 months', '4 months', '5 months', '6 months',
        '7 months', '8 months', '9 months', '10 months', '11 months', '12 months',
        '1 year', '1.5 years', '2 years'
    ];

    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    return (
        <select onChange={handleChange} className='p-2 border rounded'>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default Dropdown;
