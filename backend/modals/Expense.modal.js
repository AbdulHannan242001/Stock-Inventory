import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    expenseName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    orderNumber: {
        type: String
    }
});


export default mongoose.model('Expense', expenseSchema)