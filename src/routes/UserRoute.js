// UserRoute.js
import React from 'react';
import { UserRoute as Route } from '../Private/PrivateRoute';

const UserRoute = ({ children }) => (
    <Route allowedRoles={['Admin', 'Manager', 'User']}>{children}</Route>
);

export default UserRoute;