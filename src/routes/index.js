import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
export const publicRoutes = [
    { path: '/', Component: Home },
    // { path: '/about', Component: Home },
    { path: '/products', Component: Products },
];

export const privateRoutes = [];
