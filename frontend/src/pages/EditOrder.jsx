import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        id: '',
        date: '',
        deliveryDate: '',
        status: '',
        items: '',
        totalPrice: ''
    });

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                const orderData = response.data;
                setOrder({
                    id: orderData.id,
                    date: orderData.date,
                    deliveryDate: orderData.deliveryDate,
                    status: orderData.status,
                    items: orderData.items,
                    totalPrice: orderData.totalPrice
                });
            })
            .catch(error => console.error('Error fetching order:', error));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update the order using an API call
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, order)
            .then(response => {
                console.log('Order updated successfully:', response.data);
                // Redirect to the order list page or the updated order detail page
                navigate.push('/orders');
            })
            .catch(error => console.error('Error updating order:', error));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                    <input type="text" id="date" name="date" value={order.date} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Delivery Date:</label>
                    <input type="text" id="deliveryDate" name="deliveryDate" value={order.deliveryDate} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <input type="text" id="status" name="status" value={order.status} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="items" className="block text-sm font-medium text-gray-700">Items:</label>
                    <input type="text" id="items" name="items" value={order.items} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price:</label>
                    <input type="text" id="totalPrice" name="totalPrice" value={order.totalPrice} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
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
                        onClick={() => navigate('/orders')}
                        className='bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditOrder;
