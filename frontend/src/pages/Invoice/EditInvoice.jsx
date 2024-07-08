import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceContext from '../../context/InvoiceContext/invoiceContext';
import { toast } from 'react-hot-toast';

const EditInvoice = () => {
    const context = useContext(InvoiceContext);
    const { editInvoice, invoice } = context;
    const { id } = useParams();
    const navigate = useNavigate();
    const [fixedData, setFixedData] = useState({});
    const [bool, setBool] = useState(false);
    const [invoiceData, setInvoiceData] = useState({
        customer: '',
        amount: '',
        paid: '',
        status: '',
        items: []
    });
    const [loading, setLoading] = useState(true);

    const totalPrice = invoiceData.items.reduce((total, item) => total + item.unitCost * item.quantity, 0);

    useEffect(() => {
        setInvoiceData((prevInvoice) => ({
            ...prevInvoice,
            amount: invoiceData.items.reduce((total, item) => total + item.unitCost * item.quantity, 0),
        }));
    }, [totalPrice])

    const status = invoiceData && invoiceData.status;

    useEffect(() => {
        if (status === 'Paid') {
            setBool(true);
            setInvoiceData((prevInvoice) => ({
                ...prevInvoice,
                paid: invoiceData.items.reduce((total, item) => total + item.unitCost * item.quantity, 0),
            }));
        } else if (status === 'Unpaid') {
            setBool(true);
            setInvoiceData((prevInvoice) => ({
                ...prevInvoice,
                paid: 0,
            }))
        } else {
            setBool(false);
            setInvoiceData((prevInvoice) => ({
                ...prevInvoice,
                paid: fixedData.paid,
            }));
        }
    }, [status]);

    useEffect(() => {
        const invoiceData = invoice && invoice.find(invoice => (invoice._id).toString() === (id).toString());
        setFixedData(invoiceData);
        if (invoiceData) {
            setInvoiceData({
                customer: invoiceData.customer,
                amount: invoiceData.amount,
                paid: invoiceData.paid,
                status: invoiceData.status,
                items: invoiceData.items
            });
            setLoading(false);
        } else {
            setLoading(false);
            console.error('Invoice not found');
        }
    }, [id, invoice]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...invoice.items];
        items[index][name] = value;
        setInvoiceData(prevState => ({
            ...prevState,
            items
        }));
    };

    const checkData = (invoiceData) => {
        const { customer, status, items } = invoiceData;
        if (!customer) {
            toast.error('Please enter customer name');
            return false;
        } else if (!status) {
            toast.error('Please select status');
            return false;
        } else if (!typeof items === 'object') {
            toast.error('Please add at least one item');
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = checkData(invoiceData);
        if (!isValid) {
            toast.error('Please fill all the fields');
            return;
        }
        editInvoice(id, invoiceData);
        setInvoiceData({ customer: '', amount: 0, paid: 0, status: '', items: [] });
        navigate(`/invoices`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!invoice) {
        return <div>Invoice not found</div>;
    }

    const formatDate = (date) => {
        const newDate = (date).toString().substring(0, 10);
        const splitDate = newDate.split('-');
        const [yyyy, mm, dd] = splitDate;
        return `${mm}/${dd}/${yyyy}`
    }
    const addItem = () => {
        setInvoiceData(prevInvoice => ({
            ...prevInvoice,
            items: [...prevInvoice.items, { name: '', quantity: 1, unitCost: 0 }]
        }));
    };

    const removeItem = (itemId, index) => {
        if (itemId) {
            setInvoiceData(invoiceData => ({
                ...invoiceData,
                items: invoiceData.items.filter(item => (item._id).toString() !== (itemId).toString())
            }));
        } else {
            const newItems = invoiceData.items.filter((_, i) => i !== index);
            setInvoiceData(({ ...invoiceData, items: newItems }));
        }
    };


    return (
        <div className='p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto'>
            <h1 className='text-2xl font-semibold text-center mb-4'>Edit Invoice</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='invoiceNumber'>Invoice Number</label>
                    <input
                        type='text'
                        name='invoiceNumber'
                        id='invoiceNumber'
                        value={fixedData ? fixedData.invoiceNumber : ''}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        disabled
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='date'>Invoice Generated</label>
                    <input
                        type='text'
                        name='date'
                        id='date'
                        value={fixedData ? formatDate(fixedData.createdAt) : ''}
                        disabled
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='customer'>Customer</label>
                    <input
                        type='text'
                        name='customer'
                        id='customer'
                        value={invoiceData.customer || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='amount'>Amount</label>
                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        value={invoiceData.amount || ''}
                        disabled
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='status'>Status</label>
                    <select
                        name='status'
                        id='status'
                        value={invoiceData.status || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    >
                        <option value='Paid'>Paid</option>
                        <option value='Unpaid'>Unpaid</option>
                        <option value='Due'>Due</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='paid'>Paid</label>
                    <input
                        type='number'
                        name='paid'
                        id='paid'
                        value={invoiceData.paid || 0}
                        onChange={handleChange}
                        disabled={bool}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className="mb-4">
                    <h2 className='text-xl font-semibold'>Items</h2>
                    {invoiceData.items && invoiceData.items.length !== 0
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
                                {invoiceData && invoiceData.items.map((item, index) => (
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
                                                onClick={() => removeItem(item._id, index, name)}
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
                {/* {invoiceData && invoiceData.items.map((item, index) => (
                    <div key={index} className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={`name${index}`}>Product</label>
                        <input
                            type='text'
                            name='name'
                            id={`name${index}`}
                            value={item.name}
                            onChange={e => handleItemChange(index, e)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={`quantity${index}`}>Quantity</label>
                        <input
                            type='number'
                            name='quantity'
                            id={`quantity${index}`}
                            value={item.quantity}
                            onChange={e => handleItemChange(index, e)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={`unitCost${index}`}>Unit Price</label>
                        <input
                            type='number'
                            name='unitCost'
                            id={`unitCost${index}`}
                            value={item.unitCost}
                            onChange={e => handleItemChange(index, e)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                ))} */}
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Save
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate('/invoices')}
                        className='bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInvoice;
