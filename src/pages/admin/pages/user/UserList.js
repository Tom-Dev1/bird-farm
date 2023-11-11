import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import AddUser from './AddUser';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function UserList() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const roleNames = {
        "190f2b3c66db4405afb29ec0bd9cfed2": "Admin",
        "507cd3255f5e4e2589d999efa128dd0a": "Manager",
        "e78ca8b85592426aa4d981581445eeb4": "User",
        // Add more role_id to role name mappings as needed
    };

    const [selectedRole, setSelectedRole] = React.useState('');

    const filterDataByRole = (roleId) => {
        if (roleId) {
            // Convert roleId to string and then filter users based on the selected role
            const filteredUsers = user.filter((u) => u.role_id === roleId);
            setUser(filteredUsers);
        } else {
            // If no role is selected, fetch all users again
            fetch('http://birdsellingapi-001-site1.ctempurl.com/api/User/GetAllUser')
                .then((response) => response.json())
                .then((data) => setUser(data.data))
                .catch((error) => console.log(error.message));
        }
    };


    useEffect(() => {
        filterDataByRole(selectedRole);
    }, [selectedRole]);

    const handleChange = (event) => {
        setSelectedRole(event.target.value);
        filterDataByRole(event.target.value);
    };



    useEffect(() => {
        fetch('http://birdsellingapi-001-site1.ctempurl.com/api/User/GetAllUser')
            .then((response) => response.json())
            .then((data) => setUser(data.data))
            .catch((error) => console.log(error.message));
    }, []);

    const deleteUser = (id) => {
        const userToDelete = user.find((u) => u.id === id);

        Swal.fire({
            title: `Xóa tài khoản : ${userToDelete?.userName}`,
            text: "Bạn có chắc chắn muốn xóa tài khoản này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy xóa',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/User/DeleteProduct?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            // Remove the deleted user from the state
                            setUser((prevUsers) => prevUsers.filter((u) => u.id !== id));
                            Swal.fire('Tài khoản đã được xóa thành công.');
                        } else if (response.status === 404) {
                            Swal.fire('Tài khoản không tồn tại.');
                        } else {
                            Swal.fire('Xóa tài khoản không thành công.');
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Xảy ra lỗi khi xóa tài khoản.');
                    });
            } else {
                // Người dùng hủy bỏ, không làm gì cả
                Swal.fire('Hủy bỏ xóa');
            }
        });
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddUser closeEvent={handleClose} />
                    </Box>
                </Modal>
            </div>
            {user.length > 0 && (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ padding: "20px" }}
                    >
                        User List
                    </Typography>
                    <Divider />
                    <Box height={10} />
                    <Stack direction="row" spacing={2} className="my-2 mb-2">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-simple-select-label">Role  Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedRole}
                                label="Role Name"
                                onChange={handleChange}
                            >
                                <MenuItem value={"190f2b3c66db4405afb29ec0bd9cfed2"}>Admin</MenuItem>
                                <MenuItem value={"507cd3255f5e4e2589d999efa128dd0a"}>Manager</MenuItem>
                                <MenuItem value={"e78ca8b85592426aa4d981581445eeb4"}>User</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        ></Typography>
                        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button>
                    </Stack>
                    <Box height={10} />
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ minWidth: "10px" }}>
                                        User Name
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Role Name
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Email
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Phone Number
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Create Time
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} >
                                                <TableCell key={user.id} align="left">
                                                    {user.userName}
                                                </TableCell>
                                                <TableCell key={user.id} align="left">
                                                    {roleNames[user.role_id]}
                                                </TableCell>
                                                <TableCell key={user.id} align="left">
                                                    {user.userEmail}
                                                </TableCell>
                                                <TableCell key={user.id} align="left">
                                                    {user.userPhone}
                                                </TableCell>
                                                <TableCell key={user.id} align="left">
                                                    {new Date(user.createdTime).toLocaleString("en-GB", {
                                                        minute: "2-digit",
                                                        hour: "2-digit",
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    }).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, (_, d, m, y, h, min) => {
                                                        return `Time:${min}:${h} - Day:${d}/${m}/${y}`;
                                                    })}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Stack spacing={2} direction="row">
                                                        <EditIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "blue",
                                                                cursor: "pointer",
                                                            }}
                                                            className="cursor-pointer"
                                                        // onClick={() => editUser(row.id)}
                                                        />
                                                        <DeleteIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "darkred",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                deleteUser(user.id);
                                                            }}
                                                        />
                                                    </Stack>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={user.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </>
    );
}
