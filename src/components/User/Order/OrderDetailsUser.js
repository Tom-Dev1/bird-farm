import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const OrderDetailsUser = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=';
        fetch(baseUrl + id)
            .then((response) => response.json())
            .then((data) => {
                setOrderDetails(data.data);
                renderTableAsync(data.data);
            })
            .catch((error) => console.log(error.message));
    }, [id]);

    const renderTableAsync = (orderDetails) => {
        try {
            renderTable(orderDetails).then((rows) => setTableRows(rows));
        } catch (error) {
            console.error('Error rendering table:', error.message);
            setTableRows([]);
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

    const fetchProductDetails = async (productId) => {
        const productDetailsUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${productId}`;
        try {
            const response = await fetch(productDetailsUrl);
            const productDetails = await response.json();
            return productDetails.data;
        } catch (error) {
            console.error('Error fetching product details:', error.message);
            return null;
        }
    };

    const renderTable = async (orderDetails) => {
        if (!orderDetails || !orderDetails.carts || orderDetails.carts.length === 0) {
            return [
                <TableRow key="no-items">
                    <TableCell colSpan={3} align="center">
                        No items in the order
                    </TableCell>
                </TableRow>,
            ];
        }

        if (!orderDetails.carts) {
            return null;
        }

        const productDetailsPromises = orderDetails.carts.map((cart) =>
            fetchProductDetails(cart.product_id)
        );

        try {
            const productDetails = await Promise.all(productDetailsPromises);

            // Render table rows
            return orderDetails.carts.map((cart, index) => (
                <TableRow key={cart.product_id}>
                    <TableCell style={{ fontSize: '15px' }} align="center">
                        {productDetails[index] ? (
                            <>
                                <div>{productDetails[index].name}</div>
                                <img
                                    src={`http://birdsellingapi-001-site1.ctempurl.com/${productDetails[index].image}`}
                                    alt="Product"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            </>
                        ) : (
                            'Unknown'
                        )}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px' }} align="center">
                        {cart.price}
                    </TableCell>
                    <TableCell style={{ fontSize: '15px' }} align="center">
                        {cart.quantity}
                    </TableCell>
                </TableRow>
            ));
        } catch (error) {
            console.error('Error fetching product details:', error.message);
            return [];
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            const confirmationResult = await Swal.fire({
                icon: 'question',
                title: 'Confirm Status Change',
                text: 'Are you sure you want to update the order status?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
            });

            if (confirmationResult.isConfirmed) {
                const updateStatusUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Order/Update-Status-Product?orderId=${id}&orderStatus=${newStatus}`;
                await fetch(updateStatusUrl, { method: 'PUT' });
                console.log(updateStatusUrl);

                // Fetch and update the order details again after status change
                const updatedOrderDetails = await fetchOrderDetails(id);
                setOrderDetails(updatedOrderDetails);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Order status updated successfully.',
                });
            }
        } catch (error) {
            console.error('Error updating order status:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Fail to update status.',
            });
        }
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                <h2
                    style={{
                        color: '#205295',
                        fontSize: '40px',
                        marginTop: '20px',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    View Order Details
                </h2>
                <p>Order Date: {new Date(orderDetails.order_date).toLocaleDateString()}</p>
                <p>Mã đơn hàng: {orderDetails.id}</p>
                <p>Tổng tiền: {orderDetails.orderTotal}</p>
                <p>Trạng thái: {getStatusName(orderDetails.orderStatus)}</p>
                <p>Địa chỉ: {orderDetails.address}</p>
                <div className="main">
                    <TableContainer component={Paper} className="dashboard-container">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="order-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '20px' }} align="center">
                                        Sản Phẩm
                                    </TableCell>
                                    <TableCell style={{ fontSize: '20px' }} align="center">
                                        Giá Tiền
                                    </TableCell>
                                    <TableCell style={{ fontSize: '20px' }} align="center">
                                        Số Lượng
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{tableRows}</TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Link to="/user/order" className="add-btn">
                        <Button sx={{ fontSize: 20 }} variant="contained">
                            Back
                        </Button>
                    </Link>
                    {orderDetails.orderStatus === 1 || orderDetails.orderStatus === 2 ? (
                        <Button
                            sx={{ fontSize: 20, backgroundColor: '#FF0000', color: '#FFFFFF' }}
                            variant="contained"
                            onClick={() => handleStatusChange('5')}
                        >
                            Hủy Đơn
                        </Button>
                    ) : orderDetails.orderStatus === 3 ? (
                        <Button
                            sx={{ fontSize: 20, backgroundColor: '#008000', color: '#FFFFFF' }}
                            variant="contained"
                            onClick={() => handleStatusChange('4')}
                        >
                            Đã Nhận Hàng
                        </Button>
                    ) : orderDetails.orderStatus === 4 ? (
                        <Button
                            sx={{ fontSize: 20, backgroundColor: '#FF0000', color: '#FFFFFF' }}
                            variant="contained"
                            onClick={() => handleStatusChange('6')}
                        >
                            Hoàn Trả Hàng
                        </Button>
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};

const fetchOrderDetails = async (orderId) => {
    const baseUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=';
    try {
        const response = await fetch(baseUrl + orderId);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching updated order details:', error.message);
        return null;
    }
};

export default OrderDetailsUser;
