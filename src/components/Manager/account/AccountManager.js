import React, { useEffect, useState } from 'react';
// import SidebarManager from '../SidebarManager';
// import AppBarManager from '../AppBarManager';
import '../StyleManager/accountManager.css';

const apiUrl = 'https://birdsellingapi.azurewebsites.net/api/User/GetSingleID?id=734c8842090440a28ebfb1a54313f5a4';

function AccountManager() {
    const [Account, setCurrentAccount] = useState(null);
    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setCurrentAccount(data.data))
            .catch((error) => console.error(error));
    }, []);
    if (!Account) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* <AppBarManager /> */}
            {/* <SidebarManager /> */}
            <div className="main-container">
                <h2>Thông Tin Tài Khoản</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Tên đăng nhập:</td>
                            <td>{Account.userName}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{Account.userEmail}</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại:</td>
                            <td>{Account.userPhone}</td>
                        </tr>
                        <tr>
                            <td>Role ID:</td>
                            <td>{Account.role}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <td>{Account.addressLine}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AccountManager;
