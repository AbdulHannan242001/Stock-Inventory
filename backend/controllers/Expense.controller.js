import EXPENSE from "../modals/Expense.modal.js";

export const getExpenses = async (req, res) => {
    try {
        const expenses = await EXPENSE.find();
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error getting expenses:", error);
        res.status(404).json({ message: error.message });
    }
}

export const createExpense = async (req, res) => {
    try {
        const { date, expenseName, amount, category, orderNumber } = req.body;

        const isValid = await checkData(date, expenseName, amount, category);

        if (!isValid) return res.status(400).json({ message: "Missing data" });

        const newExpense = new EXPENSE({
            date,
            expenseName,
            amount,
            category,
            orderNumber
        });

        await newExpense.save();

        res.status(201).json({
            _id: newExpense._id,
            date: newExpense.date,
            expenseName: newExpense.expenseName,
            amount: newExpense.amount,
            category: newExpense.category,
            orderNumber: newExpense.orderNumber
        });

    } catch (error) {
        console.error("Error creating expenses:", error);
        res.status(404).json({ message: error.message });
    }
}

export const editExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const findExpense = await EXPENSE.findById(id);

        if (!findExpense) return res.status(404).json({ message: "Expense not found" });

        const { date, expenseName, amount, category, orderNumber } = req.body;

        const isValid = await checkData(date, expenseName, amount, category);

        if (!isValid) return res.status(400).json({ message: "Missing data" });

        const updatedExpense = await EXPENSE.findByIdAndUpdate(id, {
            date,
            expenseName,
            amount,
            category,
            orderNumber
        }, { new: true });

        res.status(200).json({
            _id: updatedExpense._id,
            date: updatedExpense.date,
            expenseName: updatedExpense.expenseName,
            amount: updatedExpense.amount,
            category: updatedExpense.category,
            orderNumber: updatedExpense.orderNumber
        });

    } catch (error) {
        console.error("Error editing expenses:", error);
        res.status(404).json({ message: error.message });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const findExpense = await EXPENSE.findById(id);

        if (!findExpense) return res.status(404).json({ message: "Expense not found" });

        await EXPENSE.findByIdAndDelete(id);

        res.status(200).json({ message: "Expense deleted successfully" });

    } catch (error) {
        console.error("Error deleting expenses:", error);
        res.status(404).json({ message: error.message });
    }
}



const checkData = async (date, expenseName, amount, category) => {
    if (!date || !expenseName || !amount || !category) {
        console.error("Error getting expenses:", error);
        return false;
    }
    return true;
}