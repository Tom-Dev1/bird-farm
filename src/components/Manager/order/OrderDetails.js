import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import '../StyleManager/orderDetails.css';

const OrderDetails = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const baseUrl = `http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetSingleID?id=`; // Update with your API URL
        fetch(baseUrl + id)
            .then((response) => response.json())
            .then((data) => setOrderDetails(data.data))
            .catch((error) => console.log(error.message));
    }, [id]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

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
            return 'Unknown';
        }
    };

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <SidebarManager />
                <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                    <AppBarManager />
                    <h2 style={{color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Chi tiết đơn hàng</h2>
                    <p>Order Date: {orderDetails.order_date}</p>
                    <p>Mã đơn hàng: {orderDetails.id}</p>
                    <p>Tổng tiền: {orderDetails.orderTotal}</p>
                    <p>Trạng thái: {getStatusName(orderDetails.orderStatus)}</p>
                    <p>Tên người dùng: {orderDetails.user_id}</p>
                    <p>Địa chỉ: {orderDetails.address}</p>
                    <Link to="/manager/order" className="add-btn">
                        <Button sx={{ fontSize: 20 }} variant="contained">Back</Button>
                    </Link>
                </Box>
            </Box>
        </div>
    );
};

export default OrderDetails;
