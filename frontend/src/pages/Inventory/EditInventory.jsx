import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InventoryContext from '../../context/InventoryContext/inventoryContext';

const EditInventory = () => {
    const context = useContext(InventoryContext);
    const { inventoryData, editInventory } = context;
    const { id } = useParams();
    const findData = inventoryData.find(inventory => (inventory._id).toString() === (id.toString()));
    const navigate = useNavigate();
    const [inventory, setInventory] = useState({
        name: '',
        quantity: 0,
        price: 0,
        category: '',
        lowStockThreshold: 0
    });

    useEffect(() => {
        if (findData) {
            setInventory({
                name: findData.name,
                quantity: findData.quantity,
                price: findData.price,
                category: findData.category,
                lowStockThreshold: findData.lowStockThreshold
            })
        }
    }, [id, findData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editInventory(id, inventory);
        navigate('/inv');
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
                        value={id}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        disabled
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
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
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='Category'>Category</label>
                    <input
                        type='text'
                        name='category'
                        id='Category'
                        value={inventory.category}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
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
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lowStockThreshold'>Low Stock</label>
                    <input
                        type='text'
                        name='lowStockThreshold'
                        id='lowStockThreshold'
                        value={inventory.lowStockThreshold}
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
