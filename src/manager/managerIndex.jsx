import React from 'react'
import ManagerScreen from './components/ManagerScreen';
import ProductManager from './components/products/ProductManager';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import AccountManager from './components/account/AccountManager';
import CategoryManager from './components/categories/CategoryManager';
import AddCategory from './components/categories/AddCategory';
import EditCategory from './components/categories/EditCategory';
import OrderManager from './components/order/OrderManager';
import Dashboard from './components/dashboard/DashboardManager';


export default function managerIndex() {
    window.scrollTo(0, 0);

    return (
        <Router>
            <div>
                <Routes>
                    {/* Route for ManagerScreen */}
                    <Route path="/manager" element={<ManagerScreen />} />
                    <Route path="/manager/products" element={<ProductManager />} />
                    <Route path="/manager/new-product" element={<AddProduct />} />
                    <Route path="/manager/edit-product/:id" element={<EditProduct />} />
                    <Route path="/manager/account" element={<AccountManager />} />
                    <Route path="/manager/categories" element={<CategoryManager />} />
                    <Route path="/manager/new-categories" element={<AddCategory />} />
                    <Route path="/manager/edit-category/:id" element={<EditCategory />} />
                    <Route path="/manager/dashboard" element={<Dashboard />} />
                    <Route path="/manager/order" element={<OrderManager />} />
                    <Route path="/manager/order/:id" component={<OrderDetails />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </Router>

    );
}
