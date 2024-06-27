import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import { createOrder, deleteItem, addItem, getOrder } from '../controllers/Order.controller.js';

const router = express.Router();

router.get('/getorder', fetchUser, getOrder);
router.post('/createorder', fetchUser, createOrder);
router.put('/additem/:id', fetchUser, addItem);
router.put('/deleteitem/:id/:itemId', fetchUser, deleteItem);

export default router;