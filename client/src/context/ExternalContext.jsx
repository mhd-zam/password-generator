import React, { createContext } from "react";
export const CustomContext = createContext();

function ExternalContext({ children }) {
  const [showModal, setShowModal] = React.useState(false);
  const [shareModal, setShareModal] = React.useState(false);
  return (
    <CustomContext.Provider value={{ showModal, setShowModal,shareModal,setShareModal}}>
      {children}
    </CustomContext.Provider>
  );
}

export default ExternalContext;
