import React, { useContext, useEffect, useState } from "react";
import useAxiosAdmin from "../hooks/useAxiosadmin";
import { CustomContext } from "../context/ExternalContext";
import Table from "../components/Table";

function TableManager() {
  const axios = useAxiosAdmin();
  const [userlist, setUserList] = useState([]);
  const { toast } = useContext(CustomContext);

  useEffect(() => {
    axios
      .get("/getUserList")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        toast.error("something went wrong!!");
      });

    return () => {
      toast.dismiss();
    };
  }, []);

 async function handleswitch(id) {
     await axios.post(`/block/${id}`).then((res) => {
         let data = userlist.map((elemt) => {
             if (elemt._id === id) {
                elemt['blocked']=!elemt['blocked']
             }
             return elemt
         })
         setUserList(data)
     }).catch((err) => {
        toast.error('somthing went wrong')
    })
  }

  let heading = ["No", "Email", "No Of Credentails", "Status", "Action"];
;

  return <Table data={userlist} heading={heading} handleSwitch={handleswitch} />;
}

export default TableManager;
