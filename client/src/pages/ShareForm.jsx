import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CustomContext } from "../context/ExternalContext";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";

function ShareForm({ fileId }) {
  const { shareModal, setShareModal, toast } = useContext(CustomContext);
  const textfoc = useRef();
  const axios = useAxios();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  let senderEmail = watch("sendid");

  useEffect(() => {
    if (shareModal) {
      textfoc.current?.focus();
    }
  }, [shareModal]);

  function handlechange(e) {
    setShareState({ sendid: e.target.value });
  }

  function formsubmit() {
    axios
      .post("/shareFile", { senderEmail, fileId })
      .then(() => {
        toast.success(`Credential Shared Successfully To ${senderEmail}`);
        setShareModal(false);
      })
        .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Recipient not found");
        } else if (err.response.status === 401) {
          toast.error("Cannot self-share");
        } else {
          toast.error("something went wrong");
        }
      });
  }

  return (
    <>
      {shareModal ? (
        <form
          onSubmit={handleSubmit(formsubmit)}
          className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm "
        >
          <div className="flex flex-row  relative w-auto md:w-2/5 space-x-4  my-6 mx-auto max-w-3xl">
            <input
              placeholder="Enter the Sender Email Id"
              type="text"
              id="sendid"
              name="sendid"
              ref={textfoc}
              onChange={handlechange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("sendid", {
                required: "Please specify the email",
                pattern: {
                  value: /^[^\s]+@[^\s]+$/,
                  message: "Please enter a valid email address without spaces.",
                },
              })}
            />
            {errors.sendid && (
              <p className="text-red-500">{errors.sendid.message}</p>
            )}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-strokelinecap="round"
                  stroke-strokelinejoin="round"
                  stroke-strokewidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>

              <span className="sr-only">Icon description</span>
            </button>
          </div>
          <div className="absolute bottom-60">
            <button
              type="button"
              onClick={() => {
                setShareModal(false);
              }}
              className="bg-black text-white w-12 h-12 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 hover:bg-red-800 "
            >
              <FontAwesomeIcon icon={faXmark} beat size="2xl" />
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
}

export default ShareForm;
