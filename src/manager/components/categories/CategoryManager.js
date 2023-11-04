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

const apiUrl = 'https://birdsellingapi.azurewebsites.net/api/BirdCategory';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl + '/GetAll')
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const navigateToCategory = (id) => {
    navigate(`/manager/category/${id}`);
  };

  const handleDeleteCategory = (id) => {
    fetch(`https://birdsellingapi.azurewebsites.net/api/BirdCategory/DeleteBirdCategory?id=`+ id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCategories(categories.filter((category) => category.id !== id));
        toast.success('Danh mục đã được xóa thành công.');
      } else if (response.status === 404) {
        toast.error('Danh mục không tồn tại.');
      } else {
        toast.error('Xóa danh mục không thành công.');
      }
    })
    .catch((error) => {
      console.error('Lỗi khi xóa danh mục:', error);
      toast.error('Xảy ra lỗi khi xóa danh mục.');
    });
  };

  return (
    <div className='main'>
      <SidebarManager className="sidebar" />
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
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="delete-btn"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoryManager;
