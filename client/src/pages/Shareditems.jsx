import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import useAxios from "../hooks/useAxios";
import SharedCard from "../components/SharedCard";

function Shareditems() {
  const axios = useAxios();
  const [data, setData] = useState([]);

  const getSharedFile = async () => {
    try {
      let response = await axios.get("/sharedFiles");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSharedFile();
  }, []);
    
    
    async function viewPassword(id) {
      alert(id)
    try {
      let response = await axios.get(`/viewPassword/${id}`);
      let result = data.map((elem) => {
        if (elem._id === id) {
          elem.password = response.data.password;
        }
        return elem;
      });
      setData(result);
    } catch (err) {
      toast.error("something went wrong");
    }
  }
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <SharedCard key={index} passwordCallback={viewPassword} data={item} />
      ))}
    </div>
  );
}

export default Shareditems;
