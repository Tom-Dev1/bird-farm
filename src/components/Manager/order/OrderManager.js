import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';

function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('all'); // Default: show all orders
    const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll';
    console.log(orders);

    useEffect(() => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => setOrders(data.data))
            .catch((error) => console.log(error.message));
    }, []);

    const navigate = useNavigate();

    const ViewFunction = (id) => {
        navigate('/manager/order/' + id);
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return '##C0C0C0';
            case 2:
                return '#FFFF00';
            case 3:
                return '#FFCC33';
            case 4:
                return '#33CC33';
            case 5:
                return '#EE0000';
            case 6:
                return '#FFFFCC';
            case 7:
                return '#EE0000';
            default:
                return '#FF0000';
        }
    };
    const getStatusName = (status) => {
        switch (status) {
            case 1:
                return 'Chờ Xác Nhận';
            case 2:
                return 'Đã Xác Nhận';
            case 3:
                return 'Đang Vận Chuyển';
            case 4:
                return 'Đã Nhận Hàng';
            case 5:
                return 'Hủy Đơn';
            case 6:
                return 'Hoàn Trả Hàng';
            case 7:
                return 'Hết Hàng';
            default:
                return 'Unknown';
        }
    };

    const handleStatusFilterChange = (event) => {
        setSelectedStatusFilter(event.target.value);
    };

    const filteredOrders = selectedStatusFilter === 'all'
        ? orders
        : orders.filter((order) => order.orderStatus.toString() === selectedStatusFilter);

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarManager />
            <Box component="main" sx={{ flexGrow: 1, p: 6 }}>
                <AppBarManager />
                <div className="main">
                    <Select
                        value={selectedStatusFilter}
                        onChange={handleStatusFilterChange}
                        style={{ marginBottom: '10px' }}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                        <MenuItem value="2">Đã Xác Nhận</MenuItem>
                        <MenuItem value="3">Đang Vận Chuyển</MenuItem>
                        <MenuItem value="4">Đã Nhận Hàng</MenuItem>
                        <MenuItem value="5">Hủy Đơn</MenuItem>
                        <MenuItem value="6">Hoàn Trả Hàng</MenuItem>
                        <MenuItem value="7">Hết Hàng</MenuItem>
                    </Select>
                    {(
                        <TableContainer component={Paper} className="dashboard-container">
                            <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Đơn Hàng</h2>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="order-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Tên Người Dùng</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Ngày Đặt Hàng</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Tổng Tiền</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Trạng Thái</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Hành Động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order.id_order}>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{order.user.userName}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{order.orderTotal}</TableCell>
                                            <TableCell style={{ fontSize: '15px', background: getStatusColor(order.orderStatus) }} align="center">{getStatusName(order.orderStatus)}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        ViewFunction(order.id);
                                                    }}
                                                >
                                                    <VisibilityIcon sx={{ fontSize: 20 }} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </Box>
        </Box>
    );
}

export default OrderManager;