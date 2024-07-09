import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OrderContext from '../../context/OrderContext/orderContext';
import { TiMinus } from "react-icons/ti";
import InventoryContext from '../../context/InventoryContext/inventoryContext';

const EditOrder = () => {
    const invContext = useContext(InventoryContext);
    const { addInventory } = invContext;
    const context = useContext(OrderContext);
    const { orderList, editOrder, deleteOrderItem } = context;
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState({
        id: '',
        status: "",
        deliveryStatus: "",
        vendorName: "",
        contact: "",
        payMethod: "",
        payStatus: "",
        expectedDelivery: "",
        transactionId: "",
        items: []
    });

    const checkDateForStatus = (date, status) => {
        const newDate = new Date(date);
        const currentDate = new Date();
        if (status) return status;
        if ((currentDate > newDate)) {
            return 'Overdue';
        } else {
            return "Not Delivered";
        }
    };

    useEffect(() => {
        if (id) {
            const order = orderList.find(order => (order._id).toString() === (id).toString());
            if (order) {
                setOrder({
                    id: id,
                    status: order.status,
                    deliveryStatus: order.deliveryStatus,
                    vendorName: order.vendorName,
                    contact: order.contact,
                    payMethod: order.payMethod,
                    payStatus: order.payStatus,
                    expectedDelivery: formatDate(order.expectedDelivery),
                    transactionId: order.transactionId,
                    items: order.items
                });
                setOrderId(order.orderId);
            }
        }
    }, [id, orderList]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'expectedDelivery') {
            const expectedDeliveryDate = formatDate(value);
            setOrder(prevOrder => ({
                ...prevOrder,
                [name]: expectedDeliveryDate
            }));
        } else {
            setOrder(prevOrder => ({
                ...prevOrder,
                [name]: value
            }));
        }
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
            items: [...prevOrder.items, { name: '', quantity: 1, unitCost: 0, category: '', bool: false }]
        }));
    };

    const removeItem = (identifier) => {
        setOrder(prevOrder => {
            if (typeof identifier === 'number') {
                return {
                    ...prevOrder,
                    items: prevOrder.items.filter((_, index) => index !== identifier)
                };
            } else {
                return {
                    ...prevOrder,
                    items: prevOrder.items.filter(item => item._id && item._id.toString() !== identifier.toString())
                };
            }
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { id, status, deliveryStatus, vendorName, contact, payMethod, payStatus, expectedDelivery, transactionId, items } = order;
        const newDeliveryStatus = checkDateForStatus(expectedDelivery, deliveryStatus);
        await editOrder(id, status, newDeliveryStatus, vendorName, contact, payMethod, payStatus, expectedDelivery, transactionId, items);
        if (status === "Delivered") {
            items.forEach(async (item) => {
                if (item.bool === true || item.bool === "true") {
                    const formData = {
                        name: item.name,
                        quantity: item.quantity,
                        unitCost: item.unitCost,
                        price: item.unitCost * item.quantity,
                        category: item.category,
                        lowStockThreshold: item.lowStockThreshold ? item.lowStockThreshold : 5
                    }
                    await addInventory(formData, "Added");
                }
            });
        }
        navigate('/orders');
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="vendorName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Order Id:
                    </label>
                    <input
                        type="text"
                        id='orderId'
                        value={orderId}
                        disabled
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={order.status}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="vendorName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Vendor Name:
                    </label>
                    <input
                        type="text"
                        id="vendorName"
                        name="vendorName"
                        value={order.vendorName}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Vendor Contact:
                    </label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={order.contact}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="payMethod"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Payment Method:
                    </label>
                    <select
                        id="payMethod"
                        name="payMethod"
                        value={order.payMethod}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value="COD">Cash on Delivery - COD</option>
                        <option value="Bank Transfer">Bank to Bank - Bank Transfer</option>
                        <option value="E Transfer">Electronic Transfer - E Transfer</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="payStatus" className="block text-sm font-medium text-gray-700">Payment Status:</label>
                    <select
                        id="payStatus"
                        name="payStatus"
                        value={order.payStatus}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction Id:</label>
                    <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        placeholder='Transaction Id'
                        value={order.transactionId}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="expectedDelivery" className="block text-sm font-medium text-gray-700">Expected Delivery Date:</label>
                    <input
                        type="date"
                        id="expectedDelivery"
                        name="expectedDelivery"
                        value={order.expectedDelivery ? formatDate(order.expectedDelivery) : ''}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="deliveryStatus"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Delivery Status:
                    </label>
                    <select
                        id="deliveryStatus"
                        name="deliveryStatus"
                        value={order.deliveryStatus}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value=" ">Change Delivery Status</option>
                        <option value="On Time">On Time</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Items:</h3>
                    {order.items.map((item, index) => (
                        <div key={index} className="mb-4 border rounded-lg p-4">
                            <div className="mb-2">
                                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    id={`name-${index}`}
                                    name={`name-${index}`}
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    id={`quantity-${index}`}
                                    name={`quantity-${index}`}
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`unitCost-${index}`} className="block text-sm font-medium text-gray-700">Unit Cost:</label>
                                <input
                                    type="number"
                                    id={`unitCost-${index}`}
                                    name={`unitCost-${index}`}
                                    value={item.unitCost}
                                    onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`category-${index}`} className="block text-sm font-medium text-gray-700">Category:</label>
                                <input
                                    type="text"
                                    id={`category-${index}`}
                                    name={`category-${index}`}
                                    value={item.category}
                                    onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor={`bool-${index}`} className="block text-sm font-medium text-gray-700">Inventory:</label>
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        id={`bool-${index}`}
                                        name={`bool-${index}`}
                                        checked={item.bool}
                                        onChange={(e) => handleItemChange(index, 'bool', e.target.checked)}
                                        className="mt-1 p-2"
                                    />
                                    <span> - Add To Inventory</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(item._id || index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <TiMinus size={24} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItem}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Add Item
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md"
                >
                    Save Order
                </button>
            </form>
        </div>
    );
};

export default EditOrder;
