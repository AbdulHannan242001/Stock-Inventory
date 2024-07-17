// INVOICE ROUTE
import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import { getInvoice, createInvoice, deleteInvoice, editInvoice } from '../controllers/Iinvoice.controller.js';

const router = express.Router();

router.get('/getinvoice', fetchUser, getInvoice);
router.post('/createinvoice', fetchUser, createInvoice);
router.put('/editinvoice/:id', fetchUser, editInvoice);
router.delete('/delete/:id', fetchUser, deleteInvoice)

export default router;