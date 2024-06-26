import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceContext = createContext();

const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const invoiceData = response.data.map(item => ({
                    id: item.id,
                    invoiceNumber: item.id,
                    date: new Date().toLocaleDateString(),
                    customer: `Customer ${item.userId}`,
                    amount: parseFloat((Math.random() * 1000).toFixed(2)),
                    paid: parseFloat((Math.random() * 500).toFixed(2)),
                    status: ['paid', 'pending', 'overdue'][Math.floor(Math.random() * 3)],
                    items: [{
                        product: `Product ${Math.floor(Math.random() * 10) + 1}`,
                        quantity: Math.floor(Math.random() * 10) + 1,
                        unitPrice: parseFloat((Math.random() * 100).toFixed(2))
                    }],
                }));
                setInvoices(invoiceData);
            })
            .catch(error => console.error('Error fetching invoices:', error));
    }, []);

    const getInvoiceById = (id) => {
        return invoices.find(invoice => invoice.id.toString() === id);
    };

    const updateInvoice = (updatedInvoice) => {
        setInvoices(prevInvoices =>
            prevInvoices.map(invoice =>
                invoice.id === updatedInvoice.id ? updatedInvoice : invoice
            )
        );
    };

    return (
        <InvoiceContext.Provider value={{ invoices, getInvoiceById, updateInvoice }}>
            {children}
        </InvoiceContext.Provider>
    );
};

export { InvoiceProvider, InvoiceContext };
