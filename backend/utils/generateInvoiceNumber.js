export const generateInvoiceNumber = () => {
    return 'INV-' + Math.floor(100000 + Math.random() * 900000).toString();
};
