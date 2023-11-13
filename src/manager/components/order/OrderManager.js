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
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
//import '../../StyleManager/OrderManager.css'; // Tạo một file CSS tương tự cho OrderManager
import AppBarManager from '../AppBarManager';
import SidebarManager from '../SidebarManager';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function OrderManager() {
	const [orders, setOrders] = useState([]);
	const baseUrl = `https://birdsellingapi.azurewebsites.net/api/Cart/Get-All-Cart`; // Thay thế URL API của bạn ở đây
	const confirm = useConfirm();
	console.log(orders);
	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => setOrders(data.data))
			.catch((error) => console.log(error.message));
		console.log(setOrders);
	}, []);

	const navigate = useNavigate();

	const EditFunction = (id) => {
		navigate('/manager/edit-order/' + id); // Thay thế đường dẫn dựa trên cài đặt router của bạn
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

	return (
		<>
			<AppBarManager className="appBar" />
			<SidebarManager className="sidebar" />
			<div className='main'>
				{(
					<TableContainer component={Paper} className="dashboard-container">
						<h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', margin:'20px' }}>Đơn Hàng</h2>
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
										<TableCell style={{ fontSize: '15px' }} align="center"> <Link to={`/manager/order/${order.id_order}`}>{order.id_order}</Link></TableCell>
										<TableCell style={{ fontSize: '15px' }} align="center">{order.order_date}</TableCell>
										<TableCell style={{ fontSize: '15px' }} align="center">{order.orderTotal}</TableCell>
										<TableCell style={{ fontSize: '15px' }} align="center">{order.orderStatus}</TableCell>
										<TableCell align="center">
											<Button
												variant="outlined"
												color="success"
												className="edit-btn"
												onClick={() => {
													EditFunction(order.id_order);
												}}
											>
												<EditIcon sx={{ fontSize: 15 }} />
											</Button>
											<Button
												variant="outlined"
												color="error"
												className="delete-btn"
												onClick={() => {
													RemoveFunction(order.id_order);
												}}
											>
												<DeleteIcon sx={{ fontSize: 15 }} />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
		</>
	);
}

export default OrderManager;
