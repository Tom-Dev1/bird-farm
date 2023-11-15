// // import * as React from 'react';
// // import Avatar from '@mui/material/Avatar';
// // import Button from '@mui/material/Button';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// // import Grid from '@mui/material/Grid';
// // import Box from '@mui/material/Box';

// // import Typography from '@mui/material/Typography';
// // import Container from '@mui/material/Container';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// // import useAuth from '../../hooks/useAuth';

// // function Copyright(props) {
// //     return (
// //         <Typography variant="body2" color="text.secondary" align="center" {...props}>
// //             {'Copyright © '}
// //             <Link color="inherit" href="https://mui.com/">
// //                 Your Website
// //             </Link>{' '}
// //             {new Date().getFullYear()}
// //             {'.'}
// //         </Typography>
// //     );
// // }

// // // TODO remove, this demo shouldn't need to reset the theme.

// // const defaultTheme = createTheme();

// // export default function Login() {
// //     const { login } = useAuth();

// //     const handleSubmit = async (event) => {
// //         event.preventDefault();
// //         const data = new FormData(event.currentTarget);

// //         try {
// //             await login(data.get('username'), data.get('password'));
// //             // console.log('Đăng nhập thành công!');
// //         } catch (error) {
// //             // console.error('Đăng nhập thất bại:', error.message || 'Lỗi không xác định');
// //         }
// //     };

// //     return (
// //         <ThemeProvider theme={defaultTheme}>
// //             <Container component="main" maxWidth="xs">
// //                 <CssBaseline />
// //                 <Box
// //                     sx={{
// //                         marginTop: 8,
// //                         display: 'flex',
// //                         flexDirection: 'column',
// //                         alignItems: 'center',
// //                     }}
// //                 >
// //                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
// //                     <Typography component="h1" variant="h5">
// //                         Sign in
// //                     </Typography>
// //                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
// //                         <TextField
// //                             margin="normal"
// //                             required
// //                             fullWidth
// //                             id="username"
// //                             label="User Name"
// //                             name="username"
// //                             autoComplete="username"
// //                             autoFocus
// //                         />
// //                         <TextField
// //                             margin="normal"
// //                             required
// //                             fullWidth
// //                             name="password"
// //                             label="Password"
// //                             type="password"
// //                             id="password"
// //                             autoComplete="current-password"
// //                         />
// //                         <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
// //                         <Button
// //                             type="submit"
// //                             fullWidth
// //                             variant="contained"
// //                             sx={{ mt: 3, mb: 2 }}
// //                             // onClick={() => handleSignIn(email, password)}
// //                         >
// //                             Sign In
// //                         </Button>
// //                         <Grid container>
// //                             <Grid item xs>
// //                                 <Link href="#" variant="body2">
// //                                     Forgot password?
// //                                 </Link>
// //                             </Grid>
// //                             <Grid item>
// //                                 <Link href="#" variant="body2">
// //                                     {"Don't have an account? Sign Up"}
// //                                 </Link>
// //                             </Grid>
// //                         </Grid>
// //                     </Box>
// //                 </Box>
// //                 <Copyright sx={{ mt: 8, mb: 4 }} />
// //             </Container>
// //         </ThemeProvider>
// //     );
// // }
// // Login.js
// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useAuth from '../../hooks/useAuth';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// export default function Login() {
//     const { login, error } = useAuth();
//     const [username, setUsername] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [notification, setNotification] = React.useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             await login(username, password);
//             setNotification('Đăng nhập thành công!');
//         } catch (error) {
//             console.error('Đăng nhập thất bại:', error.message || 'Lỗi không xác định');
//             setNotification('Đăng nhập thất bại');
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     {notification && <div style={{ color: error ? 'red' : 'green' }}>{notification}</div>}
//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="User Name"
//                             name="username"
//                             autoComplete="username"
//                             autoFocus
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
//                         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                             Sign In
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="#" variant="body2">
//                                     Forgot password?
//                                 </Link>
//                             </Grid>
//                             <Grid item>
//                                 <Link href="#" variant="body2">
//                                     {"Don't have an account? Sign Up"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//                 <Copyright sx={{ mt: 8, mb: 4 }} />
//             </Container>
//         </ThemeProvider>
//     );
// }

// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useAuth from '../../hooks/useAuth';

// function Notification({ message, isError }) {
//     return <div style={{ color: isError ? 'red' : 'green' }}>{message}</div>;
// }

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// export default function Login() {
//     const { login, error } = useAuth();
//     const [username, setUsername] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [notification, setNotification] = React.useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             await login(username, password);
//             setNotification({ message: 'Đăng nhập thành công!', isError: false });
//         } catch (error) {
//             console.error('Đăng nhập thất bại:', error.message || 'Lỗi không xác định');
//             setNotification({ message: 'Đăng nhập thất bại', isError: true });
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     {notification && <Notification message={notification.message} isError={notification.isError} />}
//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="User Name"
//                             name="username"
//                             autoComplete="username"
//                             autoFocus
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
//                         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                             Sign In
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="#" variant="body2">
//                                     Forgot password?
//                                 </Link>
//                             </Grid>
//                             <Grid item>
//                                 <Link href="#" variant="body2">
//                                     {"Don't have an account? Sign Up"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//                 <Copyright sx={{ mt: 8, mb: 4 }} />
//             </Container>
//         </ThemeProvider>
//     );
// }
import React, { useState, useContext } from 'react';
import useAuth from '../../hooks/useAuth';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userName, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
