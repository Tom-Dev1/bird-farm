import SidebarManager from './SidebarManager'
import React from 'react'
import DashboardManager from './DashboardManager'
const ManagerScreen = () => {
    return (
        <>
            <SidebarManager />
            <main className="main-wrap">
            <DashboardManager />
            </main>
        </>
    );
};
export default ManagerScreen;