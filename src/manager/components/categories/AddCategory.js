import React from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarManager from '../SidebarManager';

function AddCategory() {
  const navigate = useNavigate();
  const baseUrl = 'https://653ea1a29e8bd3be29df9516.mockapi.io/categories'; // Thay đổi URL API của bạn

  const validationSchema = yup.object().shape({
    category_name: yup.string().required('Tên danh mục là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      category_name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const category = {
        category_name: values.category_name,
      };

      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      })
        .then((res) => {
          if (res.ok) {
            toast.success('Thêm danh mục thành công!');
            navigate('/manager/categories'); // Điều hướng đến trang quản lý danh mục sau khi thêm
          } else {
            toast.error('Lỗi khi thêm danh mục');
          }
        })
        .catch((err) => {
          toast.error('Lỗi khi thêm danh mục');
          console.error(err);
        });
    },
  });

  return (
    <div className='main'>
      <SidebarManager/>
      <form className="add-container" onSubmit={formik.handleSubmit}>
        <div className="add-form">
          <div className="form-title">
            <h2>Thêm Danh Mục Mới</h2>
          </div>
          <div className="form-body">
            <div className="form-group">
              <TextField
                fullWidth
                id="category_name"
                label="Tên danh mục"
                variant="filled"
                value={formik.values.category_name}
                onChange={formik.handleChange}
                name="category_name"
                error={formik.touched.category_name && Boolean(formik.errors.category_name)}
                helperText={formik.touched.category_name && formik.errors.category_name}
              />
            </div>
            <div className="form-group">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.isValid}
              >
                Lưu
              </Button>
              <Link to="/manager/categories">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => toast.warning('Hủy thêm danh mục')}
                >
                  Hủy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
