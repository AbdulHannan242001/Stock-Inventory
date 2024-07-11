import React, { useState, useEffect, useContext } from 'react';
import Card from '../../components/Card';
import { PiChartLineUpThin, PiChartLineDownThin } from "react-icons/pi";
import rec from "../../assets/rec.png";
import dol from "../../assets/dollar.png";
import exp from "../../assets/expense.png";
import sent from "../../assets/sent.png";
import handShake from "../../assets/handShake.png";
import LineChart from '../../components/LineChart';
import DoughnutChart from '../../components/DoughnutChart';
import InventoryContext from '../../context/InventoryContext/inventoryContext';
import InvoiceContext from '../../context/InvoiceContext/invoiceContext';
import OrderContext from '../../context/OrderContext/orderContext';

const Home = () => {
    const inventoryContext = useContext(InventoryContext);
    const invoiceContext = useContext(InvoiceContext);
    const orderContext = useContext(OrderContext);
    const { inventoryData } = inventoryContext;
    const { invoice } = invoiceContext;
    const { orderList } = orderContext;
    const [inventory, setInventory] = useState([]);
    const [invoiceData, setInvoiceData] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        setInventory(inventoryData);
        setInvoiceData(invoice);
        setOrder(orderList);
    }, [inventoryData, invoice, orderList]);

    // const getCurrentMonth = () => new Date().getMonth();
    // const getPreviousMonth = () => (new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1);

    // const getCurrentYear = () => new Date().getFullYear();
    // const getPreviousMonthYear = () => (new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear());

    const filterByDate = (data, month, year) => {
        return data.filter(item => {
            const itemDate = new Date(item.date);
            console.log(item.date)
            return itemDate.getMonth() === month && itemDate.getFullYear() === year;
        });
    };

    const calculateTotal = (data, method) => data.reduce((total, item) => {
        const filteredLog = item.inventoryLog.filter(log => log.methode === method);
        const sum = filteredLog.reduce((subTotal, log) => subTotal + (log.price * log.quantity), 0);
        return total + sum;
    }, 0).toFixed(2);

    const calculateChange = (current, previous) => {
        if (previous === 0) return 100;
        return (((current - previous) / previous) * 100).toFixed(2);
    };

    // const currentMonthInventory = filterByDate(inventory, getCurrentMonth, getCurrentYear);
    // const previousMonthInventory = filterByDate(inventory, getPreviousMonth, getPreviousMonthYear);
    // const currentMonthInvoices = filterByDate(invoiceData, getCurrentMonth, getCurrentYear);
    // const previousMonthInvoices = filterByDate(invoiceData, getPreviousMonth, getPreviousMonthYear);
    // const currentMonthOrders = filterByDate(order, getCurrentMonth, getCurrentYear);
    // const previousMonthOrders = filterByDate(order, getPreviousMonth, getPreviousMonthYear);

    // console.log({
    //     currentMonthInvoices: currentMonthInvoices,
    //     previousMonthInvoices: previousMonthInvoices,
    //     currentMonthOrders: currentMonthOrders,
    //     previousMonthOrders: previousMonthOrders,
    //     currentMonthInventory: currentMonthInventory,
    //     previousMonthInventory: previousMonthInventory
    // });

    // Calculate total values for current month
    const totalSales = calculateTotal(inventory, "Removed");
    const totalExpenses = calculateTotal(inventory, "Added");

    const dueFilter = invoiceData.filter(i => i.status === "Due");
    const totalDueAmount = dueFilter.reduce((total, item) => total + (item.amount - item.paid), 0).toFixed(2);

    const unPaidFilter = invoiceData.filter(i => i.status === "Unpaid");
    const totalUnpaidAmount = unPaidFilter.reduce((total, item) => total + item.amount, 0).toFixed(2);
    const paymentPending = (parseFloat(totalUnpaidAmount) + parseFloat(totalDueAmount)).toFixed(2);

    const totalDueReceived = dueFilter.reduce((total, item) => total + item.paid, 0).toFixed(2);
    const paidFilter = invoiceData.filter(i => i.status === "Paid");
    const totalPaidAmount = paidFilter.reduce((total, item) => total + item.amount, 0).toFixed(2);

    const filterOrder = order.filter(i => i.payStatus === "Paid");
    const totalOrderPaid = filterOrder.reduce((total, item) => total + item.items.reduce((subTotal, log) => subTotal + (log.unitCost * log.quantity), 0), 0).toFixed(2);
    const paymentSent = (totalOrderPaid);
    const paymentReceived = (parseFloat(totalDueReceived) + parseFloat(totalPaidAmount)).toFixed(2);

    const previousTotalSales = 6000;
    const previousTotalExpenses = 110000;
    const previousPaymentPending = 3000;
    const previousPaymentSent = 120000;
    const previousPaymentReceived = 3200;

    // For demo purposes, using fixed previous values (in a real scenario, fetch the previous month's data)

    // const previousTotalSales = calculateTotal(previousMonthInventory, "Removed");
    // const previousTotalExpenses = calculateTotal(previousMonthInventory, "Added");

    // const previousDueFilter = previousMonthInvoices.filter(i => i.status === "Due");
    // const previousTotalDueAmount = previousDueFilter.reduce((total, item) => total + (item.amount - item.paid), 0).toFixed(2);

    // const previousUnPaidFilter = previousMonthInvoices.filter(i => i.status === "Unpaid");
    // const previousTotalUnpaidAmount = previousUnPaidFilter.reduce((total, item) => total + item.amount, 0).toFixed(2);
    // const previousPaymentPending = (parseFloat(previousTotalUnpaidAmount) + parseFloat(previousTotalDueAmount)).toFixed(2);

    // const previousTotalDueReceived = previousDueFilter.reduce((total, item) => total + item.paid, 0).toFixed(2);
    // const previousPaidFilter = previousMonthInvoices.filter(i => i.status === "Paid");
    // const previousTotalPaidAmount = previousPaidFilter.reduce((total, item) => total + item.amount, 0).toFixed(2);

    // const previousFilterOrder = previousMonthOrders.filter(i => i.payStatus === "Paid");
    // const previousTotalOrderPaid = previousFilterOrder.reduce((total, item) => total + item.items.reduce((subTotal, log) => subTotal + (log.unitCost * log.quantity), 0), 0).toFixed(2);
    // const previousPaymentSent = (previousTotalOrderPaid);
    // const previousPaymentReceived = (parseFloat(previousTotalDueReceived) + parseFloat(previousTotalPaidAmount)).toFixed(2);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-around gap-x-4 p-4'>
                <Card
                    title={"Total Sales"}
                    value={`$${totalSales}`}
                    icon={<PiChartLineUpThin />}
                    num={calculateChange(totalSales, previousTotalSales)}
                    svg={dol}
                />
                <Card
                    title={"Payment Received"}
                    value={`$${paymentReceived}`}
                    icon={<PiChartLineDownThin />}
                    num={calculateChange(paymentReceived, previousPaymentReceived)}
                    svg={rec}
                />
                <Card
                    title={"Total Pending"}
                    value={`$${paymentPending}`}
                    icon={<PiChartLineUpThin />}
                    num={calculateChange(paymentPending, previousPaymentPending)}
                    svg={handShake}
                />
                <Card
                    title={"Total Expense"}
                    value={`$${totalExpenses}`}
                    icon={<PiChartLineUpThin />}
                    num={calculateChange(totalExpenses, previousTotalExpenses)}
                    svg={exp}
                />
                <Card
                    title={"Payment Sent"}
                    value={`$${paymentSent}`}
                    icon={<PiChartLineUpThin />}
                    num={calculateChange(paymentSent, previousPaymentSent)}
                    svg={sent}
                />
            </div>
            <hr className='mx-4' />
            <div className='p-4 gap-x-3 flex'>
                <div className='w-8/12'>
                    <LineChart inventory={inventory} />
                </div>
                <div className='w-4/12'>
                    <DoughnutChart inventory={inventory} />
                </div>
            </div>
        </div>
    );
}

export default Home;
