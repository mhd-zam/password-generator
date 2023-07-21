import React from "react";
import Navbar from "../components/Navbar";
import { CustomContext } from "../context/ExternalContext";
import { useContext } from "react";
import Card from "../components/Card";
import ShareForm from "../components/ShareForm";
import Modal from "../components/Modal";
function Home() {
  const { setShowModal } = useContext(CustomContext);
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
            Open regular modal
          </button>
        </div>
        <h2 className=" text-xl pl-2  pt-4 md:text-4xl pb-10 font-bold text-blue-600">
          Secure User Credentials
        </h2>
        <Modal/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <ShareForm />
      </div>
    </>
  );
}

export default Home;
