import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login';
import Products from '../pages/ProductsPage/Products';
import SingleProduct from '../pages/SingleProductPage/SingleProductPage';
import AdminHome from '../pages/admin/pages/Home';
import ManagerScreen from '../pages/manager/components/ManagerScreen';
import AccountManager from '../pages/manager/components/account/AccountManager';
import AddCategory from '../pages/manager/components/categories/AddCategory';
import CategoryManager from '../pages/manager/components/categories/CategoryManager';
import EditCategory from '../pages/manager/components/categories/EditCategory';
import Dashboard from '../pages/manager/components/dashboard/DashboardManager';
import OrderManager from '../pages/manager/components/order/OrderManager';
import AddProduct from '../pages/manager/components/products/AddProduct';
import EditProduct from '../pages/manager/components/products/EditProduct';
import ProductManager from '../pages/manager/components/products/ProductManager';
export const publicRoutes = [
    { path: '/', Component: Home },
    // { path: '/about', Component: Home },
    { path: '/products', Component: Products },
    { path: '/login', Component: Login }
];

export const privateRoutes = [



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

