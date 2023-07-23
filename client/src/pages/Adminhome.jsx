import { Input } from "postcss";
import React, { useContext, useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Table from "../components/Table";
import useAxiosAdmin from "../hooks/useAxiosadmin";
import { CustomContext } from "../context/ExternalContext";
import TableManager from "./TableManager";

function Adminhome() {
  return (
    <>
      <AdminNav />
      <div className="container mt-10 mx-auto">
        <TableManager />
      </div>
    </>
  );
}

export default Adminhome;
