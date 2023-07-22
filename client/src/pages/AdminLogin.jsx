import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { adminlogin } from "../Redux/adminStatus/adminAction";
import useAxiosAdmin from "../hooks/useAxiosadmin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const axios = useAxiosAdmin();
  const [err, setErr] = useState("");
  const dispatch=useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  let emailValue = watch("email");
  let passwordValue = watch("password");

  async function loginSubmit() {
    try {
      let result = await axios.post("/login", {
        email: emailValue,
        password: passwordValue,
      });
      if (result) {
        dispatch(adminlogin(result.data))
        navigate('/Adminhome')
      }
    } catch (err) {
      setErr('something went wrong')
    }
  }
  return (
    <>
      <div className="flex h-screen flex-1 flex-col items-center bg-[#d1d7e6]  justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-100 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRX8chGnq5Gi4oQLFwp16FgYxFSWT6Um6iTQ7tsRXEbp3X4ItglymqcPIId7aoQKHJ8Q&usqp=CAU"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin Login
          </h2>
          <h6 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
            {err}
          </h6>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(loginSubmit)}
            action="#"
            method="POST"
          >
            <div>
              <FormField
                label="Email"
                id="email"
                name="email"
                type="text"
                register={register}
                errors={errors}
              />
            </div>

            <div>
              <FormField
                label="Password"
                id="password"
                name="password"
                type="password"
                register={register}
                errors={errors}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
