import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';


function OrderManager() {
    const [orders, setOrders] = useState([]);
    const baseUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll`; // Thay thế URL API của bạn ở đây
    console.log(orders);
    useEffect(() => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => setOrders(data.data))
            .catch((error) => console.log(error.message));
        console.log(setOrders);
    }, []);

    const navigate = useNavigate();

    const ViewFunction = (id) => {
        navigate('/manager/order/' + id);
    };

    const RemoveFunction = (id) => {
        if (window.confirm(`Xóa đơn hàng có ID: ${id}`)) {
            const baseUrl = `https://your-api-url-here`; // Thay thế URL API của bạn ở đây
            fetch(baseUrl + '/' + id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(`Xóa đơn hàng có ID: ${id} thành công!`);
                        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
                    } else {
                        throw new Error('Xóa không thành công.');
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        } else {
            // Người dùng hủy bỏ, không làm gì cả
            toast.warning('Hủy bỏ xóa');
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return '#FFA500'; // Orange for "Đang nhận đơn"
            case 2:
                return '#FFFF00'; // Yellow for "Đang vận chuyển"
            case 3:
                return '#00FF00'; // Green for "Đã nhận hàng"
            case 4:
                return '#FF0000'; // Red for "Hủy"
            default:
                return '#FFFFFF'; // Default color
        }
    };
    const getStatusName = (status) => {
        switch (status) {
          case 1:
            return 'Đang chuẩn bị';
          case 2:
            return 'Đang vận chuyển';
          case 3:
            return 'Đã nhận hàng';
          case 4:
            return 'Hủy';
          default:
            return 'Unknown'; // or any default value you prefer
        }
      };
    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarManager />
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                <AppBarManager />
                <div className='main'>
                    {(
                        <TableContainer component={Paper} className="dashboard-container">
                            <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Đơn Hàng</h2>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="order-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: '20px' }} align="center">ID Đơn Hàng</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Ngày Đặt Hàng</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Tổng Tiền</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Trạng Thái</TableCell>
                                        <TableCell style={{ fontSize: '20px' }} align="center">Hành Động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders?.map((order) => (
                                        <TableRow key={order.id_order}>
                                            <TableCell style={{ fontSize: '15px' }} align="center">{order.id}</TableCell>
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
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    className="delete-btn"
                                                    onClick={() => {
                                                        RemoveFunction(order.id);
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: 20 }} />
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