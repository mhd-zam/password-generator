import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function Auth() {
    let logged = useSelector((state) => state.userStatus.logged)
    return logged ? <Outlet /> : <Navigate to="/Login" />
}

export default Auth