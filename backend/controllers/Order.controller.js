import ORDER from "../models/Order.model.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await ORDER.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error getting orders:", error);
        res.status(404).json({ message: error.message });
    }
}

export const createOrder = async (req, res) => {
    try {
        const { vendorName, contact, payMethod, payStatus, expectedDelivery } = req.body;
        const isValid = checkData(vendorName, contact, payMethod, payStatus, expectedDelivery);
        if (!isValid) return res.status(400).json({ message: "Missing data" });

        const newOrder = new ORDER({
            vendorName,
            contact,
            payMethod,
            payStatus,
            expectedDelivery,
            items: [],
        });

        await newOrder.save();

        res.status(201).json({
            _id: newOrder._id,
            vendorName: newOrder.vendorName,
            contact: newOrder.contact,
            payMethod: newOrder.payMethod,
            payStatus: newOrder.payStatus,
            expectedDelivery: newOrder.expectedDelivery,
            createdAt: newOrder.createdAt,
            updatedAt: newOrder.updatedAt
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: error.message });
    }
}

export const addItem = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, quantity, unitCost } = req.body;

        const existingOrder = await ORDER.findById(id);

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        existingOrder.items.push({ name, quantity, unitCost });

        await existingOrder.save();

        res.status(200).json({
            _id: existingOrder._id,
            vendorName: existingOrder.vendorName,
            contact: existingOrder.contact,
            payMethod: existingOrder.payMethod,
            payStatus: existingOrder.payStatus,
            expectedDelivery: existingOrder.expectedDelivery,
            items: existingOrder.items,
            createdAt: existingOrder.createdAt,
            updatedAt: existingOrder.updatedAt
        });

    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { id, itemId } = req.params;

        const existingOrder = await ORDER.findById(id);

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        existingOrder.items = existingOrder.items.filter(item => item._id !== itemId);

        await existingOrder.save();

        res.status(200).json({
            _id: existingOrder._id,
            vendorName: existingOrder.vendorName,
            contact: existingOrder.contact,
            payMethod: existingOrder.payMethod,
            payStatus: existingOrder.payStatus,
            expectedDelivery: existingOrder.expectedDelivery,
            items: existingOrder.items,
            createdAt: existingOrder.createdAt,
            updatedAt: existingOrder.updatedAt
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: error.message });
    }
}





const checkData = async (vendorName, contact, payMethod, payStatus, expectedDelivery) => {
    if (!vendorName || !contact || !payMethod || !payStatus || !expectedDelivery) {
        console.error("Error getting orders:", error);
        return false;
    }
    return true;
}