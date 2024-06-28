import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import { createExpense, deleteExpense, editExpense, getExpenses } from '../controllers/Expense.controller.js';


const router = express.Router();

router.get('/getexpense', fetchUser, getExpenses);
router.post('/createexpense', fetchUser, createExpense);
router.put('/editexpense/:id', fetchUser, editExpense);
router.delete('/delete/:id', fetchUser, deleteExpense);

export default router