import { Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import { privateRoutes, publicRoutes } from './routes';
import UserLayout from './Layout/UserLayout';
import './App.css';
import { PrivateRoute } from './Private/PrivateRoute';
function App() {
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
      </Routes>
    </div>

  );
}

export default App
