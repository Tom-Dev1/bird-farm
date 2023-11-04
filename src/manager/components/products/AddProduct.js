import React, { useState, useEffect } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import '../../StyleManager/addProduct.css';
import 'react-toastify/dist/ReactToastify.css';
import SidebarManager from '../SidebarManager';

const categoriesApiUrl = 'https://birdsellingapi.azurewebsites.net/api/BirdCategory/GetAll';
const baseUrl = 'https://birdsellingapi.azurewebsites.net/api/Product/CreateProduct';

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(categoriesApiUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().max(30, 'Tên phải ít hơn hoặc bằng 30 ký tự').required('Tên là bắt buộc'),
    price: yup
      .number()
      .typeError('Giá phải là số')
      .positive('Giá phải là số dương')
      .min(1, 'Giá phải lớn hơn hoặc bằng 1')
      .required('Giá là bắt buộc'),
    sex: yup.string().required('Giới tính là bắt buộc'),
    description: yup.string().required('Thông tin là bắt buộc'),
    dayOfBirth: yup.string().required('Ngày sinh là bắt buộc'),
    category_id: yup.string().required('Danh mục là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      category_id: '', // Khởi tạo category_id là chuỗi rỗng
      image: '',
      price: 0,
      name: '',
      sex: 'true',
      description: '',
      bird_mother_id: '',
      bird_father_id: '',
      discount: 0,
      is_egg: 'true',
      dayOfBirth: new Date().toISOString(),
      birdCategory: '',
      id: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const product = {
        category_id: values.category_id,
        image: values.image,
        price: values.price,
        name: values.name,
        sex: values.sex === 'true', // Convert to boolean
        description: values.description,
        bird_mother_id: values.bird_mother_id,
        bird_father_id: values.bird_father_id,
        discount: values.discount,
        is_egg: values.is_egg === 'true', // Convert to boolean
        day_of_birth: values.dayOfBirth, // Rename to match API
      };
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => {
          if (res.ok) {
            toast.success('Thêm sản phẩm thành công!');
            navigate('/manager/products');
          } else {
            toast.error('Lỗi khi thêm sản phẩm');
          }
        })
        .catch((err) => {
          toast.error('Lỗi khi thêm sản phẩm');
          console.error(err);
        });
    },
  });

  return (
    <div className="main">
      <SidebarManager />
      <form className="add-container" onSubmit={formik.handleSubmit}>
        <div className="add-form">
          <div className="form-title">
            <h2>Thêm Sản Phẩm Mới</h2>
          </div>
          <div className="form-body">
            <div className="form-group">
              <TextField
                fullWidth
                id="name"
                label="Tên"
                variant="filled"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Avatar"
							variant="filled"
							value={formik.values.image}
							onChange={formik.handleChange}
							name="image"
						/>
					</div>
            <div className="form-group">
              <TextField
                fullWidth
                id="price"
                label="Giá"
                variant="filled"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                name="price"
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
                  value="true"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" />}
                  label="Female"
                />
              </RadioGroup>
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="description"
                label="Thông tin"
                variant="filled"
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                id="dayOfBirth"
                label="Ngày sinh"
                variant="filled"
                type="date"
                value={formik.values.dayOfBirth}
                onChange={formik.handleChange}
                name="dayOfBirth"
                error={formik.touched.dayOfBirth && Boolean(formik.errors.dayOfBirth)}
                helperText={formik.touched.dayOfBirth && formik.errors.dayOfBirth}
              />
            </div>
            <div className="form-group">
              <Select
                fullWidth
                id="category_id"
                name="category_id"
                value={formik.values.category_id}
                onChange={formik.handleChange}
                variant="filled"
                label="Danh mục"
                error={formik.touched.category_id && Boolean(formik.errors.category_id)}
              >
                <MenuItem value="" disabled>
                  Chọn danh mục
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category_id && formik.errors.category_id && (
                <div className="error-text">{formik.errors.category_id}</div>
              )}
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
              <Link to="/manager/products">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => toast.warning('Hủy thêm sản phẩm')}
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

export default AddProduct;
