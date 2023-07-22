import React, { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import { useDispatch } from "react-redux";
import { insertFormData } from "../Redux/formData/formAction";
import useAxios from "../hooks/useAxios";
import { CustomContext } from "../context/ExternalContext";
import Alert from "../components/Alert";
import ShareForm from "./ShareForm";

function CardManger() {
  let dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [id, setid] = useState("");
  let axios = useAxios();
  const { toast, setAlert,setShowModal,setRefresh,setShareModal,refresh } = useContext(CustomContext);

  const getList = async () => {
    try {
      let response = await axios.get("/getMyList");
      setData(response.data);
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getList();
  }, [refresh]);

  async function editFile(id) {
    try {
      let {data} = await axios.get(`/getEditFile/${id}`);
      dispatch(insertFormData(data));
      setShowModal(true);
      console.log(data);
    } catch (err) {
      toast.error("something went wrong");
    }
  }

  function getID(id) {
    setid(id);
  }

  async function deleteFile() {
    try {
      await axios.delete(`/deleteFile/${id}`);
      setAlert(false);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error("something went wrong");
    }
  }

  async function viewPassword(id) {
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

  function share(id) {
    setid(id)
    setShareModal(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((elemt, index) => (
        <Card
          key={index}
          data={elemt}
          EditCallback={editFile}
          passwordCallback={viewPassword}
          deleteCallback={getID}
          shareCallback={share}
        />
      ))}
      <ShareForm fileId={id} />
      <Alert comfirmCallback={deleteFile} />
    </div>
  );
}

export default CardManger;
