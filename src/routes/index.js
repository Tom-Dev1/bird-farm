import AboutAdmin from '../components/Admin/AboutAdmin/AboutAdmin';
import HomeAdmin from '../pages/Admin/Home/HomeAdmin';
import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import ManagerScreen from '../pages/Manager/ManagerScreen';
import Products from '../pages/ProductsPage/Products';
import SingleProduct from '../pages/SingleProductPage/SingleProductPage';
import Setting from '../components/Admin/Setting/Settings';
import UserAdmin from '../components/Admin/UserAdmin/UserAdmin';
import DashboardManager from '../components/Manager/dashboard/DashboardManager';
import AccountManager from '../components/Manager/account/AccountManager';
import CategoryManager from '../components/Manager/categories/CategoryManager';
import EditCategory from '../components/Manager/categories/EditCategory';
import AddCategory from '../components/Manager/categories/AddCategory';
import ProductManager from '../components/Manager/product/ProductManager';
import AddProduct from '../components/Manager/product/AddProduct';
import EditProduct from '../components/Manager/product/EditProduct';
import OrderManager from '../components/Manager/order/OrderManager';
import OrderDetails from '../components/Manager/order/OrderDetails';


export const publicRoutes = [
    { path: '/', Component: Home },
    { path: '/login', Component: Login },
    // { path: '/about', Component: Home },
    { path: '/products', Component: Products },
    { path: '/products/category/:id', Component: Products },
    { path: '/products/:id', Component: SingleProduct },
    { path: '/cart', Component: Cart },
];

export const privateRoutes = {
    admin: [
        { path: '/admin', Component: HomeAdmin },
        { path: '/admin/about', Component: AboutAdmin },
        { path: '/admin/setting', Component: Setting },
        { path: '/admin/userAdmin', Component: UserAdmin },
        // Thêm các route khác cho admin
    ],
    user: [
        { path: '/user/', Component: Home },
        // { path: '/about', Component: Home },
        { path: '/user/products', Component: Products },
        { path: '/user/products/category/:id', Component: Products },
        { path: '/user/products/:id', Component: SingleProduct },
        { path: '/user/cart', Component: Cart },
        // Thêm các route khác cho user
    ],
    manager: [
        { path: '/manager', Component: ManagerScreen },
        { path: '/manager/dashboard', Component: DashboardManager },
        { path: '/manager/account', Component: AccountManager },
        { path: '/manager/categories', Component: CategoryManager },
        { path: '/manager/new-categories', Component: AddCategory },
        { path: '/manager/edit-category/:id', Component: EditCategory },
        { path: '/manager/products', Component: ProductManager },
        { path: '/manager/new-product', Component: AddProduct },
        { path: '/manager/edit-product/:id', Component: EditProduct },
        { path: '/manager/order', Component: OrderManager },
        { path: '/manager/order/:id', Component: OrderDetails },


        


        // Thêm các route khác cho manager
    ],
};
