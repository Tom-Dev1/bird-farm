import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
//import './EditStaff.scss';
const EditStaff = ({ data }) => {
    const { category_id } = useParams();
    const baseUrl = `https://6535e093c620ba9358ecba91.mockapi.io/lab7_1`;

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
            fetch(`${baseUrl}/${category_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(staff),
            })
                .then((res) => {
                    toast.success(`Update staff ID: ${category_id} successful!`);
                    navigate('/manager');
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
    });

    useEffect(() => {
        fetch(`${baseUrl}/${category_id}`)
            .then((response) => response.json())
            .then((data) => {
                formik.setValues({
                    img: data.avatar,
                    name: data.name,
                    club: data.club,
                    cost: data.cost.toString(),
                    nation: data.nation,
                    info: data.info,
                });
            })
            .catch((error) => console.log(error.message));
    }, [category_id]);

    const navigate = useNavigate();

    return (
        <form className="edit-container" onSubmit={formik.handleSubmit}>
            <div className="edit-form">
                <div className="form-title">
                    <h2>Edit User</h2>
                </div>
                <div className="form-body">
                    <div className="form-group">
                        <TextField
                            fullWidth
                            id="img"
                            label="Avatar"
                            variant="filled"
                            {...formik.getFieldProps('img')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="filled"
                            {...formik.getFieldProps('name')}
                            helperText={formik.errors.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            id="club"
                            label="Club"
                            variant="filled"
                            {...formik.getFieldProps('club')}
                            helperText={formik.errors.club}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            id="cost"
                            label="Cost"
                            variant="filled"
                            {...formik.getFieldProps('cost')}
                            helperText={formik.errors.cost}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            id="nation"
                            label="Nation"
                            variant="filled"
                            {...formik.getFieldProps('nation')}
                            helperText={formik.errors.nation}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            id="info"
                            label="Details"
                            variant="filled"
                            {...formik.getFieldProps('info')}
                            helperText={formik.errors.info}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div className="update-btn">
                            <Button variant="contained" color="success" type="submit">
                                Update
                            </Button>
                        </div>
                        <div className="cancel-btn">
                            <Link to="/manager">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => toast.warning('Hủy thay đổi!')}
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
};

export default EditStaff;
