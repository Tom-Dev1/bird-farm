import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarManager from './SidebarManager';
import AppBarManager from './AppBarManager';

const ManagerScreen = () => {
    return (
        <div>
            <AppBarManager />
            <SidebarManager />
        </div>
    );
};

export default ManagerScreen;
