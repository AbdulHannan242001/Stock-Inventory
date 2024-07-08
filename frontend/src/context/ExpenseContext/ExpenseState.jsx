import React, { useEffect, useState } from 'react'
import ExpenseContext from './expenseContext'
import toast from 'react-hot-toast';


const ExpenseState = (props) => {
    const { children, authUser } = props;
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState([]);
    const host = import.meta.env.VITE_REACT_APP_HOST || 'http://localhost:8000';
    const getExpense = async () => {
        try {

            setLoading(true);

            const res = await fetch(`${host}/api/expense/getexpense`, {
                method: "GET",
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            }

            if (res.ok) {
                setExpense(data);
            }

        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const createExpense = async (expenseData) => {
        try {

            setLoading(true);

            const { date, expenseName, amount, category, orderNumber } = expenseData

            const res = await fetch(`${host}/api/expense/createexpense `, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ date, expenseName, amount, category, orderNumber }),
            });


            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            }

            if (res.ok) {
                setExpense([data, ...expense]);
                toast.success("Expense added successfully");
            }

        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const editExpense = async (id, expenseData) => {
        try {
            setLoading(true);

            const { date, expenseName, amount, category, orderNumber } = expenseData;

            const res = await fetch(`${host}/api/expense/editexpense/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ date, expenseName, amount, category, orderNumber }),
            });


            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            }

            if (res.ok) {
                setExpense(expense.map((exp) => exp._id === id ? data : exp));
                toast.success("Expense updated successfully");
            }

        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteExpense = async (id) => {
        try {
            setLoading(true);

            const res = await fetch(`${host}/api/expense/deleteexpense/${id}`, {
                method: "DELETE",
                credentials: 'include',
            });


            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            }

            if (res.ok) {
                setExpense(expense.filter((exp) => exp._id !== id));
                toast.success("Expense deleted successfully");
            }

        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (authUser) {
            getExpense();
        }
    }, [authUser]);
    return (
        <ExpenseContext.Provider
            value={{
                loading,
                expense,
                createExpense,
                editExpense,
                deleteExpense
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseState