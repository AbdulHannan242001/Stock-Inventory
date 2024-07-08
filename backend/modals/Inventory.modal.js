import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    lowStockThreshold: {
        type: Number,
        required: true
    },
    inventoryLog: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    },
    { timestamps: true }
    ]
});

export default mongoose.model('Inventory', InventorySchema);