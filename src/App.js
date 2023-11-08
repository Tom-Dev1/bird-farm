import { Route, Routes } from 'react-router-dom';

import { publicRoutes } from './routes';
import UserLayout from './layout/UserLayout';
import './App.css';
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
            </Routes>
        </div>

    );
}

export default App;
