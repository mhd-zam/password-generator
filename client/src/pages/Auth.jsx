import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function Auth() {
    let logged = useSelector((state) => state.userStatus.accessToken)
    return logged.length!=0? <Outlet /> : <Navigate to="/Login" />
}

export default Auth