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
    // const [category, setCategory] = React.useState('');
    // const [sex, setSex] = React.useState('');
    // const [name, setName] = React.useState('');
    // const [image, setImage] = React.useState('');
    //handleNextstep
    const handleNext = () => {

        // const step1Values = {
        //     category_s1: category,
        //     sex_s1: sex,
        //     name_s1: name,
        //     image_s1: image
        // };
        // // Convert the object to a JSON string
        // const step1ValuesString = JSON.stringify(step1Values);
        // localStorage.setItem('step1', step1ValuesString);
        // const { category, name, sex, image } = step1Values;
        //activeStep
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        localStorage.removeItem('step1');
        setActiveStep(activeStep - 1);
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