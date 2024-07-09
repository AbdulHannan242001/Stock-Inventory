import React, { useContext, useEffect, useState } from 'react';
import InventoryContext from '../../context/InventoryContext/inventoryContext';
import { useParams } from 'react-router-dom';

const ViewInventory = () => {
    const { id } = useParams();
    const context = useContext(InventoryContext);
    const { inventoryData } = context;
    const [inventory, setInventory] = useState(null);

    useEffect(() => {
        const invenId = id;
        const inventory = inventoryData.find((inventory) => (inventory._id).toString() === (invenId).toString());
        setInventory(inventory);
    }, [id]);

    if (!inventory) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-3/4 mx-auto mt-10">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Inventory Details</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-medium text-gray-700 mb-4">Product Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Name:</strong> {inventory.name}</p>
                    <p><strong>Quantity:</strong> {inventory.quantity}</p>
                    <p><strong>Total Price:</strong> ${inventory.unitCost * inventory.quantity}</p>
                    <p><strong>Unit Cost:</strong> ${inventory.unitCost}</p>
                    <p><strong>Category:</strong> {inventory.category}</p>
                    <p><strong>Low Stock Threshold:</strong> {inventory.lowStockThreshold}</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-medium text-gray-700 mb-4">Inventory Logs</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-6 text-left border-b">Name</th>
                                <th className="py-3 px-6 text-left border-b">Quantity</th>
                                <th className="py-3 px-6 text-left border-b">Unit Cost</th>
                                <th className="py-3 px-6 text-left border-b">Price</th>
                                <th className="py-3 px-6 text-left border-b">Method</th>
                                <th className="py-3 px-6 text-left border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.inventoryLog.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-100">
                                    <td className="py-3 px-6 border-b">{log.name}</td>
                                    <td className="py-3 px-6 border-b">{log.quantity}</td>
                                    <td className="py-3 px-6 border-b">${log.price}</td>
                                    <td className="py-3 px-6 border-b">${log.price * log.quantity}</td>
                                    <td className="py-3 px-6 border-b">{log.methode ? log.methode : 'N/A'}</td>
                                    <td className="py-3 px-6 border-b">{new Date(log.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewInventory;
