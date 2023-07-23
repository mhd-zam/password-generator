import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function OutsideAuth() {
    let logged = useSelector((state) => state.userStatus.accessToken)
    return logged.length!=0?<Navigate to="/" />:<Outlet />
}

export default OutsideAuth