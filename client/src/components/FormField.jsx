import React from "react";

function FormField({ label, id, name, type, register, errors }) {
  let pattern = null;
  let errorMessage = null;

  
  // Regex patterns and error messages
  if (type === "text") {
    pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    errorMessage = "Invalid email address";
  } else if (type === "password") {
    pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    errorMessage ="Password must be at least 6 characters long and contain at least one letter and one number";
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <label
          htmlFor="Repassword"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      </div>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={type === "password" ? "new-password" : "email"}
          {...register(name, {
            required: `${label} is required`,
            pattern: {
              value: pattern,
              message: errorMessage,
            },
          })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}*</span>
        )}
      </div>
    </>
  );
}

export default FormField;
