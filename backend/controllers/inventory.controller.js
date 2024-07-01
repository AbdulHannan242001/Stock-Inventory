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

        const updatedInventory = await InventoryModal.findByIdAndUpdate(id, {
            name,
            quantity,
            price,
            category,
            lowStockThreshold
        }, { new: true });

        res.status(200).json(updatedInventory);

    } catch (error) {
        console.error("Error updating inventory item:", error);
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