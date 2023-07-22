import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function OutsideAuth() {
    let logged = useSelector((state) => state.userStatus.logged)
    return logged ?<Navigate to="/" />:<Outlet />
}

export default OutsideAuth