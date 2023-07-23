import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { CustomContext } from "../context/ExternalContext";
import { useContext } from "react";
import FormPage from "./FormPage";
import CardManger from "./CardManger";
import Shareditems from "./Shareditems";
function Home() {
  const { setShowModal } = useContext(CustomContext);

  useEffect(() => {
    document.body.style.backgroundColor = '#0C0374'
    document.body.style.height='100%'
    return () => {
      document.body.style.backgroundColor = 'white'
      document.body.style.height=''
    }
  },[])

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex flex justify-end">
          <button
            className="block w-4/3 float-right mt-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Create
          </button>
        </div>
        <h2 className=" text-xl pl-2  pt-4 md:text-4xl pb-10 font-bold text-blue-600">
          Secure User Credentials
        </h2>
        <CardManger />
        <Shareditems />
        <FormPage />
      </div>
    </>
  );
}

export default Home;
