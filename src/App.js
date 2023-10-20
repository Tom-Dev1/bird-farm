import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/admin/pages/Home'
import About from './pages/admin/pages/About'
import Setting from './pages/admin/pages/Setting'

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
          
              <Route path='/' extrac element={<Home />}></Route>
              <Route path='/about' extrac element={<About />}></Route>
              <Route path='/setting' extrac element={<Setting />}></Route>
            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App