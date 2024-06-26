import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { TbReportSearch, TbTruckDelivery } from "react-icons/tb";
import { AiFillHome, AiOutlineReconciliation } from "react-icons/ai";
import { GiExpense } from "react-icons/gi";
import { MdOutlineInventory2 } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className='text-white py-12 px-5 flex'>
        <div className='w-4/12 h-auto border'></div>
        <h1 className='w-8/12 text-lg font-bold px-2 flex items-center'>Stock Management</h1>
      </div>
      <div className='text-white py-5'>
        <ul className='flex flex-col space-y-2 pl-10'>
          <li className={location.pathname === "/" ? " bg-secondary-dark text-white text-lg p-2 rounded-l-2xl transition duration-300" : "text-white text-lg p-2"}>
            <Link to="/" className='flex items-center gap-x-2'>
              <i className='text-secondary-light'><AiFillHome /></i> Home
            </Link>
          </li>
          <li className={location.pathname === "/invoices" ? " bg-secondary-dark text-white text-lg p-2 rounded-l-2xl transition duration-300" : "text-white text-lg p-2"}>
            <Link to="/invoices" className='flex items-center gap-x-2'>
              <i className='text-secondary-light'><TbReportSearch /></i> Invoices
            </Link>
          </li>
          <li className={location.pathname === "/expenses" ? " bg-secondary-dark text-white text-lg p-2 rounded-l-2xl transition duration-300" : "text-white text-lg p-2"}>
            <Link to="/expenses" className='flex items-center gap-x-2'>
              <i className='text-secondary-light'><GiExpense /></i> Expenses
            </Link>
          </li>
          <li className={location.pathname === "/inv" ? " bg-secondary-dark text-white text-lg p-2 rounded-l-2xl transition duration-300" : "text-white text-lg p-2"}>
            <Link to="/inv" className='flex items-center gap-x-2'>
              <i className='text-secondary-light'><MdOutlineInventory2 /></i> Inventory
            </Link>
          </li>
          <li className={location.pathname === "/orders" ? " bg-secondary-dark text-white text-lg p-2 rounded-l-2xl transition duration-300" : "text-white text-lg p-2"}>
            <Link to="/orders" className='flex items-center gap-x-2'>
              <i className='text-secondary-light'><TbTruckDelivery /></i> Orders
            </Link>
          </li>
          <li className={location.pathname === "/report" ? " bg-secondary-dark text-white text-lg p-2 rounded-l-2xl transition duration-300" : "text-white text-lg p-2"}>
            <Link to="/reports" className='flex items-center gap-x-2'>
              <i className='text-secondary-light'><AiOutlineReconciliation /></i> Financial Reporting
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar