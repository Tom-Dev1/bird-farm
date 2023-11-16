import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/index';
import GuestLayout from './layout/GuestLayout/GuestLayout';

import UserLayout from './layout/UserLayout/UserLayout';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import ManagerLayout from './layout/ManagerLayout/ManagerLayout';
import useAuth from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoutes';
import './App.css';
function App() {
    return (
        <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <GuestLayout>
                            <route.Component />
                        </GuestLayout>
                    }
                />
            ))}
            {privateRoutes.user.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute
                            element={<UserLayout>{<route.Component />}</UserLayout>}
                            layout={UserLayout}
                            allowedRoles={['User']}
                        />
                    }
                />
            ))}

            {privateRoutes.admin.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute
                            element={<AdminLayout>{<route.Component />}</AdminLayout>}
                            layout={AdminLayout}
                            allowedRoles={['Admin']}
                        />
                    }
                />
            ))}

            {privateRoutes.manager.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <PrivateRoute
                            element={<ManagerLayout>{<route.Component />}</ManagerLayout>}
                            layout={ManagerLayout}
                            allowedRoles={['Manager']}
                        />
                    }
                />
            ))}
        </Routes>
    );
}

export default App;
