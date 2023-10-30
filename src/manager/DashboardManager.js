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
//import './dashboard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';

function Dashboard() {
	const [staff, setStaff] = useState([]);
	const baseUrl = `https://653ea1a29e8bd3be29df9516.mockapi.io/products`;
	const confirm = useConfirm();

	useEffect(() => {
		fetch(baseUrl)
			.then((response) => response.json())
			.then((data) => setStaff(data))
			.catch((error) => console.log(error.message));
	}, []);

	const navigate = useNavigate();

	const EditFunction = (category_id) => {
		navigate('/manager/edit/' + category_id);
	};
	const RemoveFunction = (category_id) => {
		if (window.confirm(`Xóa: ${category_id}`)) {
			const baseUrl = `https://653ea1a29e8bd3be29df9516.mockapi.io/products`;
			fetch(baseUrl + '/' + category_id, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			})
				.then((res) => {
					if (res.status === 200) {
						toast.success(`Xóa ID: ${category_id} thành công!`);
						setStaff((prevStaff) => prevStaff.filter((staff) => staff.category_id !== category_id));
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
		<div>
			{(
				<TableContainer component={Paper} className="dashboard-container">
					<h2 style={{ textAlign: 'center', color: 'red', fontSize: '50px' }}>Sản Phẩm</h2>
					<Link to="/new-product" className="add-btn">
						<Button variant="contained">Create</Button>
					</Link>
					<Table sx={{ minWidth: 650 }} aria-label="simple table" className="staff-table">
						<TableHead>
							<TableRow>
								<TableCell align="center">ID</TableCell>
								<TableCell align="center">Avatar</TableCell>
								<TableCell align="center">Tên</TableCell>
								<TableCell align="center">Giá</TableCell>
								<TableCell align="center">Loại</TableCell>
								<TableCell align="center">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{staff.map((staff) => (
								<TableRow key={staff.category_id}>
									<TableCell align="center">{staff.category_id}</TableCell>

									<TableCell component="th" scope="row" align="center">
										<img style={{ width: '100px', height: '100px' }} src={staff.img} alt="" />
									</TableCell>
									<TableCell align="center">{staff.name}</TableCell>
									<TableCell align="center">{staff.price}</TableCell>
									<TableCell align="center">{staff.sex}</TableCell>
									<TableCell align="center">
										<Button
											variant="outlined"
											color="success"
											className="edit-btn"
											onClick={() => {
												EditFunction(staff.category_id);
											}}
										>
											<EditIcon />
										</Button>
										<Button
											variant="outlined"
											color="error"
											className="delete-btn"
											onClick={() => {
												RemoveFunction(staff.category_id);
											}}
										>
											<DeleteIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) }
		</div>
	);
}

export default Dashboard;
