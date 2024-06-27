import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        required: true
    },
    items: [
        {
            productName: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            unitCost: {
                type: Number,
            }
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model('Invoice', InvoiceSchema);