import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForm from '../../components/CreateForm';
import InventoryContext from '../../context/InventoryContext/inventoryContext';
import toast from 'react-hot-toast';

const AddInventory = () => {
    const context = useContext(InventoryContext);
    const { addInventory } = context;
    const [formValue, setFormValue] = useState({
        name: '',
        category: '',
        lowStockThreshold: '',
        quantity: '',
        price: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const formFields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'lowStockThreshold', label: 'lowStockThreshold', type: 'text' },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        { name: 'price', label: 'Price', type: 'number', step: '0.01' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValue.name || !formValue.category || !formValue.lowStockThreshold || !formValue.quantity || !formValue.price) {
            toast.error('Please fill all the fields');
            return;
        }
        await addInventory(formValue);

        navigate('/inv');
    };

    return (
        // formTitle, formFields, onSubmit, formData, handleChange
        <CreateForm
            formTitle="New Inventory Item"
            formFields={formFields}
            onSubmit={handleSubmit}
            formData={formValue}
            handleChange={handleChange}
        />
    );
};

export default AddInventory;
