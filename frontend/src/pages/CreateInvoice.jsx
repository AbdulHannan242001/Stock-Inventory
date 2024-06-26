import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CreateForm from '../components/CreateForm';

const CreateInvoice = () => {
    const [invoice, setInvoice] = useState({
        invoiceNumber: '',
        date: '',
        customer: '',
        amount: 0,
        paid: 0,
        status: 'pending',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const invoiceNumber = uuidv4();
        setInvoice((prevInvoice) => ({ ...prevInvoice, invoiceNumber }));
    }, []);

    const handleSubmit = (formData) => {
        axios.post('/invoices', formData)
            .then((response) => {
                // Handle success response
            })
            .catch((error) => {
                // Handle error response
            });
    };

    const invoiceFormFields = [
        { name: 'invoiceNumber', label: 'Invoice Number', type: 'text', initialValue: invoice.invoiceNumber, disabled: true },
        { name: 'date', label: 'Date', type: 'date', initialValue: invoice.date },
        { name: 'customer', label: 'Customer', type: 'text', initialValue: invoice.customer },
        { name: 'amount', label: 'Amount', type: 'number', initialValue: invoice.amount },
        { name: 'paid', label: 'Paid', type: 'number', initialValue: invoice.paid },
        { name: 'status', label: 'Status', type: 'select', options: ['pending', 'paid', 'overdue'], initialValue: invoice.status },
    ];

    return (
        <CreateForm formTitle="New Invoice" formFields={invoiceFormFields} onSubmit={handleSubmit} />
    );
};

export default CreateInvoice;
