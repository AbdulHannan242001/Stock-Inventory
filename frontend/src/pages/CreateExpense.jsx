import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from '../components/CreateForm';

const CreateExpense = () => {
    const [Expense, setExpense] = useState({
        date: '',
        expenseName: '',
        category: 0,
        amount: 0,
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (formData) => {
        axios.post('/Expenses', formData)
            .then((response) => {
                // Handle success response
            })
            .catch((error) => {
                // Handle error response
            });
    };

    const ExpenseFormFields = [
        { name: 'date', label: 'Date', type: 'date', initialValue: Expense.date },
        { name: 'expenseName', label: 'Expense Name', type: 'text', initialValue: Expense.expenseName },
        { name: 'amount', label: 'Amount', type: 'number', initialValue: Expense.amount },
        { name: 'category', label: 'Category', type: 'select', options: ['purchasing', 'bills', 'staff'], initialValue: Expense.category },
    ];

    return (
        <CreateForm formTitle="New Expense" formFields={ExpenseFormFields} onSubmit={handleSubmit} />
    );
};

export default CreateExpense;
