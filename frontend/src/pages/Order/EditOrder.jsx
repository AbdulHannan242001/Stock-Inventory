// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const EditOrder = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [order, setOrder] = useState({
//         id: '',
//         expectedDeliveryDate: '',
//         status: '',
//         vendorName: '',
//         contact: '',
//         paymentMethod: '',
//         paymentStatus: '',
//         items: [],
//     });

//     useEffect(() => {
//         axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
//             .then(response => {
//                 const orderData = response.data;
//                 setOrder({
//                     id: orderData.id,
//                     date: orderData.date,
//                     deliveryDate: orderData.deliveryDate,
//                     status: orderData.status,
//                     items: orderData.items,
//                     totalPrice: orderData.totalPrice
//                 });
//             })
//             .catch(error => console.error('Error fetching order:', error));
//     }, [id]);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setOrder(prevOrder => ({
//             ...prevOrder,
//             [name]: value
//         }));
//     };

//     const [items, setItems] = useState([{ name: '', quantity: 1, unitCost: 0 }]);
//     const addItem = () => {
//         setItems([...items, { name: '', quantity: 1, unitCost: 0 }]);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Update the order using an API call
//         axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, order)
//             .then(response => {
//                 console.log('Order updated successfully:', response.data);
//                 // Redirect to the order list page or the updated order detail page
//                 navigate.push('/orders');
//             })
//             .catch(error => console.error('Error updating order:', error));
//     };

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
//             <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="VendorName" className="block text-sm font-medium text-gray-700">Vendor Name:</label>
//                     <input type="text" id="VendorName" name="VendorName" value={order.vendorName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="VendorContact" className="block text-sm font-medium text-gray-700">Vendor Contact:</label>
//                     <input type="text" id="VendorContact" name="VendorContact" value={order.VendorContact} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="PayMethod" className="block text-sm font-medium text-gray-700">Pay Method:</label>
//                     <input type="text" id="PayMethod" name="PayMethod" value={order.PayMethod} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="PayStatus" className="block text-sm font-medium text-gray-700">Pay Status:</label>
//                     <input type="text" id="PayStatus" name="PayStatus" value={order.PayStatus} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="ExpectedDeliveryDate" className="block text-sm font-medium text-gray-700">Expected Delivery Date:</label>
//                     <input type="text" id="ExpectedDeliveryDate" name="ExpectedDeliveryDate" value={order.expectedDeliveryDate} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
//                 </div>
//                 <div className="mb-4">
//                     <h2 className='text-xl font-semibold'>Items</h2>
//                     {order.items && order.items.length !== 0
//                         &&
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th className='p-2'>Item Name</th>
//                                     <th className='p-2'>Quantity</th>
//                                     <th className='p-2'>Unit Cost</th>
//                                     <th className='p-2'></th>
//                                 </tr>
//                             </thead>
//                             <tbody className='items-center mb-2'>
//                                 {order.items.map((item, index) => (
//                                     <tr key={index}>
//                                         <td className='py-2'>
//                                             <input
//                                                 type='text'
//                                                 placeholder='Item Name'
//                                                 className='mr-2 p-2 border rounded'
//                                                 value={item.name}
//                                                 onChange={(e) => handleChange(index, 'name', e.target.value)}
//                                             />
//                                         </td>
//                                         <td className='py-2'>
//                                             <input
//                                                 type='number'
//                                                 placeholder='Quantity'
//                                                 className='mr-2 p-2 border rounded'
//                                                 value={item.quantity}
//                                                 onChange={(e) => handleChange(index, 'quantity', e.target.value)}
//                                             />
//                                         </td>
//                                         <td className='py-2'>
//                                             <input
//                                                 type='number'
//                                                 placeholder='Unit Cost'
//                                                 className='mr-2 p-2 border rounded'
//                                                 value={item.unitCost}
//                                                 onChange={(e) => handleChange(index, 'unitCost', e.target.value)}
//                                             />
//                                         </td>
//                                         <td className='py-2'>
//                                             <button
//                                                 className='bg-red-500 text-white p-2 rounded'
//                                                 onClick={() => removeItem(index)}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     }
//                     <button
//                         className='bg-blue-500 text-white mt-4 p-2 rounded'
//                         onClick={addItem}
//                     >
//                         Add Item
//                     </button>
//                 </div>
//                 <div className='flex items-center justify-between'>
//                     <button
//                         type='submit'
//                         className='bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//                     >
//                         Save
//                     </button>
//                     <button
//                         type='button'
//                         onClick={() => navigate('/orders')}
//                         className='bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default EditOrder;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        id: '',
        expectedDeliveryDate: '',
        status: '',
        vendorName: '',
        contact: '',
        paymentMethod: '',
        paymentStatus: '',
        items: [],
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
                    items: orderData.items || [],
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

    const handleItemChange = (index, field, value) => {
        const updatedItems = order.items.map((item, i) => (
            i === index ? { ...item, [field]: value } : item
        ));
        setOrder(prevOrder => ({
            ...prevOrder,
            items: updatedItems
        }));
    };

    const addItem = () => {
        setOrder(prevOrder => ({
            ...prevOrder,
            items: [...prevOrder.items, { name: '', quantity: 1, unitCost: 0 }]
        }));
    };

    const removeItem = (index) => {
        const updatedItems = order.items.filter((_, i) => i !== index);
        setOrder(prevOrder => ({
            ...prevOrder,
            items: updatedItems
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, order)
            .then(response => {
                console.log('Order updated successfully:', response.data);
                navigate('/orders');
            })
            .catch(error => console.error('Error updating order:', error));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name:</label>
                    <input type="text" id="vendorName" name="vendorName" value={order.vendorName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Vendor Contact:</label>
                    <input type="text" id="contact" name="contact" value={order.contact} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method:</label>
                    <input type="text" id="paymentMethod" name="paymentMethod" value={order.paymentMethod} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">Payment Status:</label>
                    <input type="text" id="paymentStatus" name="paymentStatus" value={order.paymentStatus} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">Expected Delivery Date:</label>
                    <input type="text" id="expectedDeliveryDate" name="expectedDeliveryDate" value={order.expectedDeliveryDate} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <h2 className='text-xl font-semibold'>Items</h2>
                    {order.items && order.items.length !== 0
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
                                {order.items.map((item, index) => (
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
                                                type='button'
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
                        type='button'
                        className='bg-blue-500 text-white mt-4 p-2 rounded'
                        onClick={addItem}
                    >
                        Add Item
                    </button>
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
