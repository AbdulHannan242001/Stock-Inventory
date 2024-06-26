import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Dropdown from './Dropdown';
import Chart from 'chart.js/auto';

const LineChart = ({ inventory }) => {
    const [timeRange, setTimeRange] = useState('1 month');

    const handleSelect = (range) => {
        setTimeRange(range);
        // Logic to update the data based on range
    };

    const labels = inventory.map(item => item.name);
    const salesData = inventory.map(item => item.price * item.quantity);
    const purchaseData = salesData.map(value => value * 0.75); // assuming 75% of sales as purchases for illustration

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: salesData,
                borderColor: 'rgba(75, 192, 192)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Purchases',
                data: purchaseData,
                borderColor: 'rgba(153, 102, 255)',
                fill: false,
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
                    display: false
                },
            }
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
