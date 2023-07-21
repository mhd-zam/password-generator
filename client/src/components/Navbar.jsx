import React from "react";

function Navbar() {
  return (
    <nav className="relative flex  w-full flex-wrap items-center justify-between bg-gray-800 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700  lg:py-4">
      <div className="container">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex flex-row gap-2">
            <img
              className="rounded-full h-10 w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRX8chGnq5Gi4oQLFwp16FgYxFSWT6Um6iTQ7tsRXEbp3X4ItglymqcPIId7aoQKHJ8Q&usqp=CAU"
              alt=""
            />
            <a
              className="text-xl mt-1 font-semibold text-neutral-800 dark:text-neutral-200 hidden md:block"
              href="#"
            >
              Password Manager
            </a>
          </div>
          <div className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            <a
              href="#_"
              className="relative inline-flex items-center px-10 py-2 overflow-hidden text-base font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-start w-8 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative">Logout</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
