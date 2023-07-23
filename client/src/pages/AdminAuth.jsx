import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function AdminAuth() {
    let logged = useSelector((state) => state.adminStatus.akn)
    return logged.length!=0? <Outlet /> : <Navigate to="/Admin" />
}

export default AdminAuth