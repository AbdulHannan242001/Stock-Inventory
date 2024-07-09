import InventoryModal from "../modals/Inventory.modal.js";

export const getInventory = async (req, res) => {
    try {
        const inventory = await InventoryModal.find();
        res.status(200).json(inventory);
    } catch (error) {
        console.error("Error getting inventory:", error);
        res.status(500).json({ message: error.message });
    }
}

export const addInventory = async (req, res) => {
    try {

        const { name, quantity, unitCost, price, category, lowStockThreshold, methode } = req.body;
        const log = [{
            name,
            quantity,
            price: unitCost,
            date: new Date(),
            methode
        }];

        const newInventory = new InventoryModal({
            name,
            quantity,
            price,
            unitCost,
            category,
            lowStockThreshold,
            inventoryLog: log,
        });

        await newInventory.save();

        res.status(201).json(newInventory);

    } catch (error) {
        console.error("Error adding inventory:", error);
        res.status(500).json({ message: error.message });
    }
}

export const editInventory = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, quantity, unitCost, price, category, lowStockThreshold, itemQuantity, itemPrice, methode } = req.body;

        if (!id) return res.status(400).json({ message: "ID not found" });

        const invenLog = await InventoryModal.findById(id);

        if (!invenLog) return res.status(404).json({ message: "Inventory not found" });

        invenLog.inventoryLog.push({
            name,
            quantity: itemQuantity,
            price: itemPrice,
            date: new Date(),
            methode,
        });

        invenLog.name = name;
        invenLog.quantity = quantity;
        invenLog.price = price;
        invenLog.unitCost = unitCost;
        invenLog.category = category;
        invenLog.lowStockThreshold = lowStockThreshold;

        const updatedInventory = await invenLog.save();

        if (!updatedInventory) return res.status(404).json({ message: "Inventory not found" });

        res.status(200).json(updatedInventory);

    } catch (error) {
        console.error("Error updating inventory item:", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateinventory = async (req, res) => {
    try {
        const { id } = req.params;

        const { quantity } = req.body;

        const find = await InventoryModal.findById(id);

        if (!find) return res.status(404).json({ message: "Inventory not found" });

        const updatedInventory = await InventoryModal.findByIdAndUpdate(id, {
            quantity
        }, { new: true });

        if (!updatedInventory) return res.status(404).json({ message: "Inventory not found" });

        res.status(200).json({
            _id: updatedInventory._id,
            name: updatedInventory.name,
            quantity: updatedInventory.quantity,
            price: updatedInventory.price,
            category: updatedInventory.category,
            lowStockThreshold: updatedInventory.lowStockThreshold
        });
    } catch (error) {
        console.error("Error deleting inventory item:", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await InventoryModal.findById(id);
        if (!find) return res.status(404).json({ message: "Inventory not found" });
        await InventoryModal.findByIdAndDelete(id);
        res.status(200)
            .json({
                message: "Inventory deleted successfully"
            });

    } catch (error) {
        console.error("Error deleting inventory item:", error);
        res.status(500).json({ message: error.message });
    }
}