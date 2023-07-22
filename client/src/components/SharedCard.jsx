import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye
} from "@fortawesome/free-solid-svg-icons";


const SharedCard = ({ data,passwordCallback}) => {
  const [visiblity,setVisiblity]=useState(false)

  return (
    <div className="w-full  mb-4 border-2 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Platform</h2>
          <p className="text-gray-600">{data.platform}</p>
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

export default SharedCard;