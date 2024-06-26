import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { PiChartLineUpThin, PiChartLineDownThin } from "react-icons/pi";
import rec from "../assets/rec.png";
import dol from "../assets/dollar.png";
import exp from "../assets/expense.png";
import sent from "../assets/sent.png";
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import axios from 'axios';

const Home = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const inventoryData = response.data.map(item => ({
                    id: item.id,
                    name: `Item ${item.id}`,
                    quantity: Math.floor(Math.random() * 200),
                    price: parseFloat((Math.random() * 100).toFixed(2)),
                    category: ['Electronics', 'Clothing', 'Furniture'][Math.floor(Math.random() * 3)],
                }));
                setInventory(inventoryData);
            })
            .catch(error => console.error('Error fetching inventory:', error));
    }, []);

    const totalSales = inventory.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    const totalExpenses = (totalSales * 0.25).toFixed(2); // assuming 25% of sales is expense for illustration
    const paymentSent = (totalSales * 0.5).toFixed(2); // assuming 50% of sales as payment sent for illustration
    const paymentReceived = (totalSales * 0.75).toFixed(2); // assuming 75% of sales as payment received for illustration

    return (
        <div className='w-full'>
            <div className='w-full flex justify-around gap-x-4 p-4'>
                <Card title={"Total Sales"} value={`$${totalSales}`} icon={<PiChartLineUpThin />} num={25} svg={dol} />
                <Card title={"Total Expense"} value={`$${totalExpenses}`} icon={<PiChartLineUpThin />} num={25} svg={exp} />
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
