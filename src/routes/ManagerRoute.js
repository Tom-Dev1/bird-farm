import React from 'react';
import { ManagerRoute as Route } from '../Private/PrivateRoute';

const ManagerRoute = ({ children }) => (
    <Route allowedRoles={['Admin', 'Manager']}>{children}</Route>
);
export default ManagerRoute;