import { useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';

const StyledModalContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    background: white;
    width: 300px;
`;

const StyledTitle = styled(Typography)`
    text-align: center;
    margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
    margin-top: 1rem;
`;

function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        // Thực hiện logic xử lý đăng nhập tại đây
        console.log('Username:', username);
        console.log('Password:', password);
        setIsModalOpen(false);
    };

    return (
        <>
            <Button variant="contained" startIcon={<AccountCircleIcon />} onClick={handleLoginClick}>
                Login
            </Button>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <StyledModalContent>
                    <StyledTitle variant="h6" component="h2">
                        Login
                    </StyledTitle>
                    <form onSubmit={handleLoginFormSubmit}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <StyledButton variant="contained" color="primary" type="submit" fullWidth>
                            Login
                        </StyledButton>
                        <StyledButton>Register</StyledButton>
                    </form>
                </StyledModalContent>
            </Modal>
        </>
    );
}

export default Login;
