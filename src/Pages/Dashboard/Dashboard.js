import React from 'react';
import DataTable from '../../Components/SidebarData/DataTable';
import TittlePage from '../../Components/TittlePage/TittlePage';
import './dashboard.css';




const Dashboard = ({ tittle}) => {


    return (
        <div className='dashboard'>
            <TittlePage tittle= "Admin Dashboard " />
            <div className='heading_sub'>
            <span><span className='heading'> Users</span> All Users in Firebase Database</span>
            </div>
            <DataTable />
        </div>
    )
}

export default Dashboard
