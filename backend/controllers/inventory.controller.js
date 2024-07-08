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

        const { name, quantity, price, category, lowStockThreshold } = req.body;

        const newInventory = new InventoryModal({
            name,
            quantity,
            price,
            category,
            lowStockThreshold
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

        const { name, quantity, price, category, lowStockThreshold } = req.body;

        if (!id) return res.status(400).json({ message: "ID not found" });

        const invenLog = await InventoryModal.findById(id);

        if (!invenLog) return res.status(404).json({ message: "Inventory not found" });

        const log = invenLog.inventoryLog.push({
            name,
            quantity,
            price,
            category,
        });

        const updatedInventory = await InventoryModal.findByIdAndUpdate(id, {
            name,
            quantity,
            price,
            category,
            lowStockThreshold,
            inventoryLog: log

        }, { new: true });

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