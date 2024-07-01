// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import moment from 'moment';

// // Helper function to generate random dates within the same year
// const getRandomDate = () => {
//     const start = new Date(new Date().getFullYear(), 0, 1);
//     const end = new Date();
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
// };

// const Expenses = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [filteredExpenses, setFilteredExpenses] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [timeGrouping, setTimeGrouping] = useState('months');
//     const [selectedMonth, setSelectedMonth] = useState('');
//     const [filteredMonthExpenses, setFilteredMonthExpenses] = useState([]);
//     const itemsPerPage = 15;

//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/posts')
//             .then((response) => {
//                 const expensesData = response.data.map((item) => ({
//                     id: item.id,
//                     date: getRandomDate(),
//                     expense: `Expense ${item.userId}`,
//                     amount: parseFloat((Math.random() * 1000).toFixed(2)),
//                     category: ['staff', 'bills', 'purchasing'][Math.floor(Math.random() * 3)],
//                 }));
//                 setExpenses(expensesData);
//                 setFilteredExpenses(expensesData);
//             })
//             .catch((error) => console.error('Error fetching expenses:', error));
//     }, []);

//     useEffect(() => {
//         let results = expenses;
//         if (searchTerm) {
//             results = results.filter((expense) =>
//                 expense.expense.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//         if (selectedCategory) {
//             results = results.filter((expense) => expense.category === selectedCategory);
//         }
//         setFilteredExpenses(results);
//         setCurrentPage(1);
//     }, [searchTerm, selectedCategory, expenses]);

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleCategoryFilter = (e) => {
//         setSelectedCategory(e.target.value);
//     };

//     const handleTimeGroupingChange = (e) => {
//         setTimeGrouping(e.target.value);
//     };

//     const handleMonthFilter = (e) => {
//         const selectedMonthIndex = e.target.value;
//         setSelectedMonth(selectedMonthIndex);

//         const filteredExpenses = expenses.filter((expense) => {
//             const expenseDate = new Date(expense.date);
//             return expenseDate.getMonth() === parseInt(selectedMonthIndex);
//         });
//         setFilteredMonthExpenses(filteredExpenses);
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const totalExpenseByMonth = filteredMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const categoryExpense = filteredMonthExpenses.reduce((acc, expense) => {
//         acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//         return acc;
//     }, {});

//     const mostExpensiveCategoryByMonth = Object.keys(categoryExpense).reduce((a, b) => {
//         const expenseA = filteredMonthExpenses.reduce((sum, expense) => {
//             if (expense.category === a) {
//                 return sum + expense.amount;
//             }
//             return sum;
//         }, 0);
//         const expenseB = filteredMonthExpenses.reduce((sum, expense) => {
//             if (expense.category === b) {
//                 return sum + expense.amount;
//             }
//             return sum;
//         }, 0);
//         return expenseA > expenseB ? a : b;
//     }, '');

//     const groupExpensesByTime = (expenses, timeGrouping) => {
//         return expenses.reduce((acc, expense) => {
//             const timeKey = moment(expense.date, 'MM/DD/YYYY').startOf(timeGrouping).format(timeGrouping === 'months' ? 'MMMM YYYY' : 'ww YYYY');
//             if (!acc[timeKey]) {
//                 acc[timeKey] = { staff: 0, bills: 0, purchasing: 0 };
//             }
//             acc[timeKey][expense.category] += expense.amount;
//             return acc;
//         }, {});
//     };

//     const groupedExpenses = groupExpensesByTime(expenses, timeGrouping);
//     const labels = Object.keys(groupedExpenses);
//     const staffData = labels.map((label) => groupedExpenses[label].staff);
//     const billsData = labels.map((label) => groupedExpenses[label].bills);
//     const purchasingData = labels.map((label) => groupedExpenses[label].purchasing);
//     const currentMonth = new Date().getMonth();
//     const monthOptions = Array.from({ length: 6 }, (_, i) => {
//         const month = (currentMonth - i + 12) % 12;
//         return {
//             value: month,
//             label: moment().month(month).format('MMMM-YYYY'),
//         };
//     });

//     const chartData = {
//         labels,
//         datasets: [
//             {
//                 label: 'Staff',
//                 data: staffData,
//                 fill: false,
//                 backgroundColor: 'rgba(75,192,192,0.2)',
//                 borderColor: 'rgba(75,192,192,1)',
//             },
//             {
//                 label: 'Bills',
//                 data: billsData,
//                 fill: false,
//                 backgroundColor: 'rgba(255,99,132,0.2)',
//                 borderColor: 'rgba(255,99,132,1)',
//             },
//             {
//                 label: 'Purchasing',
//                 data: purchasingData,
//                 fill: false,
//                 backgroundColor: 'rgba(54,162,235,0.2)',
//                 borderColor: 'rgba(54,162,235,1)',
//             },
//         ],
//     };

//     return (
//         <div className="w-full p-4 bg-white rounded-lg shadow-lg">
//             <div className="mb-4">
//                 <h1 className="text-3xl font-semibold text-center text-primary-dark">Expense List</h1>
//             </div>
//             <div className="flex flex-wrap justify-between mb-4">
//                 <div className="w-8/12 p-4 border rounded-lg shadow-lg">
//                     <div className="flex items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
//                         <h1 className="text-lg font-bold">Expenses</h1>
//                         <select
//                             className="text-sm text-secondary-dark border bg-white p-2 rounded-lg"
//                             value={timeGrouping}
//                             onChange={handleTimeGroupingChange}
//                         >
//                             <option value="months">Monthly</option>
//                             <option value="weeks">Weekly</option>
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <div className="w-full ">
//                             <Line data={chartData} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-3/12 space-y-5 p-5 ">
//                     <div className="flex justify-end mx-auto p-4">
//                         <select
//                             className="text-sm text-secondary-dark border border-secondary-dark bg-white p-2 rounded-lg"
//                             value={selectedMonth}
//                             onChange={handleMonthFilter}
//                         >
//                             {monthOptions.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="border-2 rounded-lg shadow-lg p-4 bg-gray-100">
//                         <h2 className="text-center font-semibold text-primary-dark">Total Expense</h2>
//                         <p className="text-center text-2xl font-semibold py-2 text-secondary-dark">${totalExpenseByMonth.toFixed(2)}</p>
//                     </div>
//                     <div className="border-2 rounded-lg shadow-lg p-4 bg-gray-100">
//                         <h2 className="text-center font-semibold text-primary-dark">Most Expensive Category</h2>
//                         <p className="text-center text-2xl font-semibold py-2 text-secondary-dark">{mostExpensiveCategoryByMonth} - ${categoryExpense[mostExpensiveCategoryByMonth]?.toFixed(2)}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
//                 <input
//                     type="text"
//                     placeholder="Search expenses..."
//                     className="text-sm text-secondary-dark bg-white p-2 rounded-lg placeholder-secondary-dark"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 />
//                 <select
//                     className="text-sm text-secondary-dark bg-white p-2 rounded-lg"
//                     value={selectedCategory}
//                     onChange={handleCategoryFilter}
//                 >
//                     <option value="">All Categories</option>
//                     <option value="staff">Staff</option>
//                     <option value="bills">Bills</option>
//                     <option value="purchasing">Purchasing</option>
//                 </select>
//                 <Link to="/expenses/new" className="text-sm text-white bg-secondary p-2 rounded-lg">Add New Expense</Link>
//             </div>
//             <table className="w-full mt-4">
//                 <thead>
//                     <tr className="bg-secondary-dark text-white">
//                         <th className="p-2">Date</th>
//                         <th className="p-2">Expense Name</th>
//                         <th className="p-2">Category</th>
//                         <th className="p-2">Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map((expense) => (
//                         <tr key={expense.id} className="border-b border-secondary-light hover:bg-gray-100">
//                             <td className="text-center p-2">{expense.date}</td>
//                             <td className="text-center p-2">{expense.expense}</td>
//                             <td className="text-center p-2">{expense.category}</td>
//                             <td className="text-center p-2">${expense.amount.toFixed(2)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="flex justify-center mt-4">
//                 <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="text-sm px-4 py-2 mx-1 rounded text-white bg-secondary disabled:opacity-50"
//                 >
//                     Previous
//                 </button>
//                 {[...Array(totalPages).keys()].map((number) => (
//                     <button
//                         key={number + 1}
//                         onClick={() => paginate(number + 1)}
//                         className={`text-sm px-4 py-2 mx-1 rounded ${currentPage === number + 1 ? 'bg-primary-dark text-white' : 'bg-secondary text-white'}`}
//                     >
//                         {number + 1}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="text-sm px-4 py-2 mx-1 rounded text-white bg-secondary disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Expenses;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';
import ExpenseContext from '../../context/ExpenseContext/expenseContext';

const Expenses = () => {
    const context = useContext(ExpenseContext);
    const { expense } = context;
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [uniqueCategory, setUniqueCategory] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [timeGrouping, setTimeGrouping] = useState('months');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filteredMonthExpenses, setFilteredMonthExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const itemsPerPage = 15;
    const [uniqueMonths, setUniqueMonths] = useState([]);

    useEffect(() => {
        setExpenses(expense);
        setFilteredExpenses(expense);
    }, [expense]);
    const getUniqueCategory = () => {
        let uniqueCategory = [];
        expenses.forEach((expense) => {
            if (!uniqueCategory.includes(expense.category)) {
                uniqueCategory.push(expense.category);

            }
        });
        return uniqueCategory;
    }
    useEffect(() => {
        const unique = getUniqueCategory();
        setUniqueCategory(unique);
    }, [expenses]);

    useEffect(() => {
        let results = expenses;
        if (searchTerm) {
            results = results.filter((expense) =>
                expense.expense.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory) {
            results = results.filter((expense) => expense.category === selectedCategory);
        }
        if (sortConfig.key) {
            results = [...results].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredExpenses(results);
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, expenses, sortConfig]);

    useEffect(() => {
        let results = []
        const uniqueMonths = expenses
            .map((expense) => moment(expense.date).format('MMMM') + '-' + moment(expense.date).format('YYYY'))
            .filter((value, index, self) => self.indexOf(value) === index);

        uniqueMonths.forEach((month) => {
            const date = moment(month, 'MMMM-YYYY');
            const indexOfMonth = date.month();
            results.push({
                label: date._i,
                value: indexOfMonth
            })
        });
        setUniqueMonths(results);
        setSelectedMonth(results[0]);
    }, [expenses]);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryFilter = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleTimeGroupingChange = (e) => {
        setTimeGrouping(e.target.value);
    };

    const handleMonthFilter = (e) => {
        const selectedMonthIndex = e.target.value;
        setSelectedMonth(selectedMonthIndex);

        const filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === parseInt(selectedMonthIndex);
        });
        setFilteredMonthExpenses(filteredExpenses);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        const totalExpenseByMonth = filteredMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalExpense(totalExpenseByMonth);
    }, [selectedMonth, expenses]);
    const categoryExpense = filteredMonthExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const mostExpensiveCategoryByMonth = Object.keys(categoryExpense).reduce((a, b) => {
        const expenseA = filteredMonthExpenses.reduce((sum, expense) => {
            if (expense.category === a) {
                return sum + expense.amount;
            }
            return sum;
        }, 0);
        const expenseB = filteredMonthExpenses.reduce((sum, expense) => {
            if (expense.category === b) {
                return sum + expense.amount;
            }
            return sum;
        }, 0);
        return expenseA > expenseB ? a : b;
    }, '');

    const groupExpensesByTime = (expenses, timeGrouping) => {
        const uniqueCategory = getUniqueCategory();
        return expenses.reduce((acc, expense) => {
            const date = new Date(new Date(expense.date));
            const timeKey = moment(date, 'MM/DD/YYYY').startOf(timeGrouping).format(timeGrouping === 'months' ? 'MMMM YYYY' : 'ww YYYY');
            if (!acc[timeKey]) {
                uniqueCategory.forEach((category) => {
                    acc[timeKey] = { ...acc[timeKey], [category]: 0 };
                });
            }
            acc[timeKey][expense.category] += parseInt(expense.amount);
            return acc;
        }, {});
    };

    const groupedExpenses = groupExpensesByTime(expenses, timeGrouping);
    const labels = Object.keys(groupedExpenses);

    const getData = (category) => {
        return labels.map((label) => groupedExpenses[label][category]);
    }

    const colors = [
        'rgba(255, 99, 132', 'rgba(54, 162, 235', 'rgba(255, 206, 86', 'rgba(75, 192, 192', 'rgba(153, 102, 255',
        'rgba(255, 159, 64', 'rgba(255, 205, 86', 'rgba(201, 203, 207', 'rgba(255, 87, 51', 'rgba(51, 255, 87',
        'rgba(51, 87, 255', 'rgba(255, 51, 161', 'rgba(161, 255, 51', 'rgba(51, 255, 246', 'rgba(255, 145, 51',
        'rgba(145, 51, 255', 'rgba(51, 255, 145', 'rgba(145, 51, 255', 'rgba(51, 161, 255', 'rgba(246, 51, 255'
    ];


    const handleChartData = () => {
        let dataSet = [];
        let length = 0;
        uniqueCategory.length > 0 && uniqueCategory.forEach((category) => {
            const data = getData(category);
            const color = colors[length];
            let newArr = {
                label: category,
                data: data,
                fill: false,
                backgroundColor: `${color}, 0.5)`,
                borderColor: `${color}, 1)`,
            }
            length += 1;
            dataSet.push(newArr);
        })

        return dataSet || [];
    }
    const dataset = handleChartData();
    const chartData = {
        labels,
        datasets: dataset
    };

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold text-center text-primary-dark">Expense List</h1>
            </div>
            <div className="flex flex-wrap justify-between mb-4">
                <div className="w-8/12 p-4 border rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                        <h1 className="text-lg font-bold">Expenses</h1>
                        <select
                            className="text-sm text-secondary-dark border bg-white p-2 rounded-lg"
                            value={timeGrouping}
                            onChange={handleTimeGroupingChange}
                        >
                            <option value="months">Monthly</option>
                            <option value="weeks">Weekly</option>
                        </select>
                    </div>
                    <div className="">
                        <div className="h-[500px] w-full">
                            <Line data={chartData} />
                        </div>
                    </div>
                </div>
                <div className="w-3/12 space-y-5 p-5 ">
                    <div className="flex justify-end mx-auto p-4">
                        <select
                            className="text-sm text-secondary-dark border border-secondary-dark bg-white p-2 rounded-lg"
                            value={selectedMonth}
                            onChange={handleMonthFilter}
                        >
                            <option value="">-------</option>
                            {uniqueMonths.length > 0 && uniqueMonths.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="border-2 rounded-lg shadow-lg p-4 bg-gray-100">
                        <h2 className="text-center font-semibold text-primary-dark">Total Expense</h2>
                        <p className="text-center text-2xl font-semibold py-2 text-secondary-dark">${totalExpense.toFixed(2) }
                        </p>
                    </div>
                    <div className="border-2 rounded-lg shadow-lg p-4 bg-gray-100">
                        <h2 className="text-center font-semibold text-primary-dark">Most Expensive Category</h2>
                        <p className="text-center text-2xl font-semibold py-2 text-secondary-dark">{mostExpensiveCategoryByMonth} - ${categoryExpense[mostExpensiveCategoryByMonth]?.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Search expenses..."
                    className="text-sm text-secondary-dark bg-white p-2 rounded-lg placeholder-secondary-dark"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select
                    className="text-sm text-secondary-dark bg-white p-2 rounded-lg"
                    value={selectedCategory}
                    onChange={handleCategoryFilter}
                >
                    <option value="">All Categories</option>
                    {uniqueCategory.length > 0 && uniqueCategory.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <Link to="/expenses/new" className="text-sm text-white bg-secondary p-2 rounded-lg">Add New Expense</Link>
            </div>
            <table className="w-full mt-4">
                <thead>
                    <tr className="bg-secondary-dark text-white">
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('date')}>
                            Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('expense')}>
                            Expense Name {sortConfig.key === 'expense' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('category')}>
                            Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('amount')}>
                            Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((expense) => (
                        <tr key={expense._id} className="border-b border-secondary-light hover:bg-gray-100">
                            <td className="text-center p-2">{(expense.date).toString().substring(0, 10)}</td>
                            <td className="text-center p-2">{expense.expenseName}</td>
                            <td className="text-center p-2">{expense.category}</td>
                            <td className="text-center p-2">${expense.amount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-sm px-4 py-2 mx-1 rounded text-white bg-secondary disabled:opacity-50"
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`text-sm px-4 py-2 mx-1 rounded ${currentPage === number + 1 ? 'bg-primary-dark text-white' : 'bg-secondary text-white'}`}
                    >
                        {number + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-sm px-4 py-2 mx-1 rounded text-white bg-secondary disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Expenses;
