import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Fetch the order details using the id
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                const orderData = {
                    id: response.data.id,
                    date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))).toLocaleDateString(),
                    deliveryDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30))).toLocaleDateString(),
                    status: ['Pending', 'Delivered'][Math.floor(Math.random() * 2)],
                    deliveryStatus: ['On Time', 'Overdue', 'Incomplete'][Math.floor(Math.random() * 3)],
                    items: [
                        { name: 'Item 1', quantity: 2, unitCost: 25.00 },
                        { name: 'Item 2', quantity: 1, unitCost: 50.00 },
                        { name: 'Item 3', quantity: 3, unitCost: 15.00 },
                    ],
                    totalPrice: 140.00,
                    vendor: {
                        name: 'John Doe',
                        contact: 'john.doe@example.com'
                    },
                    payment: {
                        method: 'Credit Card',
                        status: 'Paid',
                        transactionId: '123456789'
                    },
                };
                setOrder(orderData);
            })
            .catch(error => console.error('Error fetching order:', error));
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
            <h1 className='text-3xl mb-4 font-semibold text-center text-primary-dark'>Order Details</h1>
            <div className='border-b pb-4 mb-4'>
                <h2 className='text-xl font-semibold'>Order #{order.id}</h2>
                <p>Placement Date: {order.date}</p>
                <p>Delivery Date: {order.deliveryDate}</p>
                <p>Status: {order.status}</p>
                <p>Delivery Status: <span className={`font-semibold ${order.deliveryStatus === 'Overdue' ? 'text-red-600' : order.deliveryStatus === 'Incomplete' ? 'text-orange-600' : ''}`}>{order.deliveryStatus}</span></p>
            </div>
            <div className='border-b pb-4 mb-4'>
                <h2 className='text-xl font-semibold'>Vendor Information</h2>
                <p>Name: {order.vendor.name}</p>
                <p>Contact: {order.vendor.contact}</p>
            </div>
            <div className='border-b pb-4 mb-4'>
                <h2 className='text-xl font-semibold'>Payment Information</h2>
                <p>Method: {order.payment.method}</p>
                <p>Status: {order.payment.status}</p>
                <p>Transaction ID: {order.payment.transactionId}</p>
            </div>
            <div className='border-b pb-4 mb-4'>
                <h2 className='text-xl font-semibold'>Items</h2>
                <table className='w-full text-left border'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='p-2 border-r'>Item Name</th>
                            <th className='p-2 border-r'>Quantity</th>
                            <th className='p-2 border-r'>Unit Cost</th>
                            <th className='p-2'>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index} className='border-t'>
                                <td className='p-2 border-r'>{item.name}</td>
                                <td className='p-2 border-r'>{item.quantity}</td>
                                <td className='p-2 border-r'>${item.unitCost.toFixed(2)}</td>
                                <td className='p-2'>${(item.unitCost * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='text-right p-2'>
                    <h3 className='text-xl font-semibold'>Total: ${order.totalPrice.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
