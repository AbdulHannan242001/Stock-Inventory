import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OrderContext from '../../context/OrderContext/orderContext';

const ViewOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const context = useContext(OrderContext);
    const { orderList } = context;
    useEffect(() => {
        const fetchOrder = orderList.find(order => (order._id).toString() === (id).toString());
        setOrder(fetchOrder)
    }, [id, orderList]);

    const formatDate = (date) => {
        const newDate = (date).toString().substring(0, 10);
        const splitDate = newDate.split('-');
        const [yyyy, mm, dd] = splitDate;
        return `${dd}-${mm}-${yyyy}`
    }

    const totalPrice = order && order.items.reduce((total, item) => total + item.unitCost * item.quantity, 0);

    return (
        order ? (
            <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl mb-4 font-semibold text-center text-primary-dark'>Order Details</h1>

                <div className='border-b pb-4 mb-4'>
                    <h2 className='text-xl font-semibold'>Order #{order.orderId}</h2>
                    <p>Placement Date: {formatDate(order.createdAt)}</p>
                    <p>Delivery Date: {order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}</p>
                    <p>Status: {order.status}</p>
                    <p>Delivery Status: <span className={`font-semibold ${order.deliveryStatus === 'Overdue' ? 'text-red-600' : order.deliveryStatus === 'Incomplete' ? 'text-orange-600' : ''}`}>{order.deliveryStatus ? order.deliveryStatus : 'N/A'}</span></p>
                </div>

                <div className='border-b pb-4 mb-4'>
                    <h2 className='text-xl font-semibold'>Vendor Information</h2>
                    <p>Name: {order.vendorName}</p>
                    <p>Contact: {order.contact}</p>
                </div>

                <div className='border-b pb-4 mb-4'>
                    <h2 className='text-xl font-semibold'>Payment Information</h2>
                    <p>Method: {order.payMethod}</p>
                    <p>Status: {order.payStatus}</p>
                    <p>Transaction ID: {order.transactionId ? order.transactionId : 'N/A'}</p>
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
                        <h3 className='text-xl font-semibold'>Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        ) : (
            <p className='text-center text-3xl font-semibold mt-4'>No Order Found</p>
        )
    );
};

export default ViewOrder;
