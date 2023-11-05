
import SidebarManager from '../SidebarManager'
import { useState, useEffect, React } from 'react';
import axios from 'axios';
import AppBarManager from '../AppBarManager'
export default function DashboardManager() {
    const API = 'https://birdsellingapi.azurewebsites.net/api/Product/GetProduct'
    const [dataManager, setDataManager] = useState({});
    useEffect(() => {
        axios.get(API).then((res) => {
            // setDataManager(res.data);
            console.log(res.data.data);
        })
    }, [])

  return (
    <>
        <AppBarManager></AppBarManager>
        <SidebarManager/>
    </>
  )
}
