import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { CustomContext } from "../context/ExternalContext";
import { useContext } from "react";

const Card = () => {
    const {setShareModal,setShowModal}=useContext(CustomContext)
  return (
    <div className="w-full  mb-4 border-2 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Social Media</h2>
          <p className="text-gray-600">Your social media platform</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
            onClick={() => {
                setShowModal(true)
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => {
              // Add your delete functionality here
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            title="share"
            onClick={() => {
                setShareModal(true)
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
          <p className="text-gray-600">Your username</p>
        </div>
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
            onClick={() => {
              // Add your edit functionality here
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => {
              // Add your delete functionality here
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Password</h2>
          <p className="text-gray-600">Your password</p>
        </div>
        <div className="flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
            onClick={() => {
              // Add your edit functionality here
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => {
              // Add your delete functionality here
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
