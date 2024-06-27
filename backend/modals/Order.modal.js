import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    deliveryDate: {
        type : Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Cancelled'],
        required: true
    },
    deliveryStatus: {
        type: String,
        enum: ['On Time', 'Over Due', 'Incomplete'],
        required: true
    },
    vendorName: {

    },
    contact: {

    },
    paymentMethod: {

    },
    paymentStatus: {

    },
    transactionId: {

    },
    shippingMethod: {

    },
    trackingNumber: {

    },
    carrier: {

    },
    estimatedDelivery: {

    },
    notes: {

    },
    items: [{

    }],
    totalPrice: {

    }
});