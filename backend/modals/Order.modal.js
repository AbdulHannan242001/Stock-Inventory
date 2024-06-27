import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    deliveryDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Cancelled'],
        required: true
    },
    deliveryStatus: {
        type: String,
        enum: ['On Time', 'Over Due', 'Incomplete'],
    },
    vendorName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    payMethod: {
        type: String,
        enum: ["COD", "Bank Transfer", "E Transfer"],
    },
    payStatus: {
        type: String,
        enum: ["Paid", "Unpaid"],
    },
    transactionId: {
        type: String,
    },
    estimatedDDate: {
        type: Date,
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unitCost: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});


export default mongoose.model('Order', orderSchema);