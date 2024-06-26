import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditInventory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inventory, setInventory] = useState({
        id: '',
        name: '',
        quantity: '',
        price: '',
        category: '',
    });

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                const inventoryData = {
                    id: response.data.id,
                    name: `item ${response.data.id}`,
                    price: response.data.price,
                    category: response.data.category,
                    // Add more properties as needed
                };
                setInventory(inventoryData);
            })
            .catch(error => console.error('Error fetching inventory:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the updated inventory data to the server
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, inventory)
            .then(response => {
                console.log('inventory updated:', response.data);
                navigate(`/inventorys`);
            })
            .catch(error => console.error('Error updating inventory:', error));
    };

    return (
        <div className='p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto'>
            <h1 className='text-2xl font-semibold text-center mb-4'>Edit inventory</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='id'>Item ID</label>
                    <input
                        type='text'
                        name='id'
                        id='id'
                        value={inventory.id}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        disabled
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Name'>Name</label>
                    <input
                        type='text'
                        name='Name'
                        id='Name'
                        value={inventory.name}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Price</label>
                    <input
                        type='text'
                        name='price'
                        id='price'
                        value={inventory.price}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Category'>Status</label>
                    <select
                        name='Category'
                        id='Category'
                        value={inventory.category}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    >
                        <option value='Electronics'>Electronics</option>
                        <option value='Clothing'>Clothing</option>
                        <option value='Furniture'>Furniture</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='quantity'>Quantity</label>
                    <input
                        type='text'
                        name='quantity'
                        id='quantity'
                        value={inventory.quantity}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Save
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate('/inv')}
                        className='bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInventory;
