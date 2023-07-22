import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { InsertUserStatus } from "../Redux/userStatus/userAction";

export default function Login() {
  const navigate = useNavigate();
  const axios = useAxios();
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
        dispatch(InsertUserStatus(result.data))
        navigate('/')
      }
    } catch (err) {
      if (err.response.data.message === 'Account does not exsist'|| err.response.data.message === 'Invalid Password' ) {
        setErr(err.response.data.message);
      } else {
        setErr('something went wrong')
      }
      
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col items-center mt-10 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-100 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRX8chGnq5Gi4oQLFwp16FgYxFSWT6Um6iTQ7tsRXEbp3X4ItglymqcPIId7aoQKHJ8Q&usqp=CAU"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
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

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              onClick={() => {
                navigate("/Signup");
              }}
              className="font-semibold leading-6 cursor-pointer text-indigo-600 hover:text-indigo-500"
            >
              Signup Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
