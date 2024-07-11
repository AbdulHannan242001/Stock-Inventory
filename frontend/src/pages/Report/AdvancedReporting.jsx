import React, { useContext, useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
// import ExpenseContext from '../../context/ExpenseContext/expenseContext';
import InventoryContext from '../../context/InventoryContext/inventoryContext';

const AdvancedReporting = () => {
    const invContext = useContext(InventoryContext);
    const { inventoryData } = invContext;
    const [inventoryState, setInventoryState] = useState([]);
    const [reportType, setReportType] = useState('profit-loss');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInventoryState(inventoryData);
    }, [inventoryData]);

    // const getUniqueCategory = () => {
    //     let uniqueCategory = [];
    //     inventoryState.forEach((inven) => {
    //         if (!uniqueCategory.includes(inven.category)) {
    //             uniqueCategory.push(inven.category);
    //         }
    //     });
    //     return uniqueCategory;
    // };

    // const uniqueCategory = getUniqueCategory();

    const handleGenerateReport = async () => {
        setLoading(true);
        try {
            let mockData = [];
            inventoryState.forEach((item) => {
                item.inventoryLog.forEach((i) => {
                    mockData.push({
                        id: i._id,
                        date: i.date.split('T')[0],
                        amount: i.price, // If the method is "Removed" then Price refer to the selling price of single item else unitCost === amount
                        quantity: i.quantity,
                        method: i.methode,
                        unitCost: item.unitCost,
                        category: item.category
                    });
                });
            });

            if (startDate && endDate) {
                mockData = mockData.filter((item) => {
                    const date = new Date(item.date);
                    return date >= new Date(startDate) && date <= new Date(endDate);
                });
            }

            if (startDate && !endDate) {
                mockData = mockData.filter((item) => {
                    const date = new Date(item.date);
                    return date >= new Date(startDate);
                });
            }

            if (!startDate && endDate) {
                mockData = mockData.filter((item) => {
                    const date = new Date(item.date);
                    return date <= new Date(endDate);
                });
            }

            let processedData;
            if (reportType === 'profit-loss') {
                processedData = processProfitLossData(mockData);
            } else {
                processedData = processBalanceSheetData(mockData);
            }

            setReportData(processedData);
        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setLoading(false);
        }
    };

    const processProfitLossData = (data) => {
        const revData = data.filter((item) => item.method === 'Removed');
        const revenue = revData.reduce((sum, item) => sum + item.amount * item.quantity, 0);
        const cogs = revData.reduce((sum, item) => sum + item.unitCost * item.quantity, 0);
        const qogs = revData.reduce((sum, item) => sum + item.quantity, 0);
        const grossProfit = revenue - cogs;
        const netIncome = grossProfit;
        return {
            revenue,
            cogs,
            grossProfit,
            qogs,
            netIncome
        };
    };

    const processBalanceSheetData = (data) => {
        const assets = data.reduce((sum, item) => sum + item.amount, 0);
        const liabilities = assets * 0.5;
        const equity = assets - liabilities;

        return {
            currentAssets: assets * 0.6,
            nonCurrentAssets: assets * 0.4,
            currentLiabilities: liabilities * 0.6,
            longTermLiabilities: liabilities * 0.4,
            equity,
            totalAssets: assets,
            totalLiabilities: liabilities
        };
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        if (reportType === 'profit-loss') {
            doc.text('Profit and Loss Statement', 10, 10);
            doc.autoTable({
                head: [['Category', 'Info']],
                body: [
                    ['Revenue', `$${reportData.revenue.toFixed(2)}`],
                    ['Cost of Goods Sold', `$${reportData.cogs.toFixed(2)}`],
                    ['Gross Profit', `$${reportData.grossProfit.toFixed(2)}`],
                    ['Quantity of Goods Sold', reportData.qogs + ' ' + 'items'],
                    // ['Operating Expenses', `$${reportData.operatingExpenses.toFixed(2)}`],
                    // ['Operating Income', `$${reportData.operatingIncome.toFixed(2)}`],
                    // ['Taxes', `$${reportData.taxes.toFixed(2)}`],
                    ['Net Income', `$${reportData.netIncome.toFixed(2)}`]
                ]
            });
        } else {
            doc.text('Balance Sheet', 10, 10);
            doc.autoTable({
                head: [['Category', 'Info']],
                body: [
                    ['Current Assets', `$${reportData.currentAssets.toFixed(2)}`],
                    ['Non-current Assets', `$${reportData.nonCurrentAssets.toFixed(2)}`],
                    ['Total Assets', `$${reportData.totalAssets.toFixed(2)}`],
                    ['Current Liabilities', `$${reportData.currentLiabilities.toFixed(2)}`],
                    ['Long-term Liabilities', `$${reportData.longTermLiabilities.toFixed(2)}`],
                    ['Total Liabilities', `$${reportData.totalLiabilities.toFixed(2)}`],
                    ['Equity', `$${reportData.equity.toFixed(2)}`]
                ]
            });
        }
        doc.save(`${reportType}-${startDate}-${endDate}.pdf`);
    };

    const handleDownloadExcel = () => {
        let worksheet;
        if (reportType === 'profit-loss') {
            worksheet = XLSX.utils.aoa_to_sheet([
                ['Category', 'Info'],
                ['Revenue', reportData.revenue.toFixed(2)],
                ['Cost of Goods Sold', reportData.cogs.toFixed(2)],
                ['Gross Profit', reportData.grossProfit.toFixed(2)],
                ['Quantity of Goods Sold', reportData.qogs + ' ' + 'items'],
                // ['Operating Expenses', reportData.operatingExpenses.toFixed(2)],
                // ['Operating Income', reportData.operatingIncome.toFixed(2)],
                // ['Taxes', reportData.taxes.toFixed(2)],
                ['Net Income', reportData.netIncome.toFixed(2)]
            ]);
        } else {
            worksheet = XLSX.utils.aoa_to_sheet([
                ['Category', 'Info'],
                ['Current Assets', reportData.currentAssets.toFixed(2)],
                ['Non-current Assets', reportData.nonCurrentAssets.toFixed(2)],
                ['Total Assets', reportData.totalAssets.toFixed(2)],
                ['Current Liabilities', reportData.currentLiabilities.toFixed(2)],
                ['Long-term Liabilities', reportData.longTermLiabilities.toFixed(2)],
                ['Total Liabilities', reportData.totalLiabilities.toFixed(2)],
                ['Equity', reportData.equity.toFixed(2)]
            ]);
        }
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        XLSX.writeFile(workbook, `${reportType}-${startDate}-${endDate}.xlsx`);
    };

    const handleReportTypeChange = (e) => {
        setReportType(e.target.value);
        setReportData(null);
    };

    return (
        <div className="w-2/4 mx-auto p-4 pt-6 md:p-6 md:pt-12 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center text-primary-dark">Financial Reporting</h1>
            <form className="space-y-4">
                <div className='mb-4'>
                    <label className="block text-sm font-semibold mb-2">Report Type</label>
                    <select
                        value={reportType}
                        onChange={handleReportTypeChange}
                        className="w-full p-2 pl-10 text-sm text-neutral-500 bg-neutral-lightGray border"
                        disabled
                    >
                        <option value="profit-loss">Profit and Loss Statement</option>
                        <option value="balance-sheet">Balance Sheet</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className="block text-sm font-semibold mb-2">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 pl-10 text-sm text-neutral-mediumGray bg-neutral-lightGray border"
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-sm font-semibold mb-2">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 pl-10 text-sm text-neutral-mediumGray bg-neutral-lightGray border"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={handleGenerateReport}
                        className="bg-secondary text-white p-2 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                    <button
                        type="button"
                        onClick={handleDownloadPDF}
                        className="bg-primary text-white p-2 rounded-lg"
                        disabled={!reportData}
                    >
                        Download PDF
                    </button>
                    <button
                        type="button"
                        onClick={handleDownloadExcel}
                        className="bg-primary text-white p-2 rounded-lg"
                        disabled={!reportData}
                    >
                        Download Excel
                    </button>
                </div>
            </form>
            {reportData && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Report Data</h2>
                    <div className="overflow-x-auto">
                        {reportType === 'profit-loss' ? (
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-500">Category</th>
                                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-500">Info</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-2">Revenue</td>
                                        <td className="px-4 py-2">${reportData.revenue.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Cost of Goods Sold</td>
                                        <td className="px-4 py-2">${reportData.cogs.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Gross Profit</td>
                                        <td className="px-4 py-2">${reportData.grossProfit.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Quantity of Goods Sold</td>
                                        <td className="px-4 py-2">{reportData.qogs} items</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="px-4 py-2">Operating Expenses</td>
                                        <td className="px-4 py-2">${reportData.operatingExpenses.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Operating Income</td>
                                        <td className="px-4 py-2">${reportData.operatingIncome.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Taxes</td>
                                        <td className="px-4 py-2">${reportData.taxes.toFixed(2)}</td>
                                    </tr>*/}
                                    <tr>
                                        <td className="px-4 py-2">Net Income</td>
                                        <td className="px-4 py-2">${reportData.netIncome.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-500">Category</th>
                                        <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-500">Info</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-2">Current Assets</td>
                                        <td className="px-4 py-2">${reportData.currentAssets.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Non-current Assets</td>
                                        <td className="px-4 py-2">${reportData.nonCurrentAssets.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Total Assets</td>
                                        <td className="px-4 py-2">${reportData.totalAssets.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Current Liabilities</td>
                                        <td className="px-4 py-2">${reportData.currentLiabilities.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Long-term Liabilities</td>
                                        <td className="px-4 py-2">${reportData.longTermLiabilities.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Total Liabilities</td>
                                        <td className="px-4 py-2">${reportData.totalLiabilities.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Equity</td>
                                        <td className="px-4 py-2">${reportData.equity.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedReporting;
