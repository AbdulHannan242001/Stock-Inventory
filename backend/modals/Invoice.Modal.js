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
    },
    status: {
        type: String,
        enum: ['Unpaid', 'Paid', 'Due'],
        required: true
    },
    items: [
        {
            name: {
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