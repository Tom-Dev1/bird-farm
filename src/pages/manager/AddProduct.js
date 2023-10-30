import React from 'react';
import { Button, Dialog, TextField, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import './addProduct.css'

function AddProduct() {
	const navigate = useNavigate();
	const baseUrl = 'https://653ea1a29e8bd3be29df9516.mockapi.io/products';

	const validationSchema = yup.object().shape({
		name: yup.string().max(30, 'Name must be at most 30 characters').required('User Name is required'),
		club: yup.string().required('Club is required'),
		price: yup
			.number()
			.typeError('Price must be a number')
			.positive('Price must be a positive number')
			.min(1, 'Price must be greater than or equal to 1')
			.required('Price is required'),
		info: yup.string().required('Info is required'),
		dayOfBirth: yup.string().required('Day of birth required')
	});

	const formik = useFormik({
		initialValues: {
			id: '',
			category_id: '',
			name: '',
			price: '',
			sex: '',
			info: '',
			bird_mother_id: '',
			bird_father_id: '',
			is_egg: '',
			dayOfBirth: ''
		},
		validationSchema,
		onSubmit: (values) => {
			const staff = {
				id: values.id,
				category_id: values.category_id,
				name: values.name,
				price: values.price,
				sex: values.sex,
				info: values.info,
				bird_mother_id: values.bird_mother_id,
				bird_father_id: values.bird_father_id,
				is_egg: values.is_egg,
				dayOfBirth: values.dayOfBirth
			};
			fetch(baseUrl, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(staff)
			})
				.then((res) => {
					toast.success('Add successfully!');
					navigate('/manager');
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	});

	return (
		<form className="add-container" onSubmit={formik.handleSubmit}>
			<div className="add-form">
				<div className="form-title">
					<h2>Add New Product</h2>
				</div>
				<div className="form-body">

					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Name"
							variant="filled"
							value={formik.values.name}
							onChange={formik.handleChange}
							name="name"
							error={formik.errors.name}
							helperText={formik.errors.name}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Price"
							variant="filled"
							value={formik.values.price}
							onChange={formik.handleChange}
							name="price"
							error={formik.errors.price}
							helperText={formik.errors.price}
						/>
					</div>
					<div className="form-group">
						<FormLabel id="filled-basic">Gender</FormLabel>
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
							id="filled-basic"
							label="Info"
							variant="filled"
							value={formik.values.info}
							onChange={formik.handleChange}
							name="info"
							error={formik.errors.info}
							helperText={formik.errors.info}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Bird Mother"
							variant="filled"
							value={formik.values.bird_mother_id}
							onChange={formik.handleChange}
							name="bird_mother_id"
							error={formik.errors.bird_mother_id}
							helperText={formik.errors.bird_mother_id}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Bird Father"
							variant="filled"
							value={formik.values.bird_father_id}
							onChange={formik.handleChange}
							name="bird_father_id"
							error={formik.errors.bird_father_id}
							helperText={formik.errors.bird_father_id}
						/>
					</div>
					{/* <div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Day of birth"
							variant="filled"
							type="date"
							value={formik.values.dayOfBirth}
							onChange={formik.handleChange}
							name="dayOfBirth"
							error={formik.errors.dayOfBirth}
							helperText={formik.errors.dayOfBirth}
						/>
					</div>
					{/* <div className="form-group">
						<TextField
							fullWidth
							type="file"
							accept="image/*"
							id="filled-basic"
							variant="filled"
							value={formik.values.productImg}
							onChange={formik.handleChange}
							name="productImg"
							required
						/>
					</div> */} 
					<div className="form-group">
						<div className="save-btn">
							<Button variant="contained" color="success" type="submit" disabled={!formik.isValid}>
								Save
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/manager">
								<Button
									variant="contained"
									color="error"
									onClick={() => toast.warning('Cancel Create staff!')}
								>
									Cancel
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default AddProduct;
