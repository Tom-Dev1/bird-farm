import React, { useEffect } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../StyleManager/editProduct.css';
import AppBarManager from '../AppBarManager';
import SidebarManager from '../SidebarManager';

function EditProduct() {
  const { id } = useParams();
  const baseUrl = 'https://birdsellingapi.azurewebsites.net/api/Product/UpdateProduct';

  const validationSchema = yup.object().shape({
    name: yup.string().max(30, 'Tên phải ít hơn hoặc bằng 30 ký tự').required('Tên là bắt buộc'),
    price: yup
      .number()
      .typeError('Giá phải là số')
      .positive('Giá phải là số dương')
      .min(1, 'Giá phải lớn hơn hoặc bằng 1')
      .required('Giá là bắt buộc'),
    sex: yup.string().required('Giới tính là bắt buộc'),
    info: yup.string().required('Thông tin là bắt buộc'),
    dayOfBirth: yup.string().required('Ngày sinh là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      sex: '',
      info: '',
      dayOfBirth: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const product = {
        id: '',
        name: values.name,
        price: values.price, // Parse price to float
        sex: values.sex,
        info: values.info,
        dayOfBirth: values.dayOfBirth,
      };
      fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: values.id }),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Cập nhật sản phẩm thành công!');
            navigate('/manager');
          } else {
            toast.error('Lỗi khi cập nhật sản phẩm');
          }
        })
        .catch((err) => {
          toast.error('Lỗi khi cập nhật sản phẩm');
          console.error(err);
        });
    },
  });

  useEffect(() => {
    fetch(`https://birdsellingapi.azurewebsites.net/api/Product/GetProductByID/${id}`)
      .then((response) => response.json())
      .then((data) => {
        formik.setValues({
          id: data.id,
          name: data.name,
          price: data.price,
          sex: data.sex,
          info: data.info,
          dayOfBirth: data.dayOfBirth,
        });
        toast.success('Lấy thông tin thành công');
      })
      .catch((error) => console.log(error.message));
  }, [id]);

  const navigate = useNavigate();


  return (
    <>
      <AppBarManager />
      <SidebarManager />
      <form className="edit-container" onSubmit={formik.handleSubmit}>
        <div className="edit-form">
          <div className="form-title">
            <h2>Chỉnh Sửa Sản Phẩm</h2>
          </div>
          <div className="form-body">
            <div className="form-group">
              <TextField
                fullWidth
                id="name"
                label="Tên"
                variant="filled"
                {...formik.getFieldProps('name')}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="price"
                label="Giá"
                variant="filled"
                type="number"
                {...formik.getFieldProps('price')}
                required
              />
            </div>
            <div className="form-group">
              <FormLabel id="sex">Giới tính</FormLabel>
              <RadioGroup
                required
                name="sex"
                value={formik.values.sex}
                onChange={formik.handleChange}
                row
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                />
              </RadioGroup>
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="info"
                label="Thông tin"
                variant="filled"
                {...formik.getFieldProps('info')}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="dayOfBirth"
                label="Ngày sinh"
                variant="filled"
                type="date"
                {...formik.getFieldProps('dayOfBirth')}
                required
              />
            </div>
            <div className="form-group">
              <div className="update-btn">
                <Button variant="contained" color="primary" type="submit">
                  Lưu
                </Button>
              </div>
              <div className="cancel-btn">
                <Link to="/manager/products">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => toast.warning('Hủy chỉnh sửa sản phẩm')}
                  >
                    Hủy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProduct;
