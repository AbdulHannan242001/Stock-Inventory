import React, { useState, useContext, useEffect } from 'react';
import CreateForm from '../../components/CreateForm';
import InvoiceContext from '../../context/InvoiceContext/invoiceContext';
import { toast } from 'react-hot-toast';
import InventoryContext from '../../context/InventoryContext/inventoryContext';

const CreateInvoice = () => {
    const invContext = useContext(InventoryContext);
    const { addInventory, inventoryData } = invContext
    const context = useContext(InvoiceContext);
    const { createInvoice } = context;
    const [bool, setBool] = useState(true);
    const [invoice, setInvoice] = useState({
        customer: '',
        amount: 0,
        paid: 0,
        status: '',
    });

    const [items, setItems] = useState([{ name: '', quantity: 0, unitCost: 0, category: '' }]);

    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);

    useEffect(() => {
        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            amount: totalPrice,
        }));
    }, [totalPrice]);

    const status = invoice.status;

    useEffect(() => {
        if (status === 'Paid') {
            setBool(true);
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                paid: totalPrice,
            }));
        } else if (status === 'Unpaid') {
            setBool(true);
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                paid: 0,
            }))
        } else {
            setBool(false);
        }
    }, [status, totalPrice]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 0, unitCost: 0, category: '' }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    }

    const checkData = (invoiceData, items) => {
        if (invoiceData.status === '') {
            invoiceData.status = 'Unpaid';
        }
        const { customer, status } = invoiceData;
        if (!customer || !status || typeof items !== 'object') {
            return false;
        }
        return true;
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkData(invoice, items)) {
            toast.error('Please fill all the fields');
            return;
        }

        items.forEach((item) => {
            const findInInventory = inventoryData.find((i) => i.name === item.name && i.category === item.category);
            if (!findInInventory) {
                toast.error('Item not found in inventory');
                return;
            }
        })

        await createInvoice(invoice, items);

        items.forEach(async (item) => {
            const formData = {
                date: new Date(),
                name: item.name,
                price: item.quantity * item.unitCost,
                unitCost: item.unitCost,
                category: item.category,
                quantity: item.quantity
            };
            await addInventory(formData, "Removed");
        });

        setInvoice({
            customer: '',
            amount: 0,
            paid: 0,
            status: '',
        })
        setItems([{ name: '', quantity: 0, unitCost: 0, category: '' }])
    };

    const invoiceFormFields = [
        { name: 'customer', label: 'Customer', type: 'text', initialValue: invoice.invoiceNumber },
        { name: 'amount', label: 'Amount', type: 'number', initialValue: invoice.amount, disabled: true },
        { name: 'paid', label: 'Paid', type: 'number', initialValue: invoice.paid, disabled: bool },
        { name: 'status', label: 'Status', type: 'select', options: ['Unpaid', 'Paid', 'Due'], initialValue: invoice.status },
    ];


    return (
        <CreateForm formTitle="New Invoice"
            formData={invoice}
            formFields={invoiceFormFields}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            items={items}
            handleItemChange={handleItemChange}
            removeItem={removeItem}
            addItem={addItem}
            totalPrice={totalPrice}
            boolean={true}
        />
    );
};

export default CreateInvoice;
