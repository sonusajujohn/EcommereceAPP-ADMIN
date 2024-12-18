import React from 'react'
import Home from './pages/Home/Home'
import { Routes,Route } from 'react-router-dom'
import AdminRequests from './components/Admin Management/AdminRequests'
import AdminPage from './pages/Admin Page/AdminPage'
import AddAdmin from './components/Admin Management/AddAdmin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/adminrequests' element={<AdminRequests/>}></Route>
        <Route path='/adminpage' element={<AdminPage/>}></Route>
        <Route path='/addadmin' element={<AddAdmin/>}></Route>
        
      </Routes>
    </div>
  )
}

export default App