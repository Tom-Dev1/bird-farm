import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { managerRoutes } from '../../routes/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagerScreen from './components/ManagerScreen';
import ManagerRoute from '../../routes/ManagerRoute';

export default function ManagerIndex() {
    window.scrollTo(0, 0);

    return (
        <Router>
            <div>
                <Routes>
                    <ManagerRoute path="/manager">
                        <ManagerScreen />
                    </ManagerRoute>
                    {managerRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
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
