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

function App() {
    window.scrollTo(0, 0);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Route for ManagerScreen */}
                    <Route path="/manager" element={<ManagerScreen />}/>
                    <Route path="/manager/products" element={<ProductManager />} />
                    <Route path="/manager/new-product" element={<AddProduct />} />
                    <Route path="/manager/edit" element={<EditProduct />} />
                    <Route path="/manager/account" element={<AccountManager />} />
                    <Route path="/manager/categories" element={<CategoryManager />} />
                    <Route path="/manager/new-categories" element={<AddCategory />} />
                    
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
