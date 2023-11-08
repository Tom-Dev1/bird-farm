import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/admin/pages/Home'
import About from './pages/admin/pages/About'
import Settings from './pages/admin/pages/Settings'
import User from './pages/admin/pages/User'


function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>

            <Route path='/' extrac element={<Home />}></Route>
            <Route path='/about' extrac element={<About />}></Route>
            <Route path='/settings' extrac element={<Settings />}></Route>
            <Route path='/user' extrac element={<User />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App