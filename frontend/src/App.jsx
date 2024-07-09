import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import UserState from "./context/UserContext/UserState";
import InventoryState from "./context/InventoryContext/InventoryState";
import ExpenseState from './context/ExpenseContext/ExpenseState';
import OrderState from "./context/OrderContext/OrderState";
import InvoiceState from "./context/InvoiceContext/InvoiceState";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Invoice from "./pages/Invoice/Invoice";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ViewInvoice from "./pages/Invoice/ViewInvoice";
import EditInvoice from "./pages/Invoice/EditInvoice";
import CreateInvoice from "./pages/Invoice/CreateInvoice";
import Expenses from "./pages/Expense/Expenses";
import CreateExpense from "./pages/Expense/CreateExpense";
import Inventory from "./pages/Inventory/Inventory";
import AddInventory from "./pages/Inventory/AddInventory";
import OrderList from "./pages/Order/OrderList";
import ViewOrder from "./pages/Order/ViewOrder";
import EditInventory from "./pages/Inventory/EditInventory";
import EditOrder from "./pages/Order/EditOrder";
import CreateOrder from "./pages/Order/CreateOrder";
import AdvancedReporting from "./pages/Report/AdvancedReporting";
import ViewInventory from "./pages/Inventory/ViewInventory";

function App() {
  const getUser = JSON.parse(localStorage.getItem("logged-in-user"))
  const [authUser, setAuthUser] = useState(getUser || null);

  return (
    <UserState
      setAuthUser={setAuthUser}
    >
      <InventoryState
        authUser={authUser}
      >
        <ExpenseState
          authUser={authUser}
        >
          <OrderState
            authUser={authUser}
          >
            <InvoiceState
              authUser={authUser}
            >
              <Router>
                <Routes>
                  <Route path="/" element={authUser ? <Navigate to="/home" /> : <Login authUser={authUser} />} />
                  <Route
                    path="/*"
                    element={
                      <div className='w-full min-h-screen flex bg-neutral-lightGray'>
                        <div className='bg-primary-dark flex flex-col w-2/12 min-h-screen'>
                          <Sidebar />
                        </div>
                        <div className='w-full'>
                          <Navbar />
                          <div className='w-full flex justify-around gap-x-4 p-4'>
                            <Routes>
                              <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
                              <Route path="/invoices" element={authUser ? <Invoice /> : <Navigate to="/" />} />
                              <Route path="/invoices/:id" element={authUser ? <ViewInvoice /> : <Navigate to="/" />} />
                              <Route path="/invoices/edit/:id" element={authUser ? <EditInvoice /> : <Navigate to="/" />} />
                              <Route path="/invoices/new" element={authUser ? <CreateInvoice /> : <Navigate to="/" />} />
                              <Route path="/expenses" element={authUser ? <Expenses /> : <Navigate to="/" />} />
                              <Route path="/expenses/new" element={authUser ? <CreateExpense /> : <Navigate to="/" />} />
                              <Route path="/inv" element={authUser ? <Inventory /> : <Navigate to="/" />} />
                              <Route path="/inv/new" element={authUser ? <AddInventory /> : <Navigate to="/" />} />
                              <Route path="/inv/edit/:id" element={authUser ? <EditInventory /> : <Navigate to="/" />} />
                              <Route path="/inv/view/:id" element={authUser ? <ViewInventory /> : <Navigate to="/" />} />
                              <Route path="/orders" element={authUser ? <OrderList /> : <Navigate to="/" />} />
                              <Route path="/orders/:id" element={authUser ? <ViewOrder /> : <Navigate to="/" />} />
                              <Route path="/orders/edit/:id" element={authUser ? <EditOrder /> : <Navigate to="/" />} />
                              <Route path="/orders/new" element={authUser ? <CreateOrder /> : <Navigate to="/" />} />
                              <Route path="/reports" element={authUser ? <AdvancedReporting /> : <Navigate to="/" />} />
                            </Routes>
                            <Toaster />
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </Router>
            </InvoiceState>
          </OrderState>
        </ExpenseState>
      </InventoryState>
    </UserState>
  );
}

export default App;
