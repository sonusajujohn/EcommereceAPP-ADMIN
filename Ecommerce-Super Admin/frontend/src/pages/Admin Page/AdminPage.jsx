import React from 'react'
import AdminSidebar from '../../components/Admin Sidebar/AdminSidebar'
import './AdminPage.css'
import AdminList from '../../components/Admin Management/AdminList'

const AdminPage = () => {
  return (
    <div className='home'>
        <AdminSidebar/>
        <div className='home-container'>
            <AdminList/>
        </div>
      
    </div>
  )
}

export default AdminPage
