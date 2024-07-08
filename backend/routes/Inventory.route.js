import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import { getInventory, addInventory, editInventory, deleteInventory, updateinventory } from '../controllers/Inventory.controller.js';

const router = express.Router();

router.get('/getinventory', fetchUser, getInventory);
router.post('/addinventory', fetchUser, addInventory);
router.put('/editinventory/:id', fetchUser, editInventory);
router.put('/updateinventory/:id', fetchUser, updateinventory);
router.delete('/deleteinventory/:id', fetchUser, deleteInventory);

export default router;