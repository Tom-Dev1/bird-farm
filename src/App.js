import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';

import { privateRoutes, publicRoutes } from './routes';
import UserLayout from './Layout/UserLayout';
import './App.css';
import PrivateRoute from './Private/PrivateRoute';
import ManagerComponent from './manager/ManagerComponent';
import { Home } from '@mui/icons-material';
import AdminComponent from './pages/admin/AdminComponent';
import AdminRoute from './routes/AdminRoute';
import ManagerRoute from './routes/ManagerRoute';
import UserRoute from './routes/UserRoute';

function App() {
  return (
    <BrowserRouter>
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
          {/* Private routes */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = UserLayout;
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
                    <PrivateRoute>
                      <Page />
                    </PrivateRoute>
                  </Layout>
                }
              />
            );
          })}

          {/* Admin route */}
          <AdminRoute path="/admin">
            <AdminComponent />
          </AdminRoute>

          {/* Manager route */}
          <ManagerRoute path="/manager">
            <ManagerComponent />
          </ManagerRoute>

          {/* User route */}
          <UserRoute path="/user">
            <Home />
          </UserRoute>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
