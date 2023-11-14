import React from 'react'
import SideNav from '../components/SideNav'
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar'
import UserList from './user/UserList';
export default function AdminUser() {
    return (
        <>
            <Navbar />
            <Box height={80} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <UserList />

                </Box>

            </Box>

        </>
    )
}

