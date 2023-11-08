import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DefaultLayout } from './Layout/DefaultLayout';
import { publicRoutes } from './routes/index';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import ManagerScreen from './manager/components/ManagerScreen';
import ProductManager from './manager/components/products/ProductManager';
import AddProduct from './manager/components/products/AddProduct';
import EditProduct from './manager/components/products/EditProduct';
import AddCategory from './manager/components/categories/AddCategory';
import AccountManager from './manager/components/account/AccountManager';
import CategoryManager from './manager/components/categories/CategoryManager';
import EditCategory from './manager/components/categories/EditCategory';
import DashboardManager from './manager/components/dashboard/DashboardManager';
import OrderManager from './manager/components/order/OrderManager'
import OrderDetails from './manager/components/order/OrderDetails'


function App() {
    window.scrollTo(0, 0);

    return (
        <Router>
            <div className="App">
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
                    <Route path="/manager/order" element={<OrderManager/>} />
                    <Route path="/manager/order/:id" component={<OrderDetails/>} />
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

export default App;
