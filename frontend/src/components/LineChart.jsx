import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Dropdown from './Dropdown';
import Chart from 'chart.js/auto';

const LineChart = ({ inventory }) => {
    const [timeRange, setTimeRange] = useState('1 month');

    const handleSelect = (range) => {
        setTimeRange(range);
    };

    const labels = inventory.map(item => item.name);

    const salesData = inventory.map(item => {
        return item.inventoryLog.reduce((itemTotal, log) => {
            if (log.methode === "Removed") {
                return itemTotal + (log.quantity * log.price);
            }
            return itemTotal;
        }, 0);
    });

    const purchaseData = inventory.map(item => {
        return item.inventoryLog.reduce((itemTotal, log) => {
            if (log.methode === "Added") {
                return itemTotal + (log.quantity * log.price);
            }
            return itemTotal;
        }, 0);
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: salesData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            },
            {
                label: 'Purchases',
                data: purchaseData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    useEffect(() => {
        Chart.defaults.font.family = 'Arial';
    }, []);

    return (
        <div className='bg-white rounded-lg border h-auto'>
            <div className='flex items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
                <h1 className='text-lg font-bold'>Sales & Purchases</h1>
                <Dropdown onSelect={handleSelect} />
            </div>
            <div className='h-[300px] p-4'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default LineChart;
