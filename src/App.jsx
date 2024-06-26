import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ViewInvoice from "./pages/ViewInvoice";
import EditInvoice from "./pages/EditInvoice";
import CreateInvoice from "./pages/CreateInvoice";
import Expenses from "./pages/Expenses";
import CreateExpense from "./pages/CreateExpense";
import Inventory from "./pages/Inventory";
import AddInventory from "./pages/AddInventory";
import OrderList from "./pages/OrderList";
import ViewOrder from "./pages/ViewOrder";
import EditInventory from "./pages/EditInventory";
import { InvoiceProvider } from './pages/InvoiceContext';
import EditOrder from "./pages/EditOrder";
import CreateOrder from "./pages/CreateOrder";
import AdvancedReporting from "./pages/AdvancedReporting";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
                    <div><Toaster /></div>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/invoices" element={<Invoice />} />
                      <Route path="/invoices/:id" element={<ViewInvoice />} />
                      <Route path="/invoices/edit/:id" element={<EditInvoice />} />
                      <Route path="/invoices/new" element={<CreateInvoice />} />
                      <Route path="/expenses" element={<Expenses />} />
                      <Route path="/expenses/new" element={<CreateExpense />} />
                      <Route path="/inv" element={<Inventory />} />
                      <Route path="/inv/new" element={<AddInventory />} />
                      <Route path="/inv/edit/:id" element={<EditInventory />} />
                      <Route path="/orders" element={<OrderList />} />
                      <Route path="/orders/:id" element={<ViewOrder />} />
                      <Route path="/orders/edit/:id" element={<EditOrder />} />
                      <Route path="/orders/new" element={<CreateOrder />} />
                      <Route path="/reports" element={<AdvancedReporting />} />
                    </Routes>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </InvoiceProvider>
  );
}

export default App;
