import React, { useEffect, useState } from 'react'
import InvoiceContext from './invoiceContext'
import { toast } from 'react-hot-toast'
const InvoiceState = (props) => {
    const { children, authUser } = props
    const [invoice, setInvoice] = useState([]);
    const [loading, setLoading] = useState(false);
    const host = import.meta.env.VITE_REACT_APP_HOST || 'http://localhost:8000';

    const checkData = (customer, status, items) => {
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

    const allInvoices = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${host}/api/invoice/getinvoice`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setInvoice(data);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const createInvoice = async (formData, items) => {
        try {
            setLoading(true);
            const { customer, amount, paid, status } = formData;
            const isValid = checkData(customer, status, items);
            if (!isValid) return toast.error('Please fill all the fields');
            const res = await fetch(`${host}/api/invoice/createinvoice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    customer,
                    amount,
                    paid,
                    status,
                    items
                })
            });
            const data = await res.json();
            if (res.ok) {
                setInvoice([...invoice, data]);
                toast.success("Invoice created successfully");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const editInvoice = async (id, formData) => {
        try {
            setLoading(true);

            const { customer, amount, paid, status, items } = formData;

            const isValid = checkData(customer, amount, paid, status, items);

            if (!isValid) return toast.error('Please fill all the fields');

            const res = await fetch(`${host}/api/invoice/editinvoice/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    customer,
                    amount,
                    paid,
                    status,
                    items
                })
            });

            const data = await res.json();

            if (res.ok) {
                setInvoice(invoice.map((inv) => (inv._id).toString() === (id).toString() ? data : inv));
                toast.success("Invoice updated successfully");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteInvoice = async (id) => {
        try {
            setLoading(true);
            const res = await fetch(`${host}/api/invoice/deleteinvoice/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setInvoice(invoice.filter((inv) => inv._id !== id));
                toast.success("Invoice deleted successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (authUser) {
            allInvoices();
        }
    }, [authUser])

    return (
        <InvoiceContext.Provider
            value={{
                loading,
                invoice,
                editInvoice,
                createInvoice,
                deleteInvoice
            }}
        >
            {children}
        </InvoiceContext.Provider>
    )
}

export default InvoiceState