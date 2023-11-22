import React, { useEffect, useState } from 'react';
import SidebarManager from '../SideBarManager/SidebarManager';
import AppBarManager from '../AppBarManager/AppBarManager';
import Box from '@mui/material/Box';
import '../StyleManager/accountManager.css';

const apiUrlBase = 'http://birdsellingapi-001-site1.ctempurl.com/api/User/GetSingleID?id=';

function AccountManager() {
    const [Account, setAccount] = useState(null);
    useEffect(() => {
        // Retrieve user ID from local storage
        const id = localStorage.getItem('id');

        // Check if userId is available
        if (!id) {
            console.error('User ID not found in local storage');
            return;
        }

        // Construct the API URL with the retrieved user ID
        const apiUrl = `${apiUrlBase}${id}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setAccount(data.data))
            .catch((error) => console.error(error));
    }, []);
    if (!Account) {
        return <div>Loading...</div>;
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarManager />
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                <AppBarManager />
                <div className="main-container">
                    <h2 style={{ textAlign: 'center', color: '#205295', fontSize: '40px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>Thông Tin Tài Khoản</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <tbody>
                            <tr>
                                <td className="label">Tên đăng nhập:</td>
                                <td className="value">{Account.userName}</td>
                            </tr>
                            <tr>
                                <td className="label">Email:</td>
                                <td className="value">{Account.userEmail}</td>
                            </tr>
                            <tr>
                                <td className="label">Số điện thoại:</td>
                                <td className="value">{Account.userPhone}</td>
                            </tr>
                            <tr>
                                <td className="label">Vai trò:</td>
                                <td className="value"
                                    style={{ pointerEvents: Account.role_id === '507cd3255f5e4e2589d999efa128dd0a' ? 'none' : 'auto', color: Account.role_id === '507cd3255f5e4e2589d999efa128dd0a' ? '#999' : 'inherit' }}>
                                    {Account.role_id === '507cd3255f5e4e2589d999efa128dd0a' ? 'Quản Lý' : 'Khác'}
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Địa chỉ:</td>
                                <td className="value">{Account.addressLine}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Box>
        </Box>
    );
}

export default AccountManager;