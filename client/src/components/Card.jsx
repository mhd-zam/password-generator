import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faShare,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { CustomContext } from "../context/ExternalContext";
import { useContext } from "react";

const Card = ({ data, EditCallback,passwordCallback,deleteCallback,shareCallback}) => {
  const {setAlert} = useContext(CustomContext);
  const [visiblity,setVisiblity]=useState(false)

  return (
    <div className="w-full  mb-4 border-2 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Platform</h2>
          <p className="text-gray-600">{data.platform}</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
            onClick={() => {
              EditCallback(data._id);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => {
              setAlert(true)
              deleteCallback(data._id)
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            title="share"
            onClick={() => {
              shareCallback(data._id)
            }}
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Username</h2>
          <p className="text-gray-600">{data.username}</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Password</h2>
          <div onClick={()=>setVisiblity(prev =>!prev)} className="flex space-x-4" >
          {visiblity?<p className="text-gray-600 truncate w-45 ">{data.password}</p>:<p className="text-gray-600 font-extrabold text-lg truncate w-32 ">********</p>}
          <button
            className="text-blue-600 hover:text-blue-800"
            title="share"
              onClick={() => {
                passwordCallback(data._id)
            }}
          >
          <FontAwesomeIcon icon={faEye} />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
