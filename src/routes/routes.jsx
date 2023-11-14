import routesConfig from '../config/routes';

//layout
import { HeaderFooter } from '../Layout/HeaderFooter';

//page
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Product from '../pages/Product';
import ManagerScreen from '../pages/manager/components/ManagerScreen';
import ProductManager from '../pages/manager/components/products/ProductManager';
import AddProduct from '../pages/manager/components/products/AddProduct';
import EditProduct from '../pages/manager/components/products/EditProduct';
import AccountManager from '../pages/manager/components/account/AccountManager';
import CategoryManager from '../pages/manager/components/categories/CategoryManager';
import AddCategory from '../pages/manager/components/categories/AddCategory';
import EditCategory from '../pages/manager/components/categories/EditCategory';
import Dashboard from '../pages/manager/components/dashboard/DashboardManager';
import OrderManager from '../pages/manager/components/order/OrderManager';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.about, component: About, layout: HeaderFooter },
    { path: routesConfig.contact, component: Contact },
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.product, component: Product },
    { path: routesConfig.product, component: Product },
];

const privateRoutes = [
    //phải login
];

export const managerRoutes = [
    { path: '/manager', element: <ManagerScreen /> },
    { path: '/manager/products', element: <ProductManager /> },
    { path: '/manager/new-product', element: <AddProduct /> },
    { path: '/manager/edit-product/:id', element: <EditProduct /> },
    { path: '/manager/account', element: <AccountManager /> },
    { path: '/manager/categories', element: <CategoryManager /> },
    { path: '/manager/new-categories', element: <AddCategory /> },
    { path: '/manager/edit-category/:id', element: <EditCategory /> },
    { path: '/manager/dashboard', element: <Dashboard /> },
    { path: '/manager/order', element: <OrderManager /> },
    // { path: '/manager/order/:id', element: <OrderDetails /> },
];
export const userRoutes = [
    //cart 
    //order
];

export { privateRoutes, publicRoutes };
