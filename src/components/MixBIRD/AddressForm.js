import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function AddressForm() {


    const [sex, setSex] = React.useState('');

    const handleChange = (event) => {
        setSex(event.target.value);
    };





    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Your Bird
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Name of the Bird"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sex of birds</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sex}
                            label="Sex of birds"
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>Male</MenuItem>
                            <MenuItem value={false}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        autoComplete="description"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="linkimage"
                        name="linkimage"
                        label="Link Image "
                        fullWidth
                        autoComplete="linkimage"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>

                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this information for mix details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}