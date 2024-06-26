import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateForm from '../components/CreateForm';

const AddInventory = () => {
    const navigate = useNavigate();

    const formFields = [
        { name: 'name', label: 'Name', type: 'text', initialValue: '' },
        { name: 'category', label: 'Category', type: 'text', initialValue: '' },
        { name: 'quantity', label: 'Quantity', type: 'number', initialValue: '' },
        { name: 'price', label: 'Price', type: 'number', step: '0.01', initialValue: '' },
    ];

    const handleSubmit = (formData) => {
        const newItem = {
            name: formData.name,
            category: formData.category,
            quantity: parseInt(formData.quantity, 10),
            price: parseFloat(formData.price),
        };

        axios.post('https://jsonplaceholder.typicode.com/posts', newItem)
            .then(response => {
                console.log('New item added:', response.data);
                navigate('/inventory');
            })
            .catch(error => console.error('Error adding new item:', error));
    };

    return (
        <CreateForm
            formTitle="New Inventory Item"
            formFields={formFields}
            onSubmit={handleSubmit}
        />
    );
};

export default AddInventory;
