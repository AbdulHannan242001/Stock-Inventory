import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InvoiceContext } from './InvoiceContext';

const EditInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getInvoiceById, updateInvoice } = useContext(InvoiceContext);
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const invoiceData = getInvoiceById(id);
        if (invoiceData) {
            setInvoice(invoiceData);
            setLoading(false);
        } else {
            setLoading(false);
            console.error('Invoice not found');
        }
    }, [id, getInvoiceById]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...invoice.items];
        items[index][name] = value;
        setInvoice(prevState => ({
            ...prevState,
            items
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateInvoice(invoice);
        navigate(`/invoices`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!invoice) {
        return <div>Invoice not found</div>;
    }

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
                        value={invoice.invoiceNumber}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        disabled
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='date'>Date</label>
                    <input
                        type='text'
                        name='date'
                        id='date'
                        value={invoice.date}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='customer'>Customer</label>
                    <input
                        type='text'
                        name='customer'
                        id='customer'
                        value={invoice.customer}
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
                        value={invoice.amount}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='paid'>Paid</label>
                    <input
                        type='number'
                        name='paid'
                        id='paid'
                        value={invoice.paid}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='status'>Status</label>
                    <select
                        name='status'
                        id='status'
                        value={invoice.status}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    >
                        <option value='Paid'>Paid</option>
                        <option value='Pending'>Pending</option>
                        <option value='Overdue'>Overdue</option>
                    </select>
                </div>
                {invoice.items.map((item, index) => (
                    <div key={index} className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={`product${index}`}>Product</label>
                        <input
                            type='text'
                            name='product'
                            id={`product${index}`}
                            value={item.product}
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
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={`unitPrice${index}`}>Unit Price</label>
                        <input
                            type='number'
                            name='unitPrice'
                            id={`unitPrice${index}`}
                            value={item.unitPrice}
                            onChange={e => handleItemChange(index, e)}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                ))}
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
