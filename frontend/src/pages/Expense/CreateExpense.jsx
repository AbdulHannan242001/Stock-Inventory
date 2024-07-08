import React, { useState, useContext } from 'react';
import CreateForm from '../../components/CreateForm';
import ExpenseContext from '../../context/ExpenseContext/expenseContext';
import { useNavigate } from 'react-router-dom';

const CreateExpense = () => {
    const context = useContext(ExpenseContext);
    const { createExpense } = context;
    const navigate = useNavigate();
    const [Expense, setExpense] = useState({
        date: '',
        expenseName: '',
        amount: 0,
        category: 0,
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        createExpense(Expense);
        setExpense({
            date: '',
            expenseName: '',
            amount: 0,
            category: '',
        });
        navigate('/expenses')
    };

    const ExpenseFormFields = [
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'expenseName', label: 'Expense Name', type: 'text' },
        { name: 'amount', label: 'Amount', type: 'number' },
        { name: 'category', label: 'Category', type: 'text' },
    ];

    return (
        <CreateForm formTitle="New Expense" handleChange={handleChange} formFields={ExpenseFormFields} formData={Expense} onSubmit={handleSubmit} />
    );
};

export default CreateExpense;
