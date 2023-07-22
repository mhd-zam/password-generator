import { Input } from "postcss";
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Table from "../components/Table";
import useAxiosAdmin from "../hooks/useAxiosadmin";

function Adminhome() {
    const axios = useAxiosAdmin()
    const [userlist,setUserList]=useState([])
    
    useEffect(() => {
        axios.get('/getUserList').then((res) => {
            setUserList(res.data)
        })
    },[])

  return (
    <>
      <AdminNav />
      <div class="container mt-10 mx-auto">
        <Table data={userlist} />
      </div>
    </>
  );
}

export default Adminhome;
