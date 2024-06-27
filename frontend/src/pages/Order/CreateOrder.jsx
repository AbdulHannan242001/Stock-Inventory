import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CreateForm from '../../components/CreateForm';

const CreateOrder = () => {
    const [order, setOrder] = useState({
        orderId: '',
        date: '',
        deliveryDate: '',
        status: 'Pending',
        deliveryStatus: 'On Time',
        vendorName: '',
        contact: '',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        transactionId: '',
        shippingMethod: 'Standard Shipping',
        trackingNumber: '',
        carrier: 'UPS',
        estimatedDelivery: '',
        notes: '',
        items: [],
        totalPrice: 0,
    });

    const [items, setItems] = useState([{ name: '', quantity: 1, unitCost: 0 }]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const orderId = uuidv4();
        setOrder((prevOrder) => ({ ...prevOrder, orderId }));
    }, []);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);

        const totalPrice = newItems.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
        setOrder((prevOrder) => ({ ...prevOrder, items: newItems, totalPrice }));
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 1, unitCost: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);

        const totalPrice = newItems.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
        setOrder((prevOrder) => ({ ...prevOrder, items: newItems, totalPrice }));
    };

    const handleSubmit = (formData) => {
        axios.post('/orders', formData)
            .then((response) => {
                // Handle success response
            })
            .catch((error) => {
                // Handle error response
            });
    };

    const orderFormFields = [
        { name: 'vendorName', label: 'Vendor Name', type: 'text', initialValue: order.vendorName },
        { name: 'contact', label: 'Contact', type: 'email', initialValue: order.contact },
        { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash On Delivery'], initialValue: order.paymentMethod },
        { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Paid', 'Pending'], initialValue: order.paymentStatus },
        { name: 'estimatedDelivery', label: 'Expected Delivery', type: 'date', initialValue: order.estimatedDelivery },
    ];

    return (
        <div className='w-full'>
            <CreateForm formTitle="New Order" formFields={orderFormFields} onSubmit={handleSubmit} />
            <div className='mt-4'>
                <h2 className='text-xl font-semibold'>Items</h2>
                {items.length !== 0
                    &&
                    <table>
                        <thead>
                            <tr>
                                <th className='p-2'>Item Name</th>
                                <th className='p-2'>Quantity</th>
                                <th className='p-2'>Unit Cost</th>
                                <th className='p-2'></th>
                            </tr>
                        </thead>
                        <tbody className='items-center mb-2'>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-2'>
                                        <input
                                            type='text'
                                            placeholder='Item Name'
                                            className='mr-2 p-2 border rounded'
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                        />
                                    </td>
                                    <td className='py-2'>
                                        <input
                                            type='number'
                                            placeholder='Quantity'
                                            className='mr-2 p-2 border rounded'
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td className='py-2'>
                                        <input
                                            type='number'
                                            placeholder='Unit Cost'
                                            className='mr-2 p-2 border rounded'
                                            value={item.unitCost}
                                            onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                                        />
                                    </td>
                                    <td className='py-2'>
                                        <button
                                            className='bg-red-500 text-white p-2 rounded'
                                            onClick={() => removeItem(index)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <button
                    className='bg-blue-500 text-white mt-4 p-2 rounded'
                    onClick={addItem}
                >
                    Add Item
                </button>
                <div className='text-right mt-4'>
                    <h3 className='text-xl font-semibold'>Total: ${order.totalPrice.toFixed(2)}</h3>
                </div>
            </div>
        </div >
    );
};

export default CreateOrder;
