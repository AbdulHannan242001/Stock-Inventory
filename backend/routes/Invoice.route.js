// INVOICE ROUTE
import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import { getInvoice, createInvoice, deleteInvoice, addItem } from '../controllers/Invoice.controller.js';

const router = express.Router();

router.get('/getinvoice', fetchUser, getInvoice);
router.post('/createinvoice', fetchUser, createInvoice);
router.put('/additem/:id', fetchUser, addItem);
router.delete('/delete/:id', fetchUser, deleteInvoice)

export default router;