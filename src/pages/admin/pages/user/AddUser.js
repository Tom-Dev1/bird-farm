import React from 'react'
import { useState } from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';

export default function AddUser({ closeEvent }) {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{6,})$/;
        if (!regex.test(value)) {
            setUsernameError('User Name phải có ít nhất 6 ký tự, ít nhất 1 số và ít nhất 1 ký tự đặc biệt.');
        } else {
            setUsernameError('');
        }
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Add User
            </Typography>
            <IconButton style={{ position: "absolute", top: "0", right: "0" }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton>
            <br />
            <Box height={20} />
            <Grid contatter spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        error={!!usernameError}
                        id="outlined-error-helper-text"
                        label="User Name"
                        value={username}
                        onChange={handleUsernameChange}
                        helperText={usernameError || ' '}
                        sx={{ minWidth: "100%" }}
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!usernameError}
                        id="outlined-error-helper-text"
                        label="User Name"
                        value={username}
                        onChange={handleUsernameChange}
                        helperText={usernameError || ' '}
                        sx={{ minWidth: "100%" }}
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!usernameError}
                        id="outlined-error-helper-text"
                        label="User Name"
                        value={username}
                        onChange={handleUsernameChange}
                        helperText={usernameError || ' '}
                        sx={{ minWidth: "100%" }}
                        size='small'
                    />
                </Grid>

            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    )
}
