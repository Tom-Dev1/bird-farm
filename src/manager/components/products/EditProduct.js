import React, { useState, useEffect } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBarManager from '../AppBarManager';
import SidebarManager from '../SidebarManager';
import '../../StyleManager/editProduct.css';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const categoriesApiUrl = 'https://birdsellingapi.azurewebsites.net/api/BirdCategory/GetAll';

  const [productData, setProductData] = useState({
    category_id: 'string',
    image: 'string',
    price: 0,
    name: 'string',
    sex: true, // Assuming true corresponds to 'male'
    description: 'string',
    bird_mother_id: 'string',
    bird_father_id: 'string',
    discount: 0,
    typeProduct: 1,
    day_of_birth: '',
  });
  useEffect(() => {
    fetch(categoriesApiUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.log(error.message));
  }, []);
  const validationSchema = yup.object().shape({
    category_id: yup.string().required('Category ID is required'),
    image: yup.string().required('Image URL is required'),
    name: yup.string().required('Name is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be a positive number')
      .min(1, 'Price must be greater than or equal to 1')
      .required('Price is required'),
    sex: yup.string().required('Sex is required'),
    description: yup.string().required('Description is required'),
    discount: yup
      .number()
      .typeError('Discount must be a number')
      .positive('Discount must be a positive number')
      .required('Discount is required'),
  });

  const formik = useFormik({
    initialValues: productData,
    validationSchema,
    onSubmit: (values) => {
      // Create the product object
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
      };

      // Send a request to update the product
      fetch(`https://birdsellingapi.azurewebsites.net/api/Product/UpdateProduct/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Product updated successfully!');
            navigate('/manager/products');
          } else {
            console.error('Product update failed.');
            toast.error('Product update failed.');
          }
        })
        .catch((error) => {
          console.error('Error updating product:', error);
          toast.error('Error updating product.');
        });
    },
  });

  useEffect(() => {
    // Fetch the product data based on the ID
    fetch(`https://birdsellingapi.azurewebsites.net/api/Product/GetProductByID/${id}`)
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
    <>
      <AppBarManager />
      <SidebarManager />
      <div className="main-edit-product">
        <form className="edit-container" onSubmit={formik.handleSubmit}>
          <div className="edit-form">
            <div className="form-title">
              <h2>Chỉnh Sửa Sản Phẩm</h2>
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
                  label="Image URL"
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
                  label="Name"
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
                  label="Price"
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
                <FormLabel id="sex">Sex</FormLabel>
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
                  id="discount"
                  label="Discount"
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
                  label="Day of Birth"
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
                <div className="update-btn">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    Save
                  </Button>
                </div>
                <div className="cancel-btn">
                  <Link to="/manager/products">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => toast.warning('Cancel product edit')}
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
