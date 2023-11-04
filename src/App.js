import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
<<<<<<< HEAD
import { DefaultLayout } from './layout/DefaultLayout';
import { publicRoutes } from './routes/index';
import { Fragment } from 'react';
=======
import { DefaultLayout } from './Layout/DefaultLayout';
import { publicRoutes } from './routes/index';
import { Fragment } from 'react';
import ManagerScreen from './manager/ManagerScreen';
import AddProduct from './manager/AddProduct'; // Import the NewProduct component
>>>>>>> main

function App() {
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
<<<<<<< HEAD
=======

                    {/* Route for ManagerScreen */}
                    <Route
                        path="/manager"
                        element={
                            <DefaultLayout>
                                <ManagerScreen />
                            </DefaultLayout>
                        }
                    />
                    {/* Route for add product */}
                    <Route
                        path="/new-product"
                        element={
                            <DefaultLayout>
                                <AddProduct />
                            </DefaultLayout>
                        }
                    />
>>>>>>> main
                </Routes>
            </div>
        </Router>
    );
}

export default App;
