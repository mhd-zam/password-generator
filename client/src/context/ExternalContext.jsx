import React, { createContext } from "react";
export const CustomContext = createContext();
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExternalContext({ children }) {
  const [showModal, setShowModal] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false)
  const [refresh,setRefresh]=React.useState(false)
  return (
    <CustomContext.Provider
      value={{ showModal, setShowModal, shareModal, setShareModal,toast,alert,setAlert,refresh,setRefresh}}
    >
      {children}
      <ToastContainer />
    </CustomContext.Provider>
  );
}

export default ExternalContext;
