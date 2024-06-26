// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
// import { InvoiceContext } from './InvoiceContext';

// const ViewInvoice = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null);
//     const { invoices } = useContext(InvoiceContext);

//     useEffect(() => {
//         const invoiceData = invoices.find(invoice => invoice.id === parseInt(id));
//         if (invoiceData) {
//             setInvoice(invoiceData);
//         } else {
//             axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
//                 .then(response => {
//                     const fetchedInvoice = {
//                         id: response.data.id,
//                         invoiceNumber: response.data.id,
//                         date: new Date().toLocaleDateString(),
//                         customer: `Customer ${response.data.userId}`,
//                         amount: parseFloat((Math.random() * 1000).toFixed(2)),
//                         paid: parseFloat((Math.random() * 500).toFixed(2)),
//                         status: ['Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 3)],
//                         items: [
//                             {
//                                 product: 'Product1',
//                                 quantity: Math.floor(Math.random() * 10) + 1,
//                                 unitPrice: parseFloat((Math.random() * 100).toFixed(2))
//                             },
//                             {
//                                 product: 'Product2',
//                                 quantity: Math.floor(Math.random() * 10) + 1,
//                                 unitPrice: parseFloat((Math.random() * 100).toFixed(2))
//                             }
//                         ]
//                     };
//                     setInvoice(fetchedInvoice);
//                 })
//                 .catch(error => console.error('Error fetching invoice:', error));
//         }
//     }, [id, invoices]);

//     const handlePrint = () => {
//         window.print();
//     };

//     if (!invoice) {
//         return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
//     }

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
//             <h1 className="text-2xl font-semibold text-center mb-4">Invoice Details</h1>
//             <div className="border p-4 rounded-lg">
//                 <p className="text-lg"><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
//                 <p className="text-lg"><strong>Date:</strong> {invoice.date}</p>
//                 <p className="text-lg"><strong>Customer:</strong> {invoice.customer}</p>
//                 <p className="text-lg"><strong>Amount:</strong> ${invoice.amount.toFixed(2)}</p>
//                 <p className="text-lg"><strong>Paid:</strong> ${invoice.paid.toFixed(2)}</p>
//                 <p className="text-lg"><strong>Status:</strong> {invoice.status}</p>
//                 <h2 className="text-xl font-semibold mt-4">Items</h2>
//                 <table className="w-full text-left border mt-2">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-2 border-r">Product</th>
//                             <th className="p-2 border-r">Quantity</th>
//                             <th className="p-2 border-r">Unit Price</th>
//                             <th className="p-2">Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {invoice.items.map((item, index) => (
//                             <tr key={index} className="border-t">
//                                 <td className="p-2 border-r">{item.product}</td>
//                                 <td className="p-2 border-r">{item.quantity}</td>
//                                 <td className="p-2 border-r">${item.unitPrice.toFixed(2)}</td>
//                                 <td className="p-2">${(item.unitPrice * item.quantity).toFixed(2)}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="mt-4 flex justify-between">
//                 <Link to="/invoices" className="text-sm px-2 items-center rounded text-white bg-secondary border-secondary-dark flex w-auto">
//                     <AiOutlineArrowLeft className="pr-1" />Back to Invoices
//                 </Link>
//                 <button onClick={handlePrint} className="text-sm px-2 items-center rounded text-white bg-secondary border-secondary-dark flex w-auto">
//                     <AiOutlinePrinter className="pr-1" /> Print
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ViewInvoice;


import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlinePrinter } from "react-icons/ai";
import { InvoiceContext } from './InvoiceContext';

const ViewInvoice = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const { invoices } = useContext(InvoiceContext);
    const printRef = useRef();

    useEffect(() => {
        const invoiceData = invoices.find(invoice => invoice.id === parseInt(id));
        if (invoiceData) {
            setInvoice(invoiceData);
        } else {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => {
                    const fetchedInvoice = {
                        id: response.data.id,
                        invoiceNumber: response.data.id,
                        date: new Date().toLocaleDateString(),
                        customer: `Customer ${response.data.userId}`,
                        amount: parseFloat((Math.random() * 1000).toFixed(2)),
                        paid: parseFloat((Math.random() * 500).toFixed(2)),
                        status: ['Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 3)],
                        items: [
                            {
                                product: 'Product1',
                                quantity: Math.floor(Math.random() * 10) + 1,
                                unitPrice: parseFloat((Math.random() * 100).toFixed(2))
                            },
                            {
                                product: 'Product2',
                                quantity: Math.floor(Math.random() * 10) + 1,
                                unitPrice: parseFloat((Math.random() * 100).toFixed(2))
                            }
                        ]
                    };
                    setInvoice(fetchedInvoice);
                })
                .catch(error => console.error('Error fetching invoice:', error));
        }
    }, [id, invoices]);

    const handlePrint = () => {
        const printContent = printRef.current;
        const WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write('<html><head><title>Print Invoice</title>');
        WinPrint.document.write('</head><body >');
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

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-2/3 mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-4">Invoice Details</h1>
            <div ref={printRef} className="border p-4 rounded-lg">
                <p className="text-lg"><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
                <p className="text-lg"><strong>Date:</strong> {invoice.date}</p>
                <p className="text-lg"><strong>Customer:</strong> {invoice.customer}</p>
                <p className="text-lg"><strong>Amount:</strong> ${invoice.amount.toFixed(2)}</p>
                <p className="text-lg"><strong>Paid:</strong> ${invoice.paid.toFixed(2)}</p>
                <p className="text-lg"><strong>Status:</strong> {invoice.status}</p>
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
                        {invoice.items.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2 border-r">{item.product}</td>
                                <td className="p-2 border-r">{item.quantity}</td>
                                <td className="p-2 border-r">${item.unitPrice.toFixed(2)}</td>
                                <td className="p-2">${(item.unitPrice * item.quantity).toFixed(2)}</td>
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
    );
};

export default ViewInvoice;
