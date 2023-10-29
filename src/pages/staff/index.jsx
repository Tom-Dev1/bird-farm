// import React from 'react'

// function index() {
//   return (
//     <div>index</div>
//   )
// }

// export default index

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminPage from './AdminPage';
import ManagerPage from './ManagerPage';
import UserPage from './UserPage';

function App() {
  const userRole = 'admin'; // Thay thế bằng vai trò thực tế của người dùng sau khi đăng nhập

  return (
    <Router>
      <Switch>
        {userRole === 'admin' && (
          <Route path="/admin" component={AdminPage} />
        )}
        {userRole === 'manager' && (
          <Route path="/manager" component={ManagerPage} />
        )}
        {userRole === 'user' && (
          <Route path="/user" component={UserPage} />
        )}
        <Redirect to="/admin" />
      </Switch>
    </Router>
  );
}

export default App;
