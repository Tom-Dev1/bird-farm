import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Bird Farm Shop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Your bird information', 'Birds of the Shop', 'Review your mix'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Step1 />;
        case 1:
            return <Step2 />;
        case 2:
            return <Step3 />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Step4() {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();


    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // Handle "Place order" logic here
            placeOrder();
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        localStorage.removeItem('imageFiles');
        localStorage.removeItem('step1');
        setActiveStep(activeStep - 1);
    };
    const placeOrder = async () => {
        try {
            // Get data from localStorage
            const categoryId = localStorage.getItem('category_id');
            const imageFiles = localStorage.getItem('imagefiles');
            const name = localStorage.getItem('name');
            const sex = localStorage.getItem('sex');
            const userId = localStorage.getItem('UserID');
            const chimMuonPhoi_id = localStorage.getItem('chimMuonPhoi_id');
            const price = '0';
            const description = '';
            const bird_mother_id = '';
            const bird_father_id = '';
            const discount = '0';
            const typeProduct = '1'
            const statusProduct = '1'
            const day_of_birth = '2023-11-22T18:13:32.139Z'
            const order = {
                chimCuaKhacHang: {
                    categoryId,
                    imageFiles,
                    name,
                    sex,
                    userId,
                    price,
                    description,
                    bird_mother_id,
                    bird_father_id,
                    discount,
                    typeProduct,
                    statusProduct,
                    day_of_birth,
                },
                chimMuonPhoi_id,
            };

            // Make a POST request to the API endpoint
            const response = await fetch('http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/Create-Phoi-Chim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(order)
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Order placed successfully!');
            Swal.fire({
                icon: 'success',
                title: 'Combine successfully, keep buying !',
            });
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Combine your favorite birds
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Bird Mix Table
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your mix.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your mix number is #2001539. We have emailed your mix
                                confirmation, and will send you an update when your mix has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}