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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingPage from '../../Navbar/LoadingPage';

const OrderDetailsUser = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl =
            'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=';
        fetch(baseUrl + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOrderDetails(data.data);
                setTimeout(() => setLoading(false), 600);
                setSelectedStatus(data.data.orderStatus.toString());
                renderTableAsync(data.data); // Pass the order details to the rendering function
            })
            .catch((error) => console.log(error.message));
    }, [id]);

    const renderTableAsync = (orderDetails) => {
        try {
            renderTable(orderDetails).then((rows) => setTableRows(rows));
        } catch (error) {
            console.error('Error rendering table:', error.message);
            setTableRows([]); // Set empty array if there's an error
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

    const renderTable = (orderDetails) => {
        if (!orderDetails || !orderDetails.carts || orderDetails.carts.length === 0) {
            return [
                <TableRow key="no-items">
                    <TableCell colSpan={3} align="center">
                        No items in the order
                    </TableCell>
                </TableRow>,
            ];
        }

        // Ensure orderDetails.carts is not null
        if (!orderDetails.carts) {
            return null;
        }

        // Fetch product details for all carts in parallel
        const productDetailsPromises = orderDetails.carts.map((cart) =>
            fetchProductDetails(cart.product_id)
        );

        // Use Promise.all without await
        return Promise.all(productDetailsPromises).then((productDetails) => {
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
        });
    };

    if (loading) {
        return <LoadingPage />;
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
                    Chi tiết đơn hàng
                </h2>
                <p>Order Date: {new Date(orderDetails.order_date).toLocaleDateString()}</p>
                <p>Mã đơn hàng: {orderDetails.id}</p>
                <p>Tổng tiền: {orderDetails.orderTotal}</p>
                <p>Trạng thái: {getStatusName(orderDetails.orderStatus)}</p>
                <p>Địa chỉ: {orderDetails.address}</p>
                <Select
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                    style={{ marginRight: '10px' }}
                >
                    <MenuItem value="1">Chờ Xác Nhận</MenuItem>
                    <MenuItem value="2">Đã Xác Nhận</MenuItem>
                    <MenuItem value="3">Đang Vận Chuyển</MenuItem>
                    <MenuItem value="4">Đã Nhận Hàng</MenuItem>
                    <MenuItem value="5">Hủy Đơn</MenuItem>
                    <MenuItem value="6">Hoàn Trả Hàng</MenuItem>
                    <MenuItem value="7">Hết Hàng</MenuItem>
                </Select>
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
                <Link to="/user/order" className="add-btn">
                    <Button
                        sx={{ fontSize: 20 }}
                        variant="contained"
                    >
                        Back
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default OrderDetailsUser;