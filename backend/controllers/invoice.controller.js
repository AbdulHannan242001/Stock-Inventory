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
        const { customer, amount, paid, status } = req.body;

        if (!customer || !amount || !paid || !status) {

            return res.status(400).json({ message: "Missing required fields" });

        }

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

        const newInvoice = new INVOICE({
            invoiceNumber: newInvoiceNum,
            customer,
            amount,
            paid,
            status,
            items: []
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

export const addItem = async (req, res) => {
    try {

        const { id } = req.params;

        const { name, quantity, unitCost } = req.body;

        const existingInvoice = await INVOICE.findById(id);

        if (!existingInvoice) {

            return res.status(404).json({ message: "Invoice not found" });

        }

        existingInvoice.items.push({ name, quantity, unitCost });

        await existingInvoice.save();

        res.status(200).json({
            invoiceNumber: existingInvoice.invoiceNumber,
            customer: existingInvoice.customer,
            amount: existingInvoice.amount,
            paid: existingInvoice.paid,
            status: existingInvoice.status,
            items: existingInvoice.items,
            createdAt: existingInvoice.createdAt,
            updatedAt: existingInvoice.updatedAt
        });

    } catch (error) {

        console.error("Error adding item:", error);

        res.status(500).json({ message: "Internal Server Error" });

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