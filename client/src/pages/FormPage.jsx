import React,{useContext} from "react";
import Form from "../components/Form";
import useAxios from "../hooks/useAxios";
import { useSelector,useDispatch } from "react-redux";
import { CustomContext } from "../context/ExternalContext";
import Modal from "../components/Modal";
import { clearFormData } from "../Redux/formData/formAction";
function FormPage() {
  const {setShowModal,toast,setRefresh} = useContext(CustomContext);
  const data = useSelector(state => state.formData)
  const axios = useAxios();
  const dispatch=useDispatch()
  let url = null;
  data.username.length ? (url = "/updateFile") : (url = "/addToList");

  async function postFormdata(data) {
    try {
      if (url === '/updateFile') {
        await axios.put(url, data);
      } else {
        await axios.post(url, data);
      }
      
      toast.success("Form Submitted!");
      setShowModal(false)
      setRefresh(prev => !prev)
      dispatch(clearFormData())
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  return <Modal><Form formData={data} post={postFormdata} /></Modal>;
}

export default FormPage;
