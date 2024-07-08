import React, { useState, useContext } from 'react';
import CreateForm from '../../components/CreateForm';
import OrderContext from '../../context/OrderContext/orderContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ExpenseContext from '../../context/ExpenseContext/expenseContext';


const checkData = (vendorName, contact, payMethod, payStatus, expectedDelivery) => {
    if ((!vendorName || vendorName.length < 3) || (!contact || contact.length < 9) || !payMethod || !payStatus || !expectedDelivery) {
        return false;
    }

    return true;
};

const checkItem = (name, quantity, unitCost) => {

    if ((!name || name.length < 3) || (!quantity || quantity < 1) || (!unitCost || unitCost < 1)) {
        return false;
    }

    return true;
};

const CreateOrder = () => {
    const expContext = useContext(ExpenseContext);
    const { createExpense } = expContext;
    const context = useContext(OrderContext);
    const { createOrder } = context;
    const nav = useNavigate();
    const [order, setOrder] = useState({
        vendorName: '',
        contact: '',
        payMethod: 'COD',
        payStatus: 'Paid',
        expectedDelivery: '',
    });

    const [items, setItems] = useState([
        {
            name: '',
            quantity: 0,
            unitCost: 0,
            category: '',
        }
    ]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };
    const addItem = () => {
        setItems([...items, { name: '', quantity: 0, unitCost: 0, category: '' }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);

        const totalPrice = newItems.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
        setOrder((prevOrder) => ({ ...prevOrder, items: newItems, totalPrice }));
    };


    const createNewOrder = async () => {
        const { vendorName, contact, payMethod, payStatus, expectedDelivery } = order;

        items.forEach(item => {
            if (!checkItem(item.name, item.quantity, item.unitCost, item.category)) {
                return toast.error('Please fill all the required fields');
            }
        });

        const isValid = checkData(vendorName, contact, payMethod, payStatus, expectedDelivery);

        if (!isValid) return toast.error('Please fill all the required fields');

        const orderNum = await createOrder(vendorName, contact, payMethod, payStatus, expectedDelivery, items);

        items.forEach(async (item) => {
            const formData = {
                date: new Date(),
                expenseName: item.name,
                amount: item.quantity * item.unitCost,
                category: item.category,
                orderNumber: orderNum
            }

            await createExpense(formData);
        })



        // await 

        setOrder({
            vendorName: '',
            contact: '',
            payMethod: 'COD',
            payStatus: 'Paid',
            expectedDelivery: '',
        });

        setItems([{ name: '', quantity: 0, unitCost: 0, category: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createNewOrder();
        nav('/orders');
    };


    const orderFormFields = [
        { name: 'vendorName', label: 'Vendor Name', type: 'text' },
        { name: 'contact', label: 'Contact', type: 'text' },
        { name: 'expectedDelivery', label: 'Expected Delivery', type: 'date' },
        { name: 'payMethod', label: 'Payment Method', type: 'select', options: ["COD", "Bank Transfer", "E Transfer"] },
        { name: 'payStatus', label: 'Payment Status', type: 'select', options: ["Paid", "Unpaid"] },
    ];

    return (
        <div className='w-full'>
            <CreateForm formTitle="New Order"
                formData={order}
                formFields={orderFormFields}
                handleChange={handleChange}
                onSubmit={handleSubmit}
                items={items}
                handleItemChange={handleItemChange}
                removeItem={removeItem}
                addItem={addItem}
                totalPrice={totalPrice}
                boolean={true}
            />

        </div >
    );
};

export default CreateOrder;
