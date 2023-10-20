
import React from 'react'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Setting from './pages/Setting'

function adminIndex() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' extrac element={<Home />}></Route>
                    <Route path='/about' extrac element={<About />}></Route>
                    <Route path='/setting' extrac element={<Setting />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default  adminIndex
