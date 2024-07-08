import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
import InvoiceContext from '../../context/InvoiceContext/invoiceContext';

const ViewInvoice = () => {
    const { id } = useParams();
    const { invoice } = useContext(InvoiceContext);
    const [invoices, setInvoice] = useState({});
    const printRef = useRef();

    useEffect(() => {
        const invoiceData = invoice ? invoice.find(invoice => parseInt(invoice._id) === parseInt(id)) : true;
        if (invoiceData) {
            setInvoice(invoiceData);
        }
    }, [id, invoice]);

    const handlePrint = () => {
        const printContent = printRef.current;
        const WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write('<html><head><title>Print Invoice</title>');
        WinPrint.document.write('<style>');
        WinPrint.document.write(`
            body { font-family: Arial, sans-serif; padding: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .invoice-header { text-align: center; margin-bottom: 20px; }
            .invoice-header h1 { font-size: 2em; margin-bottom: 0.2em; }
            .invoice-header p { margin: 0; }
            .invoice-details, .invoice-items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .invoice-details td, .invoice-items th, .invoice-items td { border: 1px solid #ddd; padding: 8px; }
            .invoice-items th { background-color: #f2f2f2; }
            .invoice-footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #555; }
        `);
        WinPrint.document.write('</style>');
        WinPrint.document.write('</head><body>');
        WinPrint.document.write(printContent.innerHTML);
        WinPrint.document.write('</body></html>');
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    };

    if (!invoice) {
        return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
    }

    const formatDate = (date) => {
        if (!date) return "N/A";
        const newDate = (date).toString().substring(0, 10);
        const splitDate = newDate.split('-');
        const [yyyy, mm, dd] = splitDate;
        return `${mm}/${dd}/${yyyy}`
    }
    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
                <h1 className="text-2xl font-semibold text-center mb-4">Invoice Details</h1>
                <div className="border p-4 rounded-lg">
                    <p className="text-lg"><strong>Invoice Number:</strong> {invoices.invoiceNumber}</p>
                    <p className="text-lg"><strong>Date:</strong> {formatDate(invoices.createdAt)}</p>
                    <p className="text-lg"><strong>Customer:</strong> {invoices.customer}</p>
                    <p className="text-lg"><strong>Amount:</strong> ${invoices.amount ? invoices.amount.toFixed(2) : '0.00'}</p>
                    <p className="text-lg"><strong>Paid:</strong> ${invoices.paid ? invoices.paid.toFixed(2) : '0.00'}</p>
                    <p className="text-lg"><strong>Status:</strong> {invoices.status}</p>
                    <h2 className="text-xl font-semibold mt-4">Items</h2>
                    <table className="w-full text-left border mt-2">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border-r">Product</th>
                                <th className="p-2 border-r">Quantity</th>
                                <th className="p-2 border-r">Unit Price</th>
                                <th className="p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.items && invoices.items.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2 border-r">{item.name && item.name}</td>
                                    <td className="p-2 border-r">{item.quantity && item.quantity}</td>
                                    <td className="p-2 border-r">${item.unitCost && (item.unitCost).toFixed(2)}</td>
                                    <td className="p-2">${item && (item.unitCost * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-between">
                    <Link to="/invoices" className="text-sm px-2 items-center rounded text-white bg-secondary border-secondary-dark flex w-auto">
                        <AiOutlineArrowLeft className="pr-1" />Back to Invoices
                    </Link>
                    <button onClick={handlePrint} className="text-sm px-2 items-center rounded text-white bg-secondary border-secondary-dark flex w-auto">
                        <AiOutlinePrinter className="pr-1" /> Print
                    </button>
                </div>
            </div>
            <div ref={printRef} className="p-4 hidden bg-white rounded-lg shadow-md w-2/3 mx-auto">
                <div className="invoice-container">
                    <div className="invoice-header">
                        <h1>Invoice</h1>
                        <p><strong>Invoice Number:</strong> {invoices.invoiceNumber}</p>
                        <p><strong>Date:</strong> {formatDate(invoices.createdAt)}</p>
                        <p><strong>Customer:</strong> {invoices.customer}</p>
                    </div>
                    <table className="invoice-details">
                        <tbody>
                            <tr>
                                <td><strong>Amount:</strong></td>
                                <td>${invoices.amount ? invoices.amount.toFixed(2) : '0.00'}</td>
                            </tr>
                            <tr>
                                <td><strong>Paid:</strong></td>
                                <td>${invoices.paid ? invoices.paid.toFixed(2) : '0.00'}</td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td>{invoices.status}</td>
                            </tr>
                            <tr>
                                <td><strong>Remaining Balance:</strong></td>
                                <td>${(invoices.amount - invoices.paid).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>Items</h2>
                    <table className="invoice-items">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.items && invoices.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.unitCost.toFixed(2)}</td>
                                    <td>${(item.unitCost * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="invoice-footer">
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewInvoice;
