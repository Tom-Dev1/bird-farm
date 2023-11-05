import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import '../../StyleManager/ProductManager.css';
import AppBarManager from '../AppBarManager';
import SidebarManager from '../SidebarManager';

function ProductManager() {
	const [staff, setStaff] = useState([]);
	const baseUrl = `https://birdsellingapi.azurewebsites.net/api/Product/GetProduct/`;
	const confirm = useConfirm();
	console.log(staff);
	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => setStaff(data.data))
			.catch((error) => console.log(error.message));
		console.log(setStaff);

	}, []);

	const navigate = useNavigate();

	const EditFunction = (id) => {
		navigate('/manager/edit-product/' + id);
	};
	const RemoveFunction = (id) => {
		if (window.confirm(`Xóa: ${id}`)) {
			const baseUrl = `https://birdsellingapi.azurewebsites.net/api/Product/DeleteProduct/`;
			fetch(baseUrl + '/' + id, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			})
				.then((res) => {
					if (res.status === 200) {
						toast.success(`Xóa ID: ${id} thành công!`);
						setStaff((prevStaff) => prevStaff.filter((staff) => staff.id !== id));
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
			<AppBarManager
				className="appBar"
			/>
			<SidebarManager className="sidebar" />
			<div className='main'>
				{(
					<TableContainer component={Paper} className="dashboard-container">
						<h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px' }}>Sản Phẩm</h2>
						<Link to="/manager/new-product" className="add-btn">
							<Button variant="contained">Create</Button>
						</Link>
						<Table sx={{ minWidth: 650 }} aria-label="simple table" className="staff-table">
							<TableHead>
								<TableRow>
									<TableCell style={{ fontSize: '20px' }} align="center">ID</TableCell>
									<TableCell style={{ fontSize: '20px' }} align="center">Avatar</TableCell>
									<TableCell style={{ fontSize: '20px' }} align="center">Tên</TableCell>
									<TableCell style={{ fontSize: '20px' }} align="center">Giá</TableCell>
									<TableCell style={{ fontSize: '20px' }} align="center">Loại</TableCell>
									<TableCell style={{ fontSize: '20px' }} align="center">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{staff?.map((staff) => (
									<TableRow key={staff.id}>
										<TableCell style={{ fontSize: '15px' }} align="center">{staff.id}</TableCell>

										<TableCell component="th" scope="row" align="center">
											<img style={{ width: '150px', height: '150px' }} src={staff.image} alt="" />
										</TableCell>
										<TableCell style={{ fontSize: '15px' }} align="center">{staff.name}</TableCell>
										<TableCell style={{ fontSize: '15px' }} align="center">{staff.price}</TableCell>
										<TableCell style={{ fontSize: '15px' }} align="center">{staff.sex}</TableCell>
										<TableCell align="center">
											<Button
												variant="outlined"
												color="success"
												className="edit-btn"
												onClick={() => {
													EditFunction(staff.id);
												}}
											>
												<EditIcon sx={{ fontSize: 20 }} />
											</Button>
											<Button
												variant="outlined"
												color="error"
												className="delete-btn"
												onClick={() => {
													RemoveFunction(staff.id);
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
		</>
	);
}

export default ProductManager;
