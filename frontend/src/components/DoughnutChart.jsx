import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ inventory }) => {
    const categories = inventory && [...new Set(inventory.map(item => item.category))];
    const categorySales = inventory.map(item => {
        return item.inventoryLog.reduce((itemTotal, log) => {
            if (log.methode === "Removed") {
                return itemTotal + (log.quantity * log.price);
            }
            return itemTotal;
        }, 0);
    });

    const data = {
        labels: categories,
        datasets: [
            {
                data: categorySales,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className='bg-white rounded-lg border'>
            <div className='flex items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
                <h1 className='text-lg font-bold'>Sales Distribution by Category</h1>
            </div>
            <div className='h-[315px] p-4'>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default DoughnutChart;
