import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import { changeDeliveryStatus, changeOrderStatus, createOrder, deleteItem, editOrder, getOrder } from '../controllers/Order.controller.js';

const router = express.Router();

router.get('/getorder', fetchUser, getOrder);
router.post('/createorder', fetchUser, createOrder);
router.put('/editorder/:id', fetchUser, editOrder);
router.put('/changedeliverystatus/:id', fetchUser, changeDeliveryStatus);
router.put('/changeorderstatus/:id', fetchUser, changeOrderStatus);
router.put('/deleteitem/:id/:itemId', fetchUser, deleteItem);

export default router;