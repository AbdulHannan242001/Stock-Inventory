import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import InventoryRoute from './routes/Inventory.route.js';
import AuthRoute from './routes/Auth.route.js';
import InvoiceRoute from './routes/Invoice.route.js';
import OrderRoute from './routes/Order.route.js';
import ExpenseRoute from './routes/Expense.route.js';

import connectToMongoDB from './db/db.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
}));

app.use('/api/auth', AuthRoute);
app.use('/api/inventory', InventoryRoute);
app.use('/api/invoice', InvoiceRoute);
app.use('/api/order', OrderRoute);
app.use('/api/expense', ExpenseRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToMongoDB();
});

app.use('/', (req, res) => {
    res.send('Backend Server is running...');
});

export default app;