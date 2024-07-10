import React, { useState, useEffect, useContext } from 'react';
import Card from '../../components/Card';
import { PiChartLineUpThin, PiChartLineDownThin } from "react-icons/pi";
import rec from "../../assets/rec.png";
import dol from "../../assets/dollar.png";
import exp from "../../assets/expense.png";
import sent from "../../assets/sent.png";
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

    const totalSales = inventory.reduce((total, item) => {
        const removedCost = item.inventoryLog
            .filter(log => log.methode === "Removed")
            .reduce((subTotal, log) => subTotal + (log.price * log.quantity), 0);
        return total + removedCost;
    }, 0).toFixed(2);

    const totalExpenses = inventory.reduce((total, item) => {
        const removedCost = item.inventoryLog
            .filter(log => log.methode === "Added")
            .reduce((subTotal, log) => subTotal + (log.price * log.quantity), 0);
        return total + removedCost;
    }, 0).toFixed(2);

    const dueFilter = invoiceData.filter(i => i.status === "Due");

    const totalDueAmount = dueFilter.reduce((total, item) => {
        const dueAmount = item.amount - item.paid;
        return total + dueAmount;
    }, 0).toFixed(2);

    const unPaidFilter = invoiceData.filter(i => i.status === "Unpaid");

    const totalUnpaidAmount = unPaidFilter.reduce((total, item) => {
        return total + item.amount;
    }, 0).toFixed(2);

    const paymentPending = (parseFloat(totalUnpaidAmount) + parseFloat(totalDueAmount)).toFixed(2);

    const totalDueRecieved = dueFilter.reduce((total, item) => {
        const dueAmount = item.paid;
        return total + dueAmount;
    }, 0).toFixed(2);

    const paidFilter = invoiceData.filter(i => i.status === "Paid");

    const totalPaidAmount = paidFilter.reduce((total, item) => {
        return total + item.amount;
    }, 0).toFixed(2);

    const filterOrder = order.filter(i => i.payStatus === "Paid");

    const totalOrderPaid = filterOrder.reduce((total, item) => {
        const paidCost = item.items
            .reduce((subTotal, log) => subTotal + (log.unitCost * log.quantity), 0);
        return total + paidCost;
    }, 0).toFixed(2);

    const paymentSent = (totalOrderPaid);

    const paymentReceived = (parseFloat(totalDueRecieved) + parseFloat(totalPaidAmount)).toFixed(2);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-around gap-x-4 p-4'>
                <Card title={"Total Sales"} value={`$${totalSales}`} icon={<PiChartLineUpThin />} num={25} svg={dol} />
                <Card title={"Total Expense"} value={`$${totalExpenses}`} icon={<PiChartLineUpThin />} num={25} svg={exp} />
                <Card title={"Total Pending"} value={`$${paymentPending}`} icon={<PiChartLineUpThin />} num={25} svg={exp} />
                <Card title={"Payment Sent"} value={`$${paymentSent}`} icon={<PiChartLineUpThin />} num={25} svg={sent} />
                <Card title={"Payment Received"} value={`$${paymentReceived}`} icon={<PiChartLineDownThin />} num={25} svg={rec} />
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
