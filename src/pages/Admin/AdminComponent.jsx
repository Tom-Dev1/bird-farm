
import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import AdminHome from './pages/Home'
import AdminAbout from './pages/About'
import AdminSettings from './pages/Settings';
import AdminUser from './pages/User';


export default function AdminComponent() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin/home' extrac element={<AdminHome />}></Route>
                    <Route path='/admin/about' extrac element={<AdminAbout />}></Route>
                    <Route path='/admin/settings' extrac element={<AdminSettings />}></Route>
                    <Route path='/admin/user' extrac element={<AdminUser />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

