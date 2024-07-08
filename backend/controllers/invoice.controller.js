import INVOICE from "../modals/Invoice.Modal.js";
import { generateInvoiceNumber } from "../utils/generateInvoiceNumber.js";

export const getInvoice = async (req, res) => {
    try {
        const invoices = await INVOICE.find();
        res.status(200).json(invoices);
    } catch (error) {
        console.error("Error getting invoices:", error);
        res.status(404).json({ message: error.message });
    }
}

export const createInvoice = async (req, res) => {
    try {
        const { customer, amount, paid, status, items } = req.body;

        if (!customer || !status) {

            return res.status(400).json({ message: "Missing required fields" });

        }

        if (typeof items !== "object" || items.length === 0) return res.status(400).json({ message: "Missing data" });

        items.forEach(item => {
            const { name, quantity, unitCost } = item;

            if (!name || !quantity || !unitCost) {
                return res.status(400).json({ message: "Missing data" })
            }
        })

        let existingInvoice;

        let newInvoiceNum = generateInvoiceNumber();

        let isUnique = false;

        for (let i = 0; i < 10; i++) {

            existingInvoice = await INVOICE.findOne({ invoiceNumber: newInvoiceNum });

            if (!existingInvoice) {

                isUnique = true;

                break;

            }

            newInvoiceNum = generateInvoiceNumber();
        }

        if (!isUnique) {

            return res.status(500).json({ message: "Failed to generate a unique invoice number after multiple attempts" });

        }


        let newPaid = paid;
        let newAmount = amount;

        if (!paid || paid === 0) newPaid = 0

        if (!amount || amount === 0) newAmount = 0

        const newInvoice = new INVOICE({
            invoiceNumber: newInvoiceNum,
            customer,
            amount: newAmount,
            paid: newPaid,
            status,
            items
        });

        await newInvoice.save();

        res.status(201).json({
            _id: newInvoice._id,
            invoiceNumber: newInvoice.invoiceNumber,
            customer: newInvoice.customer,
            amount: newInvoice.amount,
            paid: newInvoice.paid,
            status: newInvoice.status,
            items: newInvoice.items,
            createdAt: newInvoice.createdAt,
            updatedAt: newInvoice.updatedAt
        });

    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const editInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const { customer, amount, paid, status, items } = req.body;

        if (!customer || !status) {

            return res.status(400).json({ message: "Missing required fields" });

        }

        if (typeof items !== "object" || items.length === 0) return res.status(400).json({ message: "Missing data" });

        items.forEach(item => {
            const { name, quantity, unitCost } = item;

            if (!name || !quantity || !unitCost) {
                return res.status(400).json({ message: "Missing data" })
            }
        })

        let newPaid = paid;
        let newAmount = amount;

        if (!paid || paid === 0) newPaid = 0

        if (!amount || amount === 0) newAmount = 0

        const newInvoice = {
            customer,
            amount: newAmount,
            paid: newPaid,
            status,
            items
        };

        const updatedInvoice = await INVOICE.findByIdAndUpdate(id, newInvoice, { new: true });

        res.status(200).json(updatedInvoice);

    } catch (error) {
        console.error("Error editing invoice:", error);
        res.status(404).json({ message: error.message });
    }
}

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        await INVOICE.findByIdAndDelete(id);
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        console.error("Error deleting invoice:", error);
        res.status(404).json({ message: error.message });
    }
}