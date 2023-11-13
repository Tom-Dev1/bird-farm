import React from 'react';
import { AdminRoute as Route } from '../Private/PrivateRoute';

const AdminRoute = ({ children }) => (
    <Route allowedRoles={['Admin']}>{children}</Route>
);

export default AdminRoute;