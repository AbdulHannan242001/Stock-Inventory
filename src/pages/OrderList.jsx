import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [filterStatus, setFilterStatus] = useState('');
    const [showOverdue, setShowOverdue] = useState(false);
    const [showIncomplete, setShowIncomplete] = useState(false);
    const itemsPerPage = 10;
    const today = new Date().toLocaleDateString();

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const ordersData = response.data.map(item => ({
                    id: item.id,
                    date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))).toLocaleDateString(),
                    deliveryDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30))).toLocaleDateString(),
                    status: ['Pending', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)],
                    deliveryStatus: ['On Time', 'Overdue', 'Incomplete'][Math.floor(Math.random() * 3)],
                    items: Math.floor(Math.random() * 5) + 1,
                    totalPrice: parseFloat((Math.random() * 100).toFixed(2)),
                }));
                setOrders(ordersData);
                setDisplayedOrders(ordersData.slice(0, itemsPerPage));
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    useEffect(() => {
        let filteredOrders = orders.filter(order =>
            order.id.toString().includes(searchTerm) ||
            order.date.includes(searchTerm) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.deliveryDate.includes(searchTerm) ||
            order.deliveryStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filterStatus) {
            filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
        }

        if (sortConfig.key) {
            filteredOrders.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        if (showOverdue) {
            filteredOrders = filteredOrders.filter(order => order.deliveryStatus === 'Overdue');
        } else if (showIncomplete) {
            filteredOrders = filteredOrders.filter(order => order.deliveryStatus === 'Incomplete');
        }

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setDisplayedOrders(filteredOrders.slice(indexOfFirstItem, indexOfLastItem));
    }, [orders, searchTerm, currentPage, sortConfig, filterStatus, showOverdue, showIncomplete]);

    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterStatus = (event) => {
        setFilterStatus(event.target.value);
        setCurrentPage(1);
    };

    const totalOverdueOrders = orders.filter(order => order.deliveryStatus === 'Overdue').length;
    const totalIncompleteOrders = orders.filter(order => order.deliveryStatus === 'Incomplete').length;

    const toggleOverdueOrders = () => {
        setShowOverdue(prevState => !prevState);
        setShowIncomplete(false); // Ensure the other filter is reset
        setCurrentPage(1);
    };

    const toggleIncompleteOrders = () => {
        setShowIncomplete(prevState => !prevState);
        setShowOverdue(false); // Ensure the other filter is reset
        setCurrentPage(1);
    };

    return (
        <div className='w-full p-4 bg-white rounded-lg shadow-lg'>
            <h1 className='text-3xl mb-4 font-semibold text-center text-primary-dark'>Orders</h1>
            <div className='flex items-center justify-between mx-auto p-4 bg-gray-100 rounded-lg shadow-md'>
                <input
                    type='text'
                    placeholder='Search orders...'
                    className='text-sm text-secondary-dark bg-white p-2 rounded-lg placeholder-secondary-dark'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select
                    value={filterStatus}
                    onChange={handleFilterStatus}
                    className='text-sm text-secondary-dark bg-white p-2 rounded-lg'>
                    <option value=''>All Statuses</option>
                    <option value='Pending'>Pending</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Delivered'>Delivered</option>
                </select>
                <Link to='/orders/new' className='text-sm text-white bg-secondary p-2 rounded-lg'>Add new order</Link>
            </div>
            <div className='flex justify-between py-1 px-8 w-full mt-4 '>
                <p className='text-sm text-secondary-dark'>Orders delivering today ({new Date().toLocaleDateString()}): {orders.filter(order => order.deliveryDate === new Date().toLocaleDateString()).length} are Highlighted</p>
            </div>
            <div className='flex justify-between'>
                <table className='border w-8/12 bg-white shadow-lg rounded-lg'>
                    <thead className='bg-secondary-dark text-white'>
                        <tr>
                            <th className='p-2 cursor-pointer' onClick={() => handleSort('id')}>
                                Order ID <span>{sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</span>
                            </th>
                            <th className='p-2 cursor-pointer' onClick={() => handleSort('date')}>
                                Date <span>{sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</span>
                            </th>
                            <th className='p-2 cursor-pointer' onClick={() => handleSort('deliveryDate')}>
                                Delivery Date <span>{sortConfig.key === 'deliveryDate' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</span>
                            </th>
                            <th className='p-2 cursor-pointer' onClick={() => handleSort('status')}>
                                Status <span>{sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</span>
                            </th>
                            <th className='p-2'>Items</th>
                            <th className='p-2'>Total Price</th>
                            <th className='p-2 cursor-pointer' onClick={() => handleSort('deliveryStatus')}>
                                Delivery Status <span>{sortConfig.key === 'deliveryStatus' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}</span>
                            </th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.map(order => (
                            <tr key={order.id} className={`border-b border-secondary-light hover:bg-gray-100 ${order.deliveryDate === today ? 'bg-yellow-100' : ''}`}>
                                <td className='text-center p-2'>{order.id}</td>
                                <td className='text-center p-2'>{order.date}</td>
                                <td className='text-center p-2'>{order.deliveryDate}</td>
                                <td className='text-center p-2'>{order.status}</td>
                                <td className='text-center p-2'>{order.items}</td>
                                <td className='text-center p-2'>${order.totalPrice.toFixed(2)}</td>
                                <td className={`text-center p-2 ${order.deliveryStatus === 'Overdue' ? 'text-red-600' : order.deliveryStatus === 'Incomplete' ? 'text-orange-600' : ''}`}>
                                    {order.deliveryStatus}
                                </td>
                                <td className='text-center p-2'>
                                    <Link to={`/orders/${order.id}`} className='text-accent-green hover:text-accent-darkgreen mx-2'>View</Link>
                                    <Link to={`/orders/edit/${order.id}`} className='text-accent-green hover:text-accent-darkgreen mx-2'>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='w-3/12 space-y-5'>
                    <div onClick={toggleOverdueOrders} className={`border-2 rounded-lg shadow-lg p-4 bg-gray-100 cursor-pointer ${showOverdue ? 'bg-primary-dark text-white' : ''}`}>
                        <h1 className={`text-center font-semibold text-primary-dark ${showOverdue ? 'bg-primary-dark text-white' : ''}`}>Total Overdue Orders</h1>
                        <p className={`text-center text-2xl font-semibold py-2 text-secondary-dark ${showOverdue ? 'bg-primary-dark text-secondary-light' : ''}`}>{totalOverdueOrders}</p>
                    </div>
                    <div onClick={toggleIncompleteOrders} className={`border-2 rounded-lg shadow-lg p-4 bg-gray-100 cursor-pointer ${showIncomplete ? 'bg-primary-dark text-white' : ''}`}>
                        <h1 className={`text-center font-semibold text-primary-dark ${showIncomplete ? 'bg-primary-dark text-white' : ''}`}>Total Incomplete Orders</h1>
                        <p className={`text-center text-2xl font-semibold py-2 text-secondary-dark ${showIncomplete ? 'bg-primary-dark text-secondary-light' : ''}`}>{totalIncompleteOrders}</p>
                    </div>
                </div>
            </div>
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

export default OrderList;
