import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!role || !allowedRoles.includes(role)) {
            navigate('/');
        }
    }, [role, allowedRoles, navigate]);

    return allowedRoles.includes(role) ? children : null;
};

const AdminRoute = ({ children }) => (
    <PrivateRoute allowedRoles={['Admin']}>{children}</PrivateRoute>
);

const ManagerRoute = ({ children }) => (
    <PrivateRoute allowedRoles={['Manager']}>{children}</PrivateRoute>
);

const UserRoute = ({ children }) => (
    <PrivateRoute allowedRoles={['User']}>{children}</PrivateRoute>
);

export { PrivateRoute, AdminRoute, ManagerRoute, UserRoute };
