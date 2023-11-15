import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';
import UserLayout from './layout/UserLayout/UserLayout';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import ManagerLayout from './layout/ManagerLayout/ManagerLayout';

import './App.css';
import GuestLayout from './layout/GuestLayout/GuestLayout';
import { useState } from 'react';
function App() {
    // const [userRole, setUserRole] = useState('guest');
    const getLayoutByRole = (role) => {
        switch (role) {
            case 'admin':
                return AdminLayout;
            case 'user':
                return UserLayout;
            case 'manager':
                return ManagerLayout;
            case 'guest':
                return GuestLayout;
            default:
                return GuestLayout;
        }
    };

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.Component;
                    const Layout = UserLayout;
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

                {Object.entries(privateRoutes).map(([role, roleRoutes]) => {
                    const Layout = getLayoutByRole(role);
                    return roleRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <route.Component />
                                </Layout>
                            }
                        />
                    ));
                })}
            </Routes>
        </div>
    );
}

export default App;
