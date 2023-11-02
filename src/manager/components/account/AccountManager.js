import React, { useEffect, useState } from 'react';
import SidebarManager from '../SidebarManager';

const apiUrl = 'https://your-api-url/current-account';

function AccountManager() {
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCurrentAccount(data))
      .catch((error) => console.error(error));
  }, []);

  if (!currentAccount) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <SidebarManager></SidebarManager>
      <h2>Thông Tin Tài Khoản Hiện Tại</h2>
      <table>
        <tbody>
          <tr>
            <td>Tên đăng nhập:</td>
            <td>{currentAccount.userName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{currentAccount.userEmail}</td>
          </tr>
          <tr>
            <td>Số điện thoại:</td>
            <td>{currentAccount.userPhone}</td>
          </tr>
          <tr>
            <td>Role ID:</td>
            <td>{currentAccount.role_id}</td>
          </tr>
          <tr>
            <td>Địa chỉ:</td>
            <td>{currentAccount.addressLine}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccountManager;
