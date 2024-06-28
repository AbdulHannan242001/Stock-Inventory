export const generateOrderNumber = () => {
    return 'ODR-' + Math.floor(100000 + Math.random() * 900000).toString();
};
