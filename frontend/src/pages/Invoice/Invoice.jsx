import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InvoiceContext from '../../context/InvoiceContext/invoiceContext';

const Invoice = () => {
    const { invoice, deleteInvoice } = useContext(InvoiceContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setInvoices(invoice);
    }, [invoice]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
        setCurrentPage(1);
    };

    const filteredInvoices = invoices
        .filter(invoice =>
            (invoice.status && invoice.status.includes(filterStatus)) &&
            (invoice.customer && invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (invoice.invoiceNumber && invoice.invoiceNumber.toString().includes(searchTerm))
        );

    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalAmount = filteredInvoices.reduce((total, invoice) => total + parseFloat(invoice.amount), 0).toFixed(2);
    const totalPaid = filteredInvoices.reduce((total, invoice) => total + parseFloat(invoice.paid), 0).toFixed(2);
    const totalDue = filteredInvoices.reduce((total, invoice) => total + (parseFloat(invoice.amount) - parseFloat(invoice.paid)), 0).toFixed(2);
    const totalOverdue = filteredInvoices
        .filter(invoice => invoice.status === 'Due')
        .reduce((total, invoice) => total + (parseFloat(invoice.amount) - parseFloat(invoice.paid)), 0)
        .toFixed(2);
    const totalPending = filteredInvoices
        .filter(invoice => invoice.status === 'Unpaid')
        .reduce((total, invoice) => total + (parseFloat(invoice.amount)), 0)
        .toFixed(2);

    const deleteInvoiceEntry = (invoiceId) => {
        deleteInvoice(invoiceId);
    };

    const handleDelete = (invoiceId) => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-secondary text-white rounded-lg shadow-md p-4 w-64">
                        <h5 className="text-lg font-bold mb-2">Confirm Delete</h5>
                        <p className="text-sm mb-4">Are you sure you want to delete this invoice?</p>
                        <button
                            className="bg-red-700 hover:bg-accent-red text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                deleteInvoiceEntry(invoiceId);
                                onClose();
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() => onClose()}
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
        });
    };
    const formatDate = (date) => {
        const newDate = (date).toString().substring(0, 10);
        const splitDate = newDate.split('-');
        const [yyyy, mm, dd] = splitDate;
        return `${mm}/${dd}/${yyyy}`
    }

    return (
        <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
            <div className='mb-4'>
                <h1 className='text-3xl font-semibold text-center text-primary-dark'>Invoices</h1>
            </div>
            <div className='flex items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
                <input
                    type='text'
                    placeholder='Search invoices...'
                    className='text-sm text-secondary-dark bg-white p-2 rounded-lg placeholder-secondary-dark'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={filterStatus} className='text-sm text-secondary-dark bg-white p-2 rounded-lg' onChange={handleFilterChange}>
                    <option value=''>All Statuses</option>
                    <option value='paid'>Paid</option>
                    <option value='pending'>Pending</option>
                    <option value='overdue'>Overdue</option>
                </select>
                <Link to='/invoices/new' className='text-sm text-white bg-secondary p-2 rounded-lg'>Add New Invoice</Link>
            </div>
            <div className='flex justify-between py-1 px-8 w-full mt-4'>
                <p className='text-sm text-secondary-dark'>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredInvoices.length)} of {filteredInvoices.length} entries</p>
                <p className='text-sm text-secondary-dark'>Page {currentPage} of {totalPages}</p>
            </div>
            <div className='flex justify-between'>
                <table className='border w-8/12 bg-white shadow-lg rounded-lg'>
                    <thead className='bg-secondary-dark text-white'>
                        <tr>
                            <th className='p-2'>Invoice #</th>
                            <th className='p-2'>Date</th>
                            <th className='p-2'>Customer</th>
                            <th className='p-2'>Amount</th>
                            <th className='p-2'>Paid</th>
                            <th className='p-2'>Status</th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(invoice => (
                            <tr key={invoice._id} className='border-b border-secondary-light hover:bg-gray-100'>
                                <td className='text-center p-2'>{invoice.invoiceNumber}</td>
                                <td className='text-center p-2'>{formatDate(invoice.createdAt)}</td>
                                <td className='text-center p-2'>{invoice.customer}</td>
                                <td className='text-center p-2'>${invoice.amount.toFixed(2)}</td>
                                <td className='text-center p-2'>${invoice.paid.toFixed(2)}</td>
                                <td className='text-center p-2'>{invoice.status}</td>
                                <td className='text-center p-2'>
                                    <Link to={`/invoices/${invoice._id}`} className='text-accent-green hover:text-accent-darkgreen mx-2'>View</Link>
                                    <Link to={`/invoices/edit/${invoice._id}`} className='text-accent-green hover:text-accent-darkgreen mx-2'>Edit</Link>
                                    <button onClick={() => handleDelete(invoice._id)} className='text-accent-red hover:text-accent-darkred mx-2'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='w-3/12 space-y-5'>
                    <div className='border-2 rounded-lg shadow-lg p-4 bg-gray-100'>
                        <h1 className='text-center font-semibold text-primary-dark'>Total Amount</h1>
                        <p className='text-center text-2xl font-semibold py-2 text-secondary-dark'>$ {totalAmount}</p>
                    </div>
                    <div className='border-2 rounded-lg shadow-lg p-4 bg-gray-100'>
                        <h1 className='text-center font-semibold text-primary-dark'>Total Amount to be Paid</h1>
                        <p className='text-center text-2xl font-semibold py-2 text-secondary-dark'>$ {totalDue}</p>
                    </div>
                    <div className='border-2 rounded-lg shadow-lg p-4 bg-gray-100'>
                        <h1 className='text-center font-semibold text-primary-dark'>Total Paid Amount</h1>
                        <p className='text-center text-2xl font-semibold py-2 text-secondary-dark'>$ {totalPaid}</p>
                    </div>
                    <div className='border-2 rounded-lg shadow-lg p-4 bg-gray-100'>
                        <h1 className='text-center font-semibold text-primary-dark'>Total Un-Paid Amount</h1>
                        <p className='text-center text-2xl font-semibold py-2 text-secondary-dark'>$ {totalPending}</p>
                    </div>
                    <div className='border-2 rounded-lg shadow-lg p-4 bg-gray-100'>
                        <h1 className='text-center font-semibold text-primary-dark'>Total Due Amount</h1>
                        <p className='text-center text-2xl font-semibold py-2 text-secondary-dark'>$ {totalOverdue}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center space-x-4 my-4'>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`text-sm font-bold py-1 px-2 rounded-lg ${index + 1 === currentPage ? 'bg-secondary-dark text-white' : 'bg-gray-300 text-secondary-dark'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Invoice;
