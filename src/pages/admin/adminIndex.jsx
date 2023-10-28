
import React from 'react'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Settings from './pages/Settings'


function adminIndex() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' extrac element={<Home />}></Route>
                    <Route path='/about' extrac element={<About/>}></Route>
                    <Route path='/settings' extrac element={<Settings/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default  adminIndex
