// app.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManagerScreen from './pages/manager/ManagerScreen';
import AddProduct from './pages/manager/AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/manager" element={<ManagerScreen />} />
        <Route path="/new-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
