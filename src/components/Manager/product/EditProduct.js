import React, { useState, useEffect } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import Box from '@mui/material/Box';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const categoriesApiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/BirdCategory/GetAll';

  const [productData, setProductData] = useState({
    category_id: '',
    image: '',
    price: 0,
    name: '',
    sex: 'true', // Assuming 'true' corresponds to 'male'
    description: '',
    bird_mother_id: '',
    bird_father_id: '',
    discount: 0,
    typeProduct: 1,
    day_of_birth: '',
    statusProduct: '1', // Default to '1: Còn hàng'
  });

  useEffect(() => {
    fetch(categoriesApiUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.log(error.message));
  }, []);

  const validationSchema = yup.object().shape({
    category_id: yup.string().required('Danh mục là bắt buộc'),
    image: yup.string().required('URL hình ảnh là bắt buộc'),
    name: yup.string().required('Tên sản phẩm là bắt buộc'),
    price: yup
      .number()
      .typeError('Giá tiền phải là một số')
      .positive('Giá tiền phải là một số dương')
      .min(1, 'Giá tiền phải lớn hơn hoặc bằng 1')
      .required('Giá tiền là bắt buộc'),
    sex: yup.string().required('Giới tính là bắt buộc'),
    description: yup.string().required('Mô tả là bắt buộc'),
    discount: yup
      .number()
      .typeError('Giảm giá phải là một số')
      .min(0, 'Giảm giá phải là một số không âm')
      .optional(),
    day_of_birth: yup.string().required('Ngày sinh là bắt buộc'),
    statusProduct: yup.string().required('Trạng thái là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: productData,
    validationSchema,
    onSubmit: (values) => {
      const product = {
        category_id: values.category_id,
        image: values.image,
        name: values.name,
        price: parseFloat(values.price),
        sex: values.sex === 'true',
        description: values.description,
        bird_mother_id: values.bird_mother_id,
        bird_father_id: values.bird_father_id,
        discount: parseFloat(values.discount),
        typeProduct: values.typeProduct,
        day_of_birth: new Date(values.day_of_birth),
        statusProduct: values.statusProduct,
      };

      fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/UpdateProduct/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Chỉnh sửa sản phẩm thành công!');
            navigate('/manager/products');
          } else {
            console.error('Lỗi khi cập nhật sản phẩm.');
            toast.error('Lỗi khi cập nhật sản phẩm.');
          }
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
          toast.error('Lỗi khi cập nhật sản phẩm.');
        });
    },
  });

  useEffect(() => {
    fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const productData = data.data;
        productData.price = parseFloat(productData.price);
        productData.discount = parseFloat(productData.discount);
        productData.sex = productData.sex ? 'true' : 'false';
        setProductData(productData);
        formik.setValues(productData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarManager />
      <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
        <AppBarManager />
        <div className="main-edit-product">
          <form className="edit-products-container" onSubmit={formik.handleSubmit}>
            <div className="edit-form">
              <div className="form-title">
                <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '25px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Chỉnh Sửa Sản Phẩm</h2>
              </div>
              <div className="form-body">
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
                  <TextField
                    fullWidth
                    id="image"
                    label="URL hình ảnh"
                    variant="filled"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    name="image"
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="name"
                    label="Tên sản phẩm"
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
                    id="price"
                    label="Giá tiền"
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
                      label="Nam"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio color="primary" />}
                      label="Nữ"
                    />
                  </RadioGroup>
                  {formik.touched.sex && formik.errors.sex && (
                    <div className="error-text">{formik.errors.sex}</div>
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="discount"
                    label="Giảm giá"
                    variant="filled"
                    type="number"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    name="discount"
                    error={formik.touched.discount && Boolean(formik.errors.discount)}
                    helperText={formik.touched.discount && formik.errors.discount}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="day_of_birth"
                    label="Ngày sinh"
                    variant="filled"
                    type="datetime-local"
                    value={formik.values.day_of_birth}
                    onChange={formik.handleChange}
                    name="day_of_birth"
                    error={formik.touched.day_of_birth && Boolean(formik.errors.day_of_birth)}
                    helperText={formik.touched.day_of_birth && formik.errors.day_of_birth}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    fullWidth
                    id="description"
                    label="Mô tả"
                    variant="filled"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    name="description"
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </div>
                <div className="form-group">
                  <Select
                    fullWidth
                    id="statusProduct"
                    name="statusProduct"
                    value={formik.values.statusProduct}
                    onChange={formik.handleChange}
                    variant="filled"
                    label="Trạng thái"
                    error={formik.touched.statusProduct && Boolean(formik.errors.statusProduct)}
                  >
                    <MenuItem value="" disabled>
                      Chọn trạng thái
                    </MenuItem>
                    <MenuItem value="1">Còn hàng</MenuItem>
                    <MenuItem value="2">Đã bán</MenuItem>
                    <MenuItem value="3">Lỗi</MenuItem>
                    <MenuItem value="4">Không bán</MenuItem>
                  </Select>
                  {formik.touched.statusProduct && formik.errors.statusProduct && (
                    <div className="error-text">{formik.errors.statusProduct}</div>
                  )}
                </div>
                <div className="form-group">
                  <div className="update-btn">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!formik.isValid}
                    >
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
        </div>
      </Box>
    </Box>
  );
}

export default EditProduct;
