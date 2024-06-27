// INVOICE ROUTE
import express from 'express';
import { getInvoice, createInvoice, deleteInvoice, addItem } from '../controllers/invoice.controller.js';

const router = express.Router();

router.get('/getinvoice', getInvoice);
router.post('/createinvoice', createInvoice);
router.put('/additem/:id', addItem);
router.delete('/delete/:id', deleteInvoice)

export default router;