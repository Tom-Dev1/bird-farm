import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProductManager from './products/ProductManager';
import AddProduct from './products/AddProduct';
import EditProduct from './products/EditProduct';
import AddCategory from './categories/AddCategory';
import AccountManager from './account/AccountManager';
import CategoryManager from './categories/CategoryManager';
import EditCategory from './categories/EditCategory';
import DashboardManager from './dashboard/DashboardManager';
import OrderManager from './order/OrderManager'
import OrderDetails from './order/OrderDetails'
import SidebarManager from './SidebarManager'


const ManagerScreen = () => {
    return (
        <div>
            <BrowserRouter>
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
                    <Route path="/manager/dashboard" element={<DashboardManager />} />
                    <Route path="/manager/order" element={<OrderManager />} />
                    <Route path="/manager/order/:id" component={<OrderDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default ManagerScreen;
