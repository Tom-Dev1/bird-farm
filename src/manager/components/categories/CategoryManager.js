import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarManager from '../SidebarManager';


const apiUrl = 'https://your-api-url/categories';
function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error.message));
  }, []);

  const navigateToCategory = (categoryId) => {
    // Điều hướng đến trang quản lý danh mục dựa trên categoryId
    navigate(`/manager/category/${categoryId}`);
  };

  return (
    <div className='main'>
      <SidebarManager className="sidebar" />
      {(
        <TableContainer component={Paper} className="dashboard-container">
          <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px' }}>Quản Lý Danh Mục</h2>
          <Link to="/manager/new-categories" className="add-btn">
						<Button variant="contained">Create</Button>
					</Link>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="staff-table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '20px' }} align="center">ID</TableCell>
                <TableCell style={{ fontSize: '20px' }} align="center">Tên Danh Mục</TableCell>
                <TableCell style={{ fontSize: '20px' }} align="center">Số Sản Phẩm</TableCell>
                <TableCell style={{ fontSize: '20px' }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell style={{ fontSize: '15px' }} align="center">{category.id}</TableCell>
                  <TableCell style={{ fontSize: '15px' }} align="center">{category.category_name}</TableCell>
                  <TableCell style={{ fontSize: '15px' }} align="center">{category.products ? category.products.length : 0}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      className="edit-btn"
                      onClick={() => navigateToCategory(category.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default CategoryManager;
