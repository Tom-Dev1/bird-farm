import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

export default function MyAccount() {
    const { logout } = useAuth();
    const userID = localStorage.getItem('id');
    console.log('userID', userID);

    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/GetSingleID?id=${userID}`);
                const data = await response.json();
                setUserData(data.data);
                // Set editData initially with the current user data
                setEditData({
                    ...data.data,
                    // You might want to exclude other fields from edit, depending on your requirements
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {

        const payload = {
            role_id: 'e78ca8b85592426aa4d981581445eeb4',
            id: editData.id,
            userName: editData.userName,
            name: editData.name,
            userPassword: editData.userPassword,
            userEmail: editData.userEmail,
            userPhone: editData.userPhone,
            addressLine: editData.addressLine,
        };
        fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/UpdateUser?id=${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                Swal.fire({
                    icon: 'success',
                    title: 'Account update successfully !!!',
                });
                setUserData(editData); // Update userData with the updated data
                setEditMode(false);
            })
            .catch(error => {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to update user. Please try again later.',
                });
            });
    };

    const handleCancelClick = () => {
        // Reset the editData to discard changes
        setEditData(userData);
        setEditMode(false);
    };
    const handleLogout = async () => {
        try {
            const result = await swal.fire({
                title: 'Logout',
                text: 'Are you sure you want to logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
            });

            if (result.isConfirmed) {
                await logout();
                localStorage.removeItem('role');
                localStorage.removeItem('username');
                swal.fire('Logged Out!', 'You have been logged out.', 'success');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            swal.fire('Error', 'An error occurred during logout.', 'error');
        }
    };

    //Validation
    const validateUserName = (userName) => {
        const regex = /^(?=.*[A-Za-z0-9])[A-Za-z\d@$!%*#?&]{6,}$/;
        return regex.test(userName);
    };
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const validatePhone = (phone) => {
        const regex = /^(\+\d{1,3}(\s?|[-.])?)?(\(\d{1,3}\)(\s?|[-.])?)?\d{1,14}$/;
        return regex.test(phone);
    };
    const validateAddress = (address) => {
        return address && address.trim() !== '';
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box height={100} />
                <Typography sx={{ textAlign: 'left' }} variant="h4" gutterBottom>
                    My Account
                </Typography>
                <Divider />
                <Box height={70} />

                <Box sx={{ height: '123vh' }} >
                    <Grid container spacing={5}>
                        <Grid item xs={6} md={9}>
                            <Box>
                                <Card sx={{ height: '75vh' }}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            {editMode ? (
                                                <>
                                                    <TextField
                                                        label="UserName"
                                                        value={userData?.userName || ''}
                                                        onChange={(e) => setUserData({ ...editData, userName: e.target.value })}
                                                        error={!validateUserName(editData?.userName)}
                                                        helperText={!validateUserName(editData?.userName) && 'User Name must have at least 6 characters, 1 number, and 1 special character.'}
                                                    />
                                                    <TextField
                                                        label="Name"
                                                        value={userData?.name || ''}
                                                        onChange={(e) => setUserData({ ...editData, name: e.target.value })}
                                                    />
                                                    <TextField
                                                        label="Password"
                                                        value={userData?.userPassword || ''}
                                                        onChange={(e) => setUserData({ ...editData, userPassword: e.target.value })}
                                                        error={!validatePassword(editData?.userPassword)}
                                                        helperText={!validatePassword(editData?.userPassword) && 'Password must have at least 8 characters, 1 uppercase letter, and 1 special character.'}
                                                    />
                                                    <TextField
                                                        label="Phone"
                                                        value={userData?.phone || ''}
                                                        onChange={(e) => setUserData({ ...editData, phone: e.target.value })}
                                                        error={!validatePhone(editData?.phone)}
                                                        helperText={!validatePhone(editData?.phone) && 'Enter a valid phone number.'}
                                                    />
                                                    <TextField
                                                        label="Email"
                                                        value={userData?.email || ''}
                                                        onChange={(e) => setUserData({ ...editData, email: e.target.value })}
                                                        error={!validateEmail(editData?.email)}
                                                        helperText={!validateEmail(editData?.email) && 'Enter a valid email address.'}
                                                    />
                                                    <TextField
                                                        label="Address"
                                                        value={userData?.address || ''}
                                                        onChange={(e) => setUserData({ ...editData, address: e.target.value })}
                                                        error={!validateAddress(editData?.address)}
                                                        helperText={!validateAddress(editData?.address) && 'Address cannot be empty.'} />
                                                    <div style={{ justifyContent: 'right', display: 'flex' }}>
                                                        <Stack spacing={2} direction="row">
                                                            <Button variant="contained" onClick={handleCancelClick} style={{ width: 100 }}>
                                                                Cancel
                                                            </Button>
                                                            <Button variant="contained" onClick={handleSaveClick} style={{ width: 100, }} >
                                                                Save
                                                            </Button>
                                                        </Stack>
                                                    </div>

                                                </>
                                            ) : (
                                                <>
                                                    <Typography variant="h6" gutterBottom>Your Information</Typography>
                                                    <Divider />
                                                    <br />
                                                    <Typography variant="h6" gutterBottom>UserName: {userData?.userName}</Typography>
                                                    <Typography variant="h6" gutterBottom>Name: {userData?.name}</Typography>
                                                    <Typography variant="h6" gutterBottom>Phone: {userData?.phone}</Typography>
                                                    <Typography variant="h6" gutterBottom>Email: {userData?.email}</Typography>
                                                    <Typography variant="h6" gutterBottom>Address: {userData?.address}</Typography>
                                                </>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Card sx={{ height: '75vh', bgcolor: '#42e46b2c' }}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Typography variant='h6' gutterBottom>Action</Typography>
                                        <Divider />
                                        <br />
                                        <Button variant="contained" ><Link to='/cart'>My cart</Link></Button>
                                        <Button variant="contained" ><Link to='/user/mybird'>My bird list</Link></Button>
                                        <Button variant="contained" ><Link to='/user/order'>My order</Link></Button>
                                        <Button variant="contained" onClick={handleEditClick}>Edit Profile</Button>
                                        <br />
                                        <Divider />
                                        <Button variant="contained" onClick={handleLogout}>Log out</Button>
                                    </Stack>
                                    <br />

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}
