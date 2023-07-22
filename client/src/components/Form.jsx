import React, { useContext } from "react";
import { CustomContext } from "../context/ExternalContext";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { clearFormData } from "../Redux/formData/formAction";

function Form({ formData, post }) {
  const { setShowModal } = useContext(CustomContext);
  const dispatch=useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({defaultValues: formData});
  
  let platform = watch('platform')
  let username = watch('username')
  let password = watch('password')

  // ^[A-Za-z][A-Za-z0-9]*$

  function submitForm() {
    post({ ...formData, platform, username, password });
  }
  return (
    <form
      className="space-y-6"
      action="#"
      method="POST"
      onSubmit={handleSubmit(submitForm)}
    >
      <div>
        <label
          htmlFor="platform"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Platform
        </label>
        <div className="mt-2">
          <input
            id="platform"
            name="platform"
            type="text"
            autoComplete="platform"
            required
            {...register("platform", {
              required: "Please specify the platform",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9]*$/,
                message: "Specify the platform.",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.platform && <p className="text-red-500">{errors.platform.message}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          username
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            {...register("username", {
              required: "username is required",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9]*$/,
                message: "username is required",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="text"
            autoComplete="current-password"
            required
            {...register("password", {
              required: "password is required",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9]*$/,
                message: "password is required",
              },
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
      </div>
      <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setShowModal(false)
            dispatch(clearFormData())
          }}
        >
          Close
        </button>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default Form;
