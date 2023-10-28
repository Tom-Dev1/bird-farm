import SidebarManager from './SidebarManager'
import NavigationManager from './NavigationManager';
import React from 'react'
const ManagerScreen = () => {
    return (
        <>
            <SidebarManager />
            <main className="main-wrap">
        <NavigationManager/>
            </main>
        </>
    );
};
export default ManagerScreen;