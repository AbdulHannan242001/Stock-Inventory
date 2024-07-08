import React, { useEffect, useState } from 'react'
import InventoryContext from './inventoryContext'
import toast from 'react-hot-toast';

const InventoryState = (props) => {

    const { children, authUser } = props;
    const [loading, setLoading] = useState(false);
    const [inventoryData, setinventoryData] = useState([]);
    const host = import.meta.env.VITE_REACT_APP_HOST || 'http://localhost:8000';

    const getInventory = async () => {
        try {

            setLoading(true);

            const res = await fetch(`${host}/api/inventory/getinventory`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                setinventoryData(data);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const addInventory = async (formData) => {
        try {
            const { name, quantity, price, category, lowStockThreshold } = formData;

            const res = await fetch(`${host}/api/inventory/addInventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name, quantity, price, category, lowStockThreshold })
            });

            const data = await res.json();

            if (res.ok) {
                setinventoryData([...inventoryData, data]);
                toast.success('Inventory added successfully');
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

    const editInventory = async (id, formData) => {
        try {
            const { name, quantity, price, category, lowStockThreshold } = formData;

            const res = await fetch(`${host}/api/inventory/editInventory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name, quantity, price, category, lowStockThreshold })
            });

            const data = await res.json();

            if (res.ok) {
                setinventoryData(inventoryData.map((inventory) => inventory._id === id ? data : inventory));
                toast.success('Inventory updated successfully');
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

    const deleteInventory = async (id) => {
        try {
            const res = await fetch(`${host}/api/inventory/deleteInventory/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await res.json();

            if (res.ok) {
                setinventoryData(inventoryData.filter((inventory) => inventory._id !== id));
                toast.success('Inventory deleted successfully');
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
            getInventory();
        }
    }, [authUser]);

    return (
        <InventoryContext.Provider value={{
            loading,
            inventoryData,
            addInventory,
            editInventory,
            deleteInventory
        }}
        >
            {children}
        </InventoryContext.Provider>
    )
}

export default InventoryState