import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import FormField from "../components/FormField";

function Signup() {
  const navigate = useNavigate();
  const axios = useAxios();
  const [err, setErr] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  let emailValue = watch("email");
  let passwordValue = watch("password");

  async function signupSubmit() {
    try {
      let result = await axios.post("/signup", {
        email: emailValue,
        password: passwordValue,
      });
      if (result) {
        navigate("/Login");
      }
    } catch (err) {
      if (err.response.data.message === "email already exists") {
        setErr(err.response.data.message);
      } else {
        setErr("some thing went wrong");
      }
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center mt-10 justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-100 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRX8chGnq5Gi4oQLFwp16FgYxFSWT6Um6iTQ7tsRXEbp3X4ItglymqcPIId7aoQKHJ8Q&usqp=CAU"
          alt="Your Company"
        />

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Signup to your account
        </h2>
        <h6 className="mt-10 text-center text-2xl  leading-9 tracking-tight text-red-600">
          {err}
        </h6>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(signupSubmit)}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="Re-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Re-enter the password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="Re-password"
                name="Re-password"
                type="password"
                autoComplete="current-password"
                {...register("Re-password", {
                  required: "Re-enter Password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors["Re-password"] && (
                <span className="text-red-500">
                  {errors["Re-password"].message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Signup
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Login to your account?{" "}
          <a
            onClick={() => {
              navigate("/Login");
            }}
            className="font-semibold leading-6 cursor-pointer text-indigo-600 hover:text-indigo-500"
          >
            Login Now
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
