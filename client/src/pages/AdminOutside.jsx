import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function AdminOutside() {
    let logged = useSelector((state) => state.adminStatus.akn)
    return logged.length!=0?<Navigate to="/Adminhome" />:<Outlet />
}

export default AdminOutside